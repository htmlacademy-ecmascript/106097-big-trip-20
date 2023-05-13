import { getRandomArrayElement } from '../utils';

const mockEvents = [
  {
    type: 'taxi',
    destinationId: 1,
    start: new Date('2023-07-14T12:00'),
    end: new Date('2023-07-14T12:30'),
    cost: 100,
    favourite: false,
    offers: ['Подача ко времени']
  },
  {
    type: 'bus',
    destinationId: 2,
    start: new Date('2023-07-19T13:00'),
    end: new Date('2023-07-19T19:00'),
    cost: 20,
    favourite: false,
    offers: ['Выбрать место']
  },
  {
    type: 'train',
    destinationId: 3,
    start: new Date('2023-07-20T08:00'),
    end: new Date('2023-07-21T01:30'),
    cost: 40,
    favourite: false,
    offers: ['Добавить багаж', 'Выбрать место', 'Ужин']
  },
  {
    type: 'ship',
    destinationId: 4,
    start: new Date('2023-07-21 09:00'),
    end: new Date('2023-07-21 10:30'),
    cost: 80,
    favourite: false,
    offers: ['Комфорт класс']
  },
  {
    type: 'drive',
    destinationId: 5,
    start: new Date('2023-07-25T06:00'),
    end: new Date('2023-07-25T15:00'),
    cost: 90,
    favourite: false,
    offers: ['Комфорт класс']
  },
  {
    type: 'flight',
    destinationId: 6,
    start: new Date('2023-07-26T05:00'),
    end: new Date('2023-07-26T08:30'),
    cost: 300,
    favourite: false,
    offers: ['Возвратный билет', 'Добавить багаж', 'Выбрать место', 'Ужин']
  },
  {
    type: 'check-in',
    destinationId: 7,
    start: new Date('2023-07-26T12:00'),
    end: new Date('2023-07-26T14:00'),
    cost: 0,
    favourite: false,
    offers: ['Раннее заселение']
  },
  {
    type: 'sightseeing',
    destinationId: 8,
    start: new Date('2023-07-27T10:00'),
    end: new Date('2023-07-27T11:30'),
    cost: 0,
    favourite: true,
    offers: ['Билет без очереди', 'Гид']
  },
  {
    type: 'restaurant',
    destinationId: 9,
    start: new Date('2023-07-27T19:00'),
    end: new Date('2023-07-27T20:00'),
    cost: 25,
    favourite: true,
    offers: ['Столик у окна']
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
