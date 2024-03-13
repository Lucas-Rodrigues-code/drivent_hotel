import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import HotelInformationForm from '../../components/HotelsInformationForm';
import UserContext from '../../contexts/UserContext';
import { getTicket } from '../../services/ticketApi';

export default function HotelChoose({ dataHotels }) {
  const { userData } = useContext(UserContext);
  const [ticket, setTicket] = useState(undefined);
 
  useEffect(async() => {
    exisTicketPaid();
  }, []);

  async function exisTicketPaid() {
    const ticketData = await getTicket(userData.token);
    setTicket(ticketData);
  }

  function showDisplay() {
    if(!ticket || ticket.status !== 'PAID') {
      return (
        <Container>
          <StyledTypography>Escolha de hotel e quarto</StyledTypography>
          <WarningWrapper>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</WarningWrapper>
        </Container>
      )
      ;
    }
    
    if(!ticket.TicketType.includesHotel) {
      return (
        <Container>
          <StyledTypography>Escolha de hotel e quarto</StyledTypography>
          <WarningWrapper>
            Sua modalidade de Ingresso não inclui hospedagem
            Prossiga para escolha de atividades.
          </WarningWrapper>
        </Container>
      )
      ;
    };

    return (
      <div>
        <StyledTypography>Escolha de hotel e quarto</StyledTypography>
        <HotelInformationForm dataHotels={dataHotels} />
      </div>
    );
  }

  return showDisplay();
}

const Container = styled.div`
  flex-direction: column;
`;

const StyledTypography = styled.div`
  position: relative;
  font-size: 2.125rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.235;
  letter-spacing: 0.00735em;
  margin-bottom: 30px;
  padding-right: 300px;
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
