import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import Card from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';
import { processPayment } from '../../services/paymentApi';
import Button from '../Form/Button';

export default function CreditCardForm({ cardVisibility, ticketId, setPaymentConfirmed }) {
  const [form, setForm] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [cardType, setCardType] = useState(undefined);
  const { userData } = useContext(UserContext);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'number' && value.length > 19) {
      return;
    }

    if (name === 'expiry' && isNaN(Number(value))) {
      if (!value.includes('/')) {
        return;
      }
    }

    if (name === 'expiry' && value.length === 4 && value[2] !== '/') {
      setForm({ ...form, expiry: `${value[0]}${value[1]}/${value[2]}${value[3]}` });
      return;
    }

    if (name === 'expiry' && value.length > 4) {
      return;
    }

    if (name === 'cvc' && value.length > 3) {
      return;
    }

    setForm((form) => ({ ...form, [name]: value }));
  }

  function handleInputFocus(e) {
    setForm((form) => ({ ...form, focus: e.target.name }));
  }

  function isValidMonth(month) {
    return Number(month) <= 12;
  }

  function isValidDate(date) {
    if (dayjs(date) <= dayjs()) {
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    if (!form.cvc || !form.expiry || !form.name || !form.number) {
      return toast.warning('Todos os dados são necessários');
    }

    if (form.cvc.length !== 3) {
      return toast.warning('CVC precisar ter 3 dígitos');
    }

    if (dayjs(form.expiry) > dayjs()) {
      return toast.warning('Data de expiração inválida');
    }

    if (form.number.length < 15) {
      return toast.warning('Número do cartão precisa ter pelo menos 15 dígitos');
    }

    const expirationDate = '20' + form.expiry[3] + form.expiry[4] + '-' + form.expiry[0] + form.expiry[1];
    const month = expirationDate[5] + expirationDate[6];
    if (!isValidMonth(month) || !isValidDate(expirationDate)) {
      return toast.warning('Insira uma data de expiração válida');
    }

    try {
      const body = {
        ticketId,
        cardData: {
          issuer: cardType.issuer,
          number: form.number,
          expirationDate: dayjs(expirationDate).format('YYYY-MM-DD'),
          cvv: form.cvc,
        },
      };
      await processPayment(body, userData.token);
      toast('Pagamento efetuado com sucesso.');
      setPaymentConfirmed(true);
    } catch (err) {
      toast.error('Algo deu errado, por favor tente mais tarde.');
    }
  } 

  return (
    <ContainerCreditCardForm display={cardVisibility ? 'flex' : 'none'}>
      <h2>Pagamento</h2>
      <FormContainer>
        <CardDiv>
          <Card
            number={form.number}
            name={form.name}
            expiry={form.expiry}
            cvc={form.cvc}
            focused={form.focus}
            callback={(type) => setCardType(type)}
          />
        </CardDiv>
        <CardForm onSubmit={() => handleSubmit()}>
          <InputCreditCard
            id="number"
            label="number"
            name="number"
            type="number"
            value={form.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Card Number"
          />
          <LabelNumber for="number">E.g.: 49...,51...,36...,37...</LabelNumber>
          <InputCreditCard
            label="name"
            name="name"
            type="name"
            value={form.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Name"
          />
          <WrapInput>
            <InputCreditCard
              width="200px"
              label="expiry"
              name="expiry"
              type="text"
              value={form.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Valid Thru"
            />
            <InputCreditCard
              width="70px"
              label="cvc"
              name="cvc"
              type="number"
              value={form.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="CVC"
            />
          </WrapInput>
        </CardForm>
      </FormContainer>
      <ButtonDiv>
        <Button onClick={handleSubmit}>FINALIZAR PAGAMENTO</Button>
      </ButtonDiv>
    </ContainerCreditCardForm>
  );
}

const ContainerCreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const FormContainer = styled.div`
  display: flex;
  margin-top: 30px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

const CardDiv = styled.div`
  width: fit-content;
  margin-right: 40px;
`;

const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputCreditCard = styled.input`
  display: flex;
  border: 2px solid gray;
  border-radius: 5px;
  height: 46px;
  width: ${({ width }) => width || '300px'};
  font-size: 18px;
  padding-left: 10px;
`;

const LabelNumber = styled.label`
  color: #929292;
`;

const WrapInput = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  margin-top: 40px;
  width: 300px;
`;
