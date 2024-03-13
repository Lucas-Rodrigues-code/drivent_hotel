import CreditCardForm from '../PaymentInformationForm/CreditCardForm';
import {
  ContainerChoices,
  ContainerMain,
  ContainerOption
} from '../PaymentInformationForm/PaymentWrapper';

export default function PaymentCardForm({ ticketId, presentialOption, haveHotel, setPaymentConfirmed }) {
  function getTicketModality() {
    if(!presentialOption) {
      return (
        <>
          <h1>Online</h1>
          <h2>R$ 100</h2>
        </>
      );
    }
    if(!haveHotel) {
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
    <ContainerMain>
      <div>
        <ContainerChoices >
          <ContainerOption 
            width = '250px'
            height = '100px'
            selected={true}
          >
            {getTicketModality()}
          </ContainerOption>
        </ContainerChoices>
      </div>
      <CreditCardForm
        setPaymentConfirmed={setPaymentConfirmed}
        ticketId={ticketId}
      />
    </ContainerMain>
  );
}
