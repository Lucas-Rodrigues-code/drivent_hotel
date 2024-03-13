import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentCardForm from '../../../components/PaymentCardForm';
import PaymentConfirmation from '../../../components/PaymentConfirmation';
import PaymentInformationForm from '../../../components/PaymentInformationForm';
import { ContainerMain, ContainerOption } from '../../../components/PaymentInformationForm/PaymentWrapper';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [firstSreenVisibility, setfirstSreenVisibility] = useState(true);
  const [ticketId, setTicketId] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const [presentialOption, setPresentialOption] = useState(false);
  const [onlineOption, setOnlineOption] = useState(false);
  const [haveHotel, setHaveHotel] = useState(false);
  const [notHaveHotel, setNotHaveHotel] = useState(false);
  const [ticket, setTicket] = useState(undefined);
  const token = useToken();

  useEffect(async() => {
    const ticketData = await getTicket(token);
    setTicket(ticketData);
    if (ticketData.status === 'PAID') {
      setfirstSreenVisibility(false);
      setPaymentConfirmed(true);
    }
  }, []);

  function showTicketPaid() {
    return (
      <>
        <h1>{ticket.TicketType.isRemote ? 'Online' : 'Presencial'}</h1>
        <h2>{`R$ ${ticket.TicketType.price}`}</h2>
      </>
    );
  }

  function getTicketModality() {
    if (!presentialOption) {
      return (
        <>
          <h1>Online</h1>
          <h2>R$ 100</h2>
        </>
      );
    }
    if (!haveHotel) {
      return (
        <>
          <h1>Presencial + Sem Hotel</h1>
          <h2>R$ 250</h2>
        </>
      );
    }
    return (
      <>
        <h1>Presencial + Com Hotel</h1>
        <h2>R$ 600</h2>
      </>
    );
  }

  return (
    <>
      <StyledTypography>Ingresso e pagamento</StyledTypography>
      {enrollment ? (
        <>
          {firstSreenVisibility ? (
            <PaymentInformationForm
              setTicketId={setTicketId}
              setfirstSreenVisibility={setfirstSreenVisibility}
              presentialOption={presentialOption}
              setPresentialOption={setPresentialOption}
              onlineOption={onlineOption}
              setOnlineOption={setOnlineOption}
              haveHotel={haveHotel}
              setHaveHotel={setHaveHotel}
              notHaveHotel={notHaveHotel}
              setNotHaveHotel={setNotHaveHotel}
            />
          ) : !paymentConfirmed ? (
            <PaymentCardForm
              setPaymentConfirmed={setPaymentConfirmed}
              ticketId={ticketId}
              presentialOption={presentialOption}
              haveHotel={haveHotel}
            />
          ) : (
            <>
              <ContainerMain>
                <SubTitle>Ingresso escolhido</SubTitle>
                <ContainerOption width="250px" height="100px" selected={true}>
                  {ticket ? showTicketPaid() : getTicketModality()}
                </ContainerOption>
              </ContainerMain>
              <SubTitle>Pagamento</SubTitle>
              <PaymentConfirmation />
            </>
          )}
        </>
      ) : (
        <WarningWrapper>
          Você precisa completar a sua inscrição antes de prosseguir pra escolha de ingresso
        </WarningWrapper>
      )}
    </>
  );
}

export const SubTitle = styled.h4`
  color: #8e8e8e;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const StyledTypography = styled.div`
  position: relative;
  font-size: 2.125rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.235;
  letter-spacing: 0.00735em;
  margin-bottom: 30px;
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
