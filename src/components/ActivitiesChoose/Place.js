import dayjs from 'dayjs';
import Activity from './Activity';

export default function Place({ activities }) {
  function calculteInterval(startsAt, endsAt) {
    const timeStarts = dayjs(startsAt).format('HH:MM');
    const timeEnds = dayjs(endsAt).format('HH:MM');
    return `${timeStarts} - ${timeEnds}`;
  }

  function calculateVacancies(capacity, registeredUsersAmount) {
    return capacity - registeredUsersAmount;
  }

  function calculteIntervalValue(startsAt, endsAt) {
    // 20 minutes => 1 unit
    const UNIT = 10;
    const timeStarts = dayjs(startsAt);
    const timeEnds = dayjs(endsAt);
    const differenceInMinutes = timeEnds.diff(timeStarts, 'minutes');
    return differenceInMinutes / UNIT;
  }
  return (
    <ul>
      {activities.map((a) =>
        <Activity
          name={a.name}
          interval={calculteInterval(a.startAt, a.endAt)}
          intervalValue={calculteIntervalValue(a.startAt, a.endAt)}
          availableVacancies={calculateVacancies(a.capacity, a._count.User)}
          id={a.id}
        />
      )}
    </ul>
  );
};

