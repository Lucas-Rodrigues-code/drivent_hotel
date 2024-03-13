import styled from 'styled-components';

export const Title = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 23.44px;
  color: #8e8e8e;
  margin-bottom: 18px;
`;

export const ContainerHotel = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

export const Hotel = styled.div`
  background-color: ${({ bgColor }) => bgColor };
  border-radius: 10px;
  width: 196px;
  height: 264px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
  margin-right: 20px;
  cursor: pointer;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .hotelName {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .hotelInfo {
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 12px;
  }
`;

export const ContainerData = styled.div`
  h3 {
    font-weight: 700;
    line-height: 14.06px;
    margin-bottom: 3px;
  }
  
  p {
    line-height: 14.06px;
  }
`;
