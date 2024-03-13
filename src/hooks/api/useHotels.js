import useAsync from '../useAsync';
import useToken from '../useToken';

import * as HotelsApi from '../../services/hotelsApi';

export default function useHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => HotelsApi.getHotelsInformation(token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels,
  };
}
