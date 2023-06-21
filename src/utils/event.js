import dayjs from 'dayjs';

const sortByPrice = (eventA, eventB) => eventA.cost - eventB.cost;
const sortByTime = (eventA, eventB) => {
  const eventAduration = dayjs(eventA.end).diff(eventA.start);
  const eventBduration = dayjs(eventB.end).diff(eventB.start);
  return eventAduration - eventBduration;
};

const getAllDestinationsNames = (destinations) => destinations.map((element) => element.name);

export { sortByPrice, sortByTime, getAllDestinationsNames };
