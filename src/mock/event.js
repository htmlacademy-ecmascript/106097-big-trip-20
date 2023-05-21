import { getRandomArrayElement } from '../utils';

const mockEvents = [
  {
    type: 'taxi',
    destination: 'Valencia',
    start: new Date('2023-07-14T12:00'),
    end: new Date('2023-07-14T12:30'),
    cost: 100,
    favourite: false,
    offers: [
      {
        name: 'Подача ко времени',
        price: '5'
      }
    ]
  },
  {
    type: 'bus',
    destination: 'Lisbon',
    start: new Date('2023-07-19T13:00'),
    end: new Date('2023-07-19T19:00'),
    cost: 20,
    favourite: false,
    offers: [
      {
        name: 'Выбрать место',
        price: '5'
      }
    ]
  },
  {
    type: 'train',
    destination: 'Moscow',
    start: new Date('2023-07-20T08:00'),
    end: new Date('2023-07-21T01:30'),
    cost: 40,
    favourite: false,
    offers: [
      {
        name: 'Добавить багаж',
        price: '20'
      },
      {
        name: 'Выбрать место',
        price: '5'
      },
      {
        name: 'Ужин',
        price: '15'
      }
    ]
  },
  {
    type: 'ship',
    destination: 'Munich',
    start: new Date('2023-07-21 09:00'),
    end: new Date('2023-07-21 10:30'),
    cost: 80,
    favourite: false,
    offers: [
      {
        name: 'Комфорт класс',
        price: '20'
      }
    ]
  },
  {
    type: 'drive',
    destination: 'Minsk',
    start: new Date('2023-07-25T06:00'),
    end: new Date('2023-07-25T15:00'),
    cost: 90,
    favourite: false,
    offers: [
      {
        name: 'Комфорт класс',
        price: '20'
      }
    ]
  },
  {
    type: 'flight',
    destination: 'Vilnus',
    start: new Date('2023-07-26T05:00'),
    end: new Date('2023-07-26T08:30'),
    cost: 300,
    favourite: false,
    offers: [
      {
        name: 'Возвратный билет',
        price: '10'
      },
      {
        name: 'Добавить багаж',
        price: '20'
      },
      {
        name: 'Выбрать место',
        price: '5'
      },
      {
        name: 'Ужин',
        price: '15'
      }
    ]
  },
  {
    type: 'check-in',
    destination: 'Saint-Petersburg',
    start: new Date('2023-07-26T12:00'),
    end: new Date('2023-07-26T14:00'),
    cost: 0,
    favourite: false,
    offers: [
      {
        name: 'Раннее заселение',
        price: '10'
      }
    ]
  },
  {
    type: 'sightseeing',
    destination: 'Warsaw',
    start: new Date('2023-07-27T10:00'),
    end: new Date('2023-07-27T11:30'),
    cost: 0,
    favourite: true,
    offers: [
      {
        name: 'Билет без очереди',
        price: '5'
      },
      {
        name: 'Гид',
        price: '15'
      }
    ]
  },
  {
    type: 'restaurant',
    destination: 'San-Francisco',
    start: new Date('2023-07-27T19:00'),
    end: new Date('2023-07-27T20:00'),
    cost: 25,
    favourite: true,
    offers: [
      {
        name: 'Столик у окна',
        price: '5'
      }
    ]
  }
];

const getRandomEvent = () => getRandomArrayElement(mockEvents);

export {getRandomEvent};
