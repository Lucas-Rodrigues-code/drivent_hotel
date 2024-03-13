import { useState } from 'react';
import styled from 'styled-components';

export default function Room({  bookedRooms, isSelcted, id, capacity, name, setSelectedRoom }) {
  const [isValid] = useState(bookedRooms >= capacity);
  
  function getCapacityAmount() {
    let arr = [];
    for(let i = 0; i < capacity; i++) {
      arr.push(
        <span>
          {(i === 0 && isSelcted) && (bookedRooms <= i)?
            <Icon color="#FF4791">
              <ion-Icon
                name = "person"
              />
            </Icon>
            :
            ( bookedRooms <= i ?
              <Icon>
                <ion-Icon
                  name = "person-outline"
                />
              </Icon>
              :
              <Icon>
                <ion-Icon
                  name = "person"
                />
              </Icon>
            )
          } 
        </span>          
      );
    }
    arr.reverse();
    return arr;
  }

  return (
    <RoomStyle
      color={ isValid ? '#E9E9E9' : isSelcted ? '#FCE8C3' : 'initial' }
      onClick={() => setSelectedRoom(id)}
      disabled={isValid}
    >
      <h1>{name}</h1>
      <UsersDiv
        color={isValid ? '#8C8C8C' : 'inital'}  
      >
        {getCapacityAmount()}
      </UsersDiv>
    </RoomStyle>
  );
};

const RoomStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 45px;
  border: 1.3px solid #CECECE;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 0 10px;
  background-color: ${({ color }) => color};

  h1 {
    color: #454545;
    font-weight: bold;
  }
`;

const UsersDiv = styled.div`
  display: flex;
  span {
    padding: 0 2px;
    font-size: 20px;
    color: ${({ color }) => color};
  }
`;

const Icon = styled.span `
  color: ${({ color }) => color};
  transition: none;
`;
