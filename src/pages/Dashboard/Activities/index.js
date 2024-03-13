import { useState } from 'react';
import styled from 'styled-components';
import ActivitiesContainer from '../../../components/ActivitiesChoose/ActivitiesContainer';
import FilterActivities from '../../../components/filterActivities';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { StyledTypography, SubTitle } from '../Payment';

export default function Activities() {
  const [infoDay, setInfoDay] = useState(null);
  const token = useToken();
  const days = [
    { id: 1, date: new Date('2023-03-24T03:24:00') },
    { id: 2, date: new Date('2023-03-25T03:24:00') },
    { id: 3, date: new Date('2023-03-26T03:24:00') },
  ];
  const { ticket } = useTicket();
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [daySchedule, setDaySchedule] = useState(undefined);

  function showDisplay() {
    if (!ticket || ticket.status !== 'PAID') {
      return (
        <Container>
          <StyledTypography>Escolha de atividades</StyledTypography>
          <WarningWrapper>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</WarningWrapper>
        </Container>
      );
    }

    if (!ticket.TicketType.includesHotel) {
      return (
        <Container>
          <StyledTypography>Escolha de atividades</StyledTypography>
          <WarningWrapper>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
          </WarningWrapper>
        </Container>
      );
    }

    return (
      <>
        <StyledTypography>Escolha de atividades</StyledTypography>
        <SubTitle>Primeiro, filtre pelo dia do evento.</SubTitle>
        <ContainerFilters>
          {days.map((day) => (
            <FilterActivities
              isSelected={day.id===selectedDay}
              setSelectedDay={setSelectedDay} 
              id={day.id}
              day={day} 
              setInfoDay={setInfoDay} 
              token={token} 
              setDaySchedule={setDaySchedule}
            />
          ))}
        </ContainerFilters>
        <div>{infoDay}</div>
        {daySchedule &&
          <ActivitiesContainer daySchedule={daySchedule} />
        }
      </>
    );
  }

  return showDisplay();
}

const Container = styled.div`
  flex-direction: column;
`;

const ContainerFilters = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const WarningWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  padding: 0px 230px;
  margin-top: 250px;
  text-align: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
