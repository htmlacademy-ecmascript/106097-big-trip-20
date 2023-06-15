import { getRandomArrayElement } from '../utils/utils';

const mockEvents = [
  {
    id: 1,
    type: 'taxi',
    destinationId: 1,
    start: new Date('2023-07-14T12:00'),
    end: new Date('2023-07-14T12:30'),
    cost: 100,
    isFavorite: false,
    offers: [5]
  },
  {
    id: 2,
    type: 'bus',
    destinationId: 2,
    start: new Date('2023-07-19T13:00'),
    end: new Date('2023-07-19T19:00'),
    cost: 20,
    isFavorite: false,
    offers: [3]
  },
  {
    id: 3,
    type: 'train',
    destinationId: 3,
    start: new Date('2023-07-20T08:00'),
    end: new Date('2023-07-21T01:30'),
    cost: 40,
    isFavorite: false,
    offers: [2, 3, 4,]
  },
  {
    id: 4,
    type: 'ship',
    destinationId: 4,
    start: new Date('2023-07-21 09:00'),
    end: new Date('2023-07-21 10:30'),
    cost: 80,
    isFavorite: false,
    offers: [6]
  },
  {
    id: 5,
    type: 'drive',
    destinationId: 5,
    start: new Date('2023-07-25T06:00'),
    end: new Date('2023-07-25T15:00'),
    cost: 90,
    isFavorite: false,
    offers: [6]
  },
  {
    id: 6,
    type: 'flight',
    destinationId: 6,
    start: new Date('2023-07-26T05:00'),
    end: new Date('2023-07-26T08:30'),
    cost: 300,
    isFavorite: false,
    offers: [1, 3, 4]
  },
  {
    id: 7,
    type: 'check-in',
    destinationId: 7,
    start: new Date('2023-07-26T12:00'),
    end: new Date('2023-07-26T14:00'),
    cost: 0,
    isFavorite: false,
    offers: [7]
  },
  {
    id: 8,
    type: 'sightseeing',
    destinationId: 8,
    start: new Date('2023-07-27T10:00'),
    end: new Date('2023-07-27T11:30'),
    cost: 0,
    isFavorite: true,
    offers: [8, 9]
  },
  {
    id: 9,
    type: 'restaurant',
    destinationId: 8,
    start: new Date('2023-07-27T19:00'),
    end: new Date('2023-07-27T20:00'),
    cost: 25,
    isFavorite: true,
    offers: [10]
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
