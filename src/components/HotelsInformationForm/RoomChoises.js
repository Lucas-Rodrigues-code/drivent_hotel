import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotelById';
import Room from './Room';

export default function RoomChoises({ selectedRoom, setSelectedRoom, selectedHotelId }) {
  const { getHotel } = useHotel();
  const [rooms, setRooms] = useState([]);

  useEffect(async() => {
    getHotel(selectedHotelId).then((res) => {
      setRooms(res.Rooms);
    });
  }, [selectedHotelId]);

  return (
    <RoomsContainer>
      {rooms.map((r) => 
        <Room
          setSelectedRoom={setSelectedRoom}
          bookedRooms={r._count.Booking}
          isSelcted={selectedRoom === r.id}
          key={r.id}
          id={r.id}
          capacity={r.capacity}
          name={r.name}
        />
      )}
    </RoomsContainer>
  );
};

const RoomsContainer = styled.ul`
  display: flex;
  height: fit-content;
  max-width: 90%;
  flex-wrap: wrap;
`;
