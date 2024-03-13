import { toast } from 'react-toastify';
import { createTicket, getTicketTypes } from '../../services/ticketApi';
import GetTicketTypeId from './GetTicketTypeId';
import { ContainerAccommodation, FinishButton } from './PaymentWrapper';

export default function FinishOrderSummary({
  selected,
  presentialOption,
  onlineOption,
  notHaveHotel,
  haveHotel,
  token,
  setTicketId,
  enrollment,
  setfirstSreenVisibility
}) {
  async function saveTicketsInfo() {
    const userId = enrollment.id;
    const ticketTypes = await getTicketTypes(token);
    const ticketTypeId = GetTicketTypeId(presentialOption, onlineOption, notHaveHotel, haveHotel, ticketTypes);
    const body = {
      userId,
      ticketTypeId,
    };
    try {
      const userTicket = await createTicket(body, token);
      setTicketId(userTicket.id);
      setfirstSreenVisibility(false);
    } catch (error) {
      toast.error('Não foi possível fazer a reserva!');
    }
  }

  return (
    <ContainerAccommodation>
      <h2>
        Fechado! O total ficou em
        <span> R$ {selected.price + selected.hotelPrice}</span>. Agora é só confirmar:
      </h2>
      <FinishButton
        onClick={() => {
          saveTicketsInfo();
        }}
      >
        RESERVAR INGRESSO
      </FinishButton>
    </ContainerAccommodation>
  );
}
