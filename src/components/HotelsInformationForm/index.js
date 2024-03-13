import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import useBooking from '../../hooks/api/useBooking';
import useToken from '../../hooks/useToken';
import { tryChangeRoom } from '../../services/bookingApi';
import { getBookinglById } from '../../services/hotelsApi';
import Button from '../Form/Button';
import HotelChoices from './HotelChoices';
import { ContainerHotel, Title } from './HotelsWrapper';
import RoomChoises from './RoomChoises';

export default function HotelInformationForm({ dataHotels }) {
  const { userData } = useContext(UserContext);
  const [ItsReserved, setItsReserved] = useState(false);
  const [booking, setBooking] = useState();
  const [InfoHotel, setInfoHotel] = useState([]);
  const [typeOfRoom, setTypeOfRoom] = useState();
  const [selectedHotelId, setSelectedHotelId] = useState(undefined);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [changeRoom, setChangeRoom] = useState(false);
  const token = useToken();
  const { bookRoom } = useBooking();

  useEffect(async() => {
    const booking = await getBookinglById(userData.token);
    setBooking(booking);
    if (booking) {
      setItsReserved(true);
    }
    if (booking.Room.capacity === 1) {
      setTypeOfRoom('Single');
    }
    if (booking.Room.capacity === 2) {
      setTypeOfRoom('double');
    }
    if (booking.Room.capacity === 3) {
      setTypeOfRoom('Triple');
    }
  }, []);

  async function tryBookRoom() {
    try {
      await bookRoom(selectedRoom);
      const booking = await getBookinglById(userData.token);
      setBooking(booking);
      setItsReserved(true);
      toast.success('Quarto reservado com sucesso!');
    } catch (err) {
      toast.warning(err);
    }
  }

  async function handleSubmitChangeRoom() {
    try {
      await tryChangeRoom(selectedRoom, booking.Room.id, token);
      toast.success('Quarto alterado com sucesso!');
    } catch (err) {
      toast.warning(err);
    }
  }
  return (
    <>
      {!ItsReserved && (
        <>
          <Title>Primeiro, escolha seu hotel</Title>
          <ContainerHotel>
            {dataHotels?.map((data) => (
              <HotelChoices
                id={data.id}
                image={data.image}
                name={data.name}
                key={data.id}
                setInfoHotel={setInfoHotel}
                setSelectedRoom={setSelectedRoom}
                setSelectedHotelId={setSelectedHotelId}
                isSelected={selectedHotelId === data.id}
              />
            ))}
          </ContainerHotel>
          {selectedHotelId && (
            <>
              <Title>Ótima pedida! Agora escolha seu quarto:</Title>
              <RoomChoises
                setSelectedRoom={setSelectedRoom}
                selectedRoom={selectedRoom}
                selectedHotelId={selectedHotelId}
              />
              {selectedRoom && 
                <Button 
                  onClick={() => tryBookRoom()}
                >Reservar Quarto</Button>
              }
            </>
          )}
        </>
      )}
      {ItsReserved && (
        <Cont>
          <HotelInfoFinal>
            <img src={InfoHotel[1] || booking.Room.Hotel.image} alt="Hotel" />
            <div>
              <h1>{InfoHotel[0] || booking.Room.Hotel.name}</h1>
              <h2>Quarto reservado</h2>
              <span>
                {booking.Room.name} {typeOfRoom}
              </span>
              <h2>Pessoas no seu quarto</h2>
              {booking.Room.capacity === 1 ? (
                <span>Somente voce</span>
              ) : (
                <span>Você e mais {booking.Room.capacity - 1}</span>
              )}
            </div>
          </HotelInfoFinal>
          {changeRoom && (
            <RoomChoises
              setSelectedRoom={setSelectedRoom}
              selectedRoom={selectedRoom}
              selectedHotelId={selectedHotelId}
            />
          )}
          {!changeRoom ? (
            <ButtonToggle
              onClick={() => {
                setSelectedHotelId(booking.Room.hotelId);
                setChangeRoom(true);
              }}
            >
              TROCAR DE QUARTO
            </ButtonToggle>
          ) : (
            <ButtonToggle
              onClick={() => {
                setSelectedHotelId(booking.Room.hotelId);
                handleSubmitChangeRoom();
                setChangeRoom(false);
              }}
            >
              RESERVAR QUARTO
            </ButtonToggle>
          )}
        </Cont>
      )}
    </>
  );
}

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: center; */
`;

const HotelInfoFinal = styled.div`
  width: 196px;
  height: 264px;

  background: #ffeed2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  div {
    width: 168px;
  }
  img {
    width: 168px;
    height: 109px;

    border-radius: 5px;
    margin-top: 10px;
  }
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #343434;
    margin-top: 10px;
  }
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    color: #3c3c3c;
  }
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #3c3c3c;
  }
`;

const ButtonToggle = styled.button`
  border: none;
  width: 182px;
  height: 37px;

  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 50;
  line-height: 16px;
  text-align: center;

  color: #000000;
`;
