import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getActivitiesUser, signUpActivity } from '../../services/activities';
import { toast } from 'react-toastify';

export default function Activity({ name, interval, intervalValue, availableVacancies, id }) {
  const isAvailable = availableVacancies > 0;
  const RED = '#CC6666';
  const GREEN = '#078632';
  const DEFAULT_ACTIVITY_SIZE = 10;
  const height = ((DEFAULT_ACTIVITY_SIZE * intervalValue)) + 'px';

  const [registered, setRegistered] = useState([]);

  const token = useToken();

  useEffect(async() => {
    setRegistered(await (await getActivitiesUser(token)).data);
  }, [subscribe]);

  async function subscribe() {
    try {
      await signUpActivity(id, token);
    } catch (err) {
      if (err.response.data.name === 'alreadyRegisteredError') {
        toast.warning('Você já está inscrito !');
      };
      if (err.response.data.name === 'schedulesConflictError') {
        toast.warning('Essa atividade conflita com o horario de outra atividade sua!');
      };
      if (err.response.data.name === 'noVacancyError') {
        toast.warning('Vagas esgotadas :(');
      };
    };
  };

  return (
    <ActivityStyle height={height}>
      <TextDiv>
        <h1> {name} </h1>
        <p> {interval}</p>
      </TextDiv>
      <VacanciesDiv
        color={isAvailable ? GREEN : RED}
      >
        <IconWrapper>
          {isAvailable ?
            (registered.includes(id) ?
              <ion-icon onClick={subscribe} name="checkmark-circle-outline"></ion-icon> :
              <ion-icon onClick={subscribe} name='enter-outline' />)
            :
            <ion-icon
              onClick={subscribe}
              name="close-circle-outline"
            />
          }
        </IconWrapper>
        {isAvailable ?
          (registered.includes(id) ? <p>Inscrito</p> :
            <p>{availableVacancies} vagas</p>)
          :
          <p>Esgotado</p>
        }
      </VacanciesDiv>

    </ActivityStyle>
  );
};

const ActivityStyle = styled.li`
  display: flex;
  height: ${({ height }) => height};
  font-family: 'Roboto', sans-serif;
  background-color: #F1F1F1;
  border-radius: 5px;
  margin: 6px 0;
  padding: 10px;
`;

const TextDiv = styled.div`
  width: 70%;

  h1 {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-right: 10px;
  }

  p {
    font-size: 12px ;
  }
`;

const VacanciesDiv = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  align-items: center;
  justify-content: center;
  width: 30%;
  border-left: 1px solid #CFCFCF;

  font-size: 9px;
  color: ${({ color }) => color};
`;

const IconWrapper = styled.div`
  font-size: 20px;
`;

