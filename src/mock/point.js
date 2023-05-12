import { getRandomArrayElement } from '../utils';

const mockEvents = [
  {
    type: 'Taxi',
    destinationId: 1,
    start: new Date('2023-07-14 12:00'),
    end: new Date('2023-07-14 12:30'),
    cost: 100,
    favourite: false,
    offers: ['Подача ко времени']
  },
  {
    type: 'Bus',
    destinationId: 2,
    start: new Date('2023-07-19 13:00'),
    end: new Date('2023-07-19 19:00'),
    cost: 20,
    favourite: false,
    offers: ['Выбрать место']
  },
  {
    type: 'Train',
    destinationId: 3,
    start: new Date('2023-07-20 08:00'),
    end: new Date('2023-07-21 01:30'),
    cost: 40,
    favourite: false,
    offers: ['Добавить багаж', 'Выбрать место', 'Ужин']
  },
  {
    type: 'Ship',
    destinationId: 4,
    start: new Date('2023-07-21 09:00'),
    end: new Date('2023-07-21 10:30'),
    cost: 80,
    favourite: false,
    offers: ['Комфорт класс']
  },
  {
    type: 'Drive',
    destinationId: 5,
    start: new Date('2023-07-25 06:00'),
    end: new Date('2023-07-25 15:00'),
    cost: 90,
    favourite: false,
    offers: ['Комфорт класс']
  },
  {
    type: 'Flight',
    destinationId: 6,
    start: new Date('2023-07-26 05:00'),
    end: new Date('2023-07-26 08:30'),
    cost: 300,
    favourite: false,
    offers: ['Возвратный билет', 'Добавить багаж', 'Выбрать место', 'Ужин']
  },
  {
    type: 'Check-in',
    destinationId: 7,
    start: new Date('2023-07-26 12:00'),
    end: new Date('2023-07-26 14:00'),
    cost: 0,
    favourite: false,
    offers: ['Раннее заселение']
  },
  {
    type: 'Sightseeing',
    destinationId: 8,
    start: new Date('2023-07-27 10:00'),
    end: new Date('2023-07-27 11:30'),
    cost: 0,
    favourite: true,
    offers: ['Билет без очереди', 'Гид']
  },
  {
    type: 'Restaurant',
    destinationId: 9,
    start: new Date('2023-07-27 19:00'),
    end: new Date('2023-07-27 20:00'),
    cost: 25,
    favourite: true,
    offers: ['Столик у окна']
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
