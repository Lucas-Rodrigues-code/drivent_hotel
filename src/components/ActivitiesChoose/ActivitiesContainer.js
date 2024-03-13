import styled from 'styled-components';
import Place from './Place';

export default function ActivitiesContainer({ daySchedule }) {
  return (
    <Container>
      {daySchedule.map((s) =>
        <PlaceContainer>
          <span>
            <h1>{s.name}</h1>
          </span>
          <PlaceWrapper>
            <Place activities={s.Activity} />

          </PlaceWrapper>
        </PlaceContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 410px;
  overflow-y: auto;
  margin-top: 30px;

  @media(max-width: 700px) {
    flex-direction: column;
  }
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  span {
    display: flex;
    justify-content: center;
    color: #7B7B7B;
    margin-bottom: 10px;
    font-size: 17px;
  }

  @media(max-width: 700px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const PlaceWrapper = styled.div`
  border: 1px solid #D7D7D7;
  padding: 10px;
  min-height: 90%;

  @media(max-width: 700px) {
    min-height: fit-content;
  }
`;
