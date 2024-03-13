import styled from 'styled-components';

export const ContainerMain = styled.main`
  h1 {
    font-size: 2.125rem;
    padding-bottom: 35px;
  }
  h2 {
    color: #8e8e8e;
    font-size: 1.25rem;
    padding-bottom: 20px;
  }
  h2 span {
    font-weight: bold;
  }
`;

export const ContainerChoices = styled.div`
  display: flex;
`;

export const ContainerOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  width: ${({ width }) => width || '145px' };
  height: ${({ height }) => height || '145px'};
  border: 1px solid #CECECE;
  border-radius: 20px;
  margin-right:24px;
  margin-bottom:44px;
  background: ${props => props.selected ?'#FFEED2': '#fff'};
 
  
  h1{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
    padding-bottom:0;
    margin-top:25px;

  }
  h2{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;

  }
`;

export const ContainerAccommodation = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FinishButton = styled.button`
  width: 10.125rem;
  height: 2.3125rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 0.25rem;
  outline: none;
  color: #000000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 13px;
  cursor: pointer;
`;
