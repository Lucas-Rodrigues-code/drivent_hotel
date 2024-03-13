import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import HotelChoose from '../../../components/HotelChoose';

import useHotels from '../../../hooks/api/useHotels';

export default function Hotel() {
  const { getHotels } = useHotels();
  const [dataHotels, setDataHotels] = useState(null);

  useEffect(() => {
    getHotels()
      .then((res) => {
        setDataHotels(res);
      })
      .catch((err) => {
        toast(err);
      });
  }, []);

  return (
    <Cont>
      <HotelChoose dataHotels={dataHotels} />
    </Cont>
  );
}

export const Cont = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  height: 100%;
  height: fit-content; 
`;
