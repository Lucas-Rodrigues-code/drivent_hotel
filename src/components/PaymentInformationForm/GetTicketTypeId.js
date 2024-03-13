export default function GetTicketTypeId(presentialOption, onlineOption, notHaveHotel, haveHotel, ticketTypes) {
  if (onlineOption) {
    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === true) {
        return ticketTypes[i].id;
      }
    }
  } else if (presentialOption && notHaveHotel) {
    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i].includesHotel === false && ticketTypes[i].isRemote === false) {
        return ticketTypes[i].id;
      }
    }
  } else if (presentialOption && haveHotel) {
    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i].includesHotel === true && ticketTypes[i].isRemote === false) {
        return ticketTypes[i].id;
      }
    }
  }
}
