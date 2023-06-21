import AbstractView from '../framework/view/abstract-view';
import { formatDataForHuman } from '../utils/utils';
import { sortByTime } from '../utils/event';

const MAX_DESTINATIONS = 3;

function getTripRoute(destinations) {
  if (destinations.length <= MAX_DESTINATIONS) {
    let template = '';
    for (let i = 0; i < destinations.length; i++) {
      if (i === destinations.length - 1) {
        template += destinations[i];
      }
      template += `${destinations[i]} &mdash; `;
    }
    return template;
  }

  const firstDestination = destinations[0];
  const lastDestination = destinations.at(-1);
  return `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
}

function getTripDuration(events) {
  events = events.sort(sortByTime);
  const firstEventDateStart = formatDataForHuman(events[0].start);
  const lastEventDateEnd = formatDataForHuman(events.at(-1).end);
  return `${firstEventDateStart}&nbsp;&mdash;&nbsp;${lastEventDateEnd}`;
}

function calculateTripPrice(events) {
  let totalPrice = 0;
  events.forEach((element) => {
    totalPrice += element.cost;
  });
  return totalPrice;
}

function createHeaderTemplate(events, allDestinations) {
  const eventsDestinationsIds = events.map((event) => event.destinationId);
  const eventsDestinations = eventsDestinationsIds.map((destinationId) => allDestinations.find((destination) => destination.id === destinationId));
  const eventsDestinationsNames = eventsDestinations.map((destination) => destination.name);
  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripRoute(eventsDestinationsNames)}</h1>

      <p class="trip-info__dates">${getTripDuration(events)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTripPrice(events)}</span>
    </p>
  </section>
  `;
}

export default class HeaderView extends AbstractView {
  #events = null;
  #destinations = null;

  constructor({events, destinations}) {
    super();
    this.#events = events;
    this.#destinations = destinations;
  }

  get template() {
    return createHeaderTemplate(this.#events, this.#destinations);
  }
}
