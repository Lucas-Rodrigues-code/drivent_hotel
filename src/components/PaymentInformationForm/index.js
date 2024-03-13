import { useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useToken from '../../hooks/useToken';
import {
  ContainerAccommodation,
  ContainerChoices,
  ContainerMain,
  ContainerOption
} from '../PaymentInformationForm/PaymentWrapper';
import FinishOrderSummary from './FinishOrderSummary';

export default function PaymentInformationForm({ 
  setfirstSreenVisibility,
  setTicketId,
  presentialOption,
  setPresentialOption,
  onlineOption, 
  setOnlineOption,
  haveHotel,
  setHaveHotel,
  notHaveHotel,
  setNotHaveHotel
}) {
  const [selected, setSelected] = useState({
    online: null,
    price: null,
    hotelPrice: null,
  });

  const { enrollment } = useEnrollment();
  const token = useToken();

  function handleModality(online, price) {
    setSelected({ online, price, hotelPrice: null });
    if (online === true) {
      setPresentialOption(false);
      setOnlineOption(true);
      setNotHaveHotel(true);
      setHaveHotel(false);
    } else {
      setPresentialOption(true);
      setOnlineOption(false);
      setNotHaveHotel(false);
      setHaveHotel(false);
    }
  }

  function handleHospitality(hotelChoice, hotelPrice) {
    if (hotelChoice) {
      setSelected({ ...selected, hotelPrice });
      setHaveHotel(true);
      setNotHaveHotel(false);
    } else {
      setSelected({ ...selected, hotelPrice: null });
      setHaveHotel(false);
      setNotHaveHotel(true);
    }
  }

  return (
    <ContainerMain>
      <div>
        <ContainerChoices >
          <ContainerOption selected={presentialOption} onClick={() => handleModality(false, 250)}><h1>Presencial</h1><h2>R$ 250</h2></ContainerOption>
          <ContainerOption selected={onlineOption} onClick={() => handleModality(true, 100)}><h1>Online</h1><h2>R$ 100</h2></ContainerOption>
        </ContainerChoices>
      </div>
      <div>
        {presentialOption ? (
          <ContainerAccommodation>
            <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
            <ContainerChoices>
              <ContainerOption selected={notHaveHotel} notHaveHotel={notHaveHotel} onClick={() => handleHospitality(false, 0)}>
                <h1>Sem Hotel</h1><h2>+ R$ 0</h2>
              </ContainerOption>
              <ContainerOption selected={haveHotel} haveHotel={haveHotel} onClick={() => handleHospitality(true, 350)}>
                <h1>Com Hotel</h1><h2>+ R$ 350</h2>
              </ContainerOption>
            </ContainerChoices>
          </ContainerAccommodation>
        ) : (
          <></>
        )}
      </div>
      {haveHotel || notHaveHotel ? (
        <FinishOrderSummary
          selected={selected}
          presentialOption={presentialOption}
          onlineOption={onlineOption}
          notHaveHotel={notHaveHotel}
          haveHotel={haveHotel}
          token={token}
          setTicketId={setTicketId}
          enrollment={enrollment}
          setfirstSreenVisibility={setfirstSreenVisibility}
        />
      ) : (
        <></>
      )}
    </ContainerMain>
  );
}
