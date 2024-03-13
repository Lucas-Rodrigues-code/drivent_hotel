import { useEffect, useState } from 'react';
import useHotel from '../../hooks/api/useHotelById';
import { ContainerData, Hotel } from './HotelsWrapper';

export default function HotelChoices({
  setSelectedRoom,
  setSelectedHotelId,
  isSelected,
  id,
  image,
  name,
  setInfoHotel,
}) {
  const { getHotel } = useHotel();

  const [rooms, setRooms] = useState([]);
  const [dataText, setDataText] = useState([]);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    if (id) {
      getHotel(id).then((res) => {
        setRooms(res.Rooms);
        countVacancies(res.Rooms);
      });
    }
  }, []);

  function countVacancies(data) {
    setVacancies(data.reduce((acc, curr) => acc + curr.capacity, 0));
  }

  useEffect(() => {
    if (rooms.length > 0) {
      let aux = [];
      const capacities = rooms.map((el) => el.capacity);

      if (capacities.includes(1)) {
        aux.push('Single');
      }

      if (capacities.includes(2)) {
        aux.push('Double');
      }

      if (capacities.includes(3)) {
        aux.push('Triple');
      }

      if (aux.length > 1) {
        aux.splice(aux.length - 1, 0, ' e ');
      }

      if (aux.length > 3) {
        aux.splice(1, 0, ', ');
      }

      const aux2 = aux.reduce((acc, cur, i, arr) => {
        return acc + cur;
      }, ' ');
      setDataText(aux2);
    }
  }, [rooms]);

  return (
    <Hotel
      onClick={() => {
        setInfoHotel([name, image]);
        setSelectedHotelId(id);
        setSelectedRoom(undefined);
      }}
      bgColor={isSelected ? '#FDEED2' : '#ebebeb'}
    >
      <img src={image} alt={image} />
      <div className="hotelName">{name}</div>
      <div className="hotelInfo">
        <ContainerData>
          <h3>Tipos de acomodação</h3>
          <p>{dataText}</p>
        </ContainerData>
        <ContainerData>
          <h3>Vagas Disponíveis</h3>
          <p>{vacancies}</p>
        </ContainerData>
      </div>
    </Hotel>
  );
}
