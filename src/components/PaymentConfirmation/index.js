import React from 'react';
import styled from 'styled-components';
import checked from '../../assets/images/akar-icons_circle-check-fill.svg';

function PaymentConfirmation() {
  return (
    <PaymentConfirmationContainer>
      <img src={checked} alt="Checked" />
      <PaymentMessageContainer>
        <ConfirmationMessage>Pagamento confirmado!</ConfirmationMessage>
        <NextStepMessage>Prossiga para escolha de atividades </NextStepMessage>
      </PaymentMessageContainer>
    </PaymentConfirmationContainer>
  );
}

export default PaymentConfirmation;

const PaymentConfirmationContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  gap: 15px;
`;

const PaymentMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ConfirmationMessage = styled.span`
  font-weight: bold;
  color: #454545;
`;

const NextStepMessage = styled.span`
  font-weight: normal;
  color: #454545;
`;
