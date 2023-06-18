const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TYPE_DEFAULT = 'flight';

const EVENT_EMPTY = {
  type: TYPE_DEFAULT,
  destinationId: null,
  start: null,
  end: null,
  cost: 0,
  isFavorite: false,
  offers: []
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'date',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

export { EVENT_EMPTY, TYPES, FilterType, SortType, UserAction, UpdateType, EditType };
