import { FilterType } from '../const';
import dayjs from 'dayjs';

// const isEventPast = (events) => {
//   console.log(events.filter((event) => dayjs(event.start).isSame(dayjs())));
//   return events.filter((event) => dayjs(event.start).isSame(dayjs(), 'D'));
// };

// const isEventPresent = (events) => {
//   return events.filter((event) => dayjs(event.start).isSame(dayjs(), 'D'));
// };

const filterFuturePast = (events) => events.filter((event) => dayjs(new Date()).diff(event.start) > 0);
const filterPresentEvents = (events) => events.filter((event) => dayjs(new Date()).diff(event.end) < 0 && dayjs(new Date()).diff(event.start) > 0);
const filterFutureEvents = (events) => events.filter((event) => dayjs(new Date()).diff(event.end) < 0);

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => filterFutureEvents(events),
  [FilterType.PRESENT]: (events) => filterPresentEvents(events),
  [FilterType.PAST]: (events) => filterFuturePast(events),
};

export {filter};
