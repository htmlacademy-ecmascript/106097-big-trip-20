const mockEvents = [
  {
    type: 'Taxi',
    destinationId: 1,
    start: new Date('2023-07-14 12:00'),
    end: new Date('2023-07-14 12:30'),
    cost: 100,
    favourite: false,
    offers: [1]
  },
  {
    type: 'Bus',
    destinationId: 2,
    start: new Date('2023-07-19 13:00'),
    end: new Date('2023-07-19 19:00'),
    cost: 20,
    favourite: false,
    offers: [1, 2]
  },
  {
    type: 'Train',
    destinationId: 3,
    start: new Date('2023-07-20 08:00'),
    end: new Date('2023-07-21 01:30'),
    cost: 40,
    favourite: false,
    offers: [1, 3]
  },
  {
    type: 'Ship',
    destinationId: 4,
    start: new Date('2023-07-21 09:00'),
    end: new Date('2023-07-21 10:30'),
    cost: 80,
    favourite: false,
    offers: [2, 3]
  },
  {
    type: 'Drive',
    destinationId: 5,
    start: new Date('2023-07-25 06:00'),
    end: new Date('2023-07-25 15:00'),
    cost: 90,
    favourite: false,
    offers: [1, 4]
  },
  {
    type: 'Flight',
    destinationId: 6,
    start: new Date('2023-07-26 05:00'),
    end: new Date('2023-07-26 08:30'),
    cost: 300,
    favourite: false,
    offers: [1, 2, 3]
  },
  {
    type: 'Check-in',
    destinationId: 7,
    start: new Date('2023-07-26 12:00'),
    end: new Date('2023-07-26 14:00'),
    cost: 0,
    favourite: false,
    offers: [2, 4]
  },
  {
    type: 'Sightseeing',
    destinationId: 8,
    start: new Date('2023-07-27 10:00'),
    end: new Date('2023-07-27 11:30'),
    cost: 0,
    favourite: true,
    offers: [3, 4]
  },
  {
    type: 'Restaurant',
    destinationId: 9,
    start: new Date('2023-07-27 19:00'),
    end: new Date('2023-07-27 20:00'),
    cost: 25,
    favourite: true,
    offers: [2, 3, 4]
  }
];
