const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TYPE_DEFAULT = 'flight';

const EVENT_EMPTY = {
  type: TYPE_DEFAULT,
  destinationId: null,
  start: null,
  end: null,
  cost: 0,
  favourite: false,
  offers: []
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { EVENT_EMPTY, TYPES, FilterType };
