import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/roomApi';

export default function useBooking() {
  const token = useToken();
  
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: bookRoom
  } = useAsync((roomId) => bookingApi.bookRoom ({ roomId }, token));

  return {
    booking,
    bookingLoading,
    bookingError,
    bookRoom
  };
}
