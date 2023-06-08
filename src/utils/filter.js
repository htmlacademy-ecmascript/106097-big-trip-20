import { FilterType } from '../const';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((event) => event.start > Date.now()),
  [FilterType.PRESENT]: (events) => events.filter((event) => dayjs(event.start).isSame(dayjs(), 'D')),
  [FilterType.PAST]: (events) => events.filter((event) => event.start < Date.now()),
};

export {filter};
