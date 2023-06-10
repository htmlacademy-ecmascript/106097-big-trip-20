import AbstractView from '../framework/view/abstract-view';
import { formatDataForTag, formatDataForHuman, formatTime, getDuration } from '../utils.js';


const createOffers = (offers) => {
  let code = '';
  for (const offer of offers) {
    code += `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`;
  }
  return code;
};

function createTripEventTemplate (event, destinations) {
  const {start, end, type, cost, destinationId, favourite} = event;

  const dateForTag = formatDataForTag(start);
  const dateForHuman = formatDataForHuman(start);
  const timeStart = formatTime(start);
  const timeEnd = formatTime(end);
  const duration = getDuration(start, end);
  const offersTemplate = createOffers(event.offers);
  const destination = destinations.getById(destinationId);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateForTag}">${dateForHuman}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.town}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${start}">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${end}">${timeEnd}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${cost}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersTemplate}
    </ul>
    <button class="event__favorite-btn ${favourite === true ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripEventView extends AbstractView {
  #event = null;
  #destinations = null;
  #handleEditEvent = null;

  constructor ({event, destinations, onEditClick}) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#handleEditEvent = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template () {
    return createTripEventTemplate(this.#event, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditEvent();
  };
}
