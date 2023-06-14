import { TYPES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';

const createEventTypes = () => {
  let code = '';

  for (const type of TYPES) {
    code += `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
  </div>`;
  }

  return code;
};

const createOffers = (offers, eventOffers) => {
  let code = '';
  for (const offer of offers) {
    const checked = eventOffers.filter((i) => i === offer.id);

    code += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.name}" ${checked.length ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }
  return code;
};

const createDestinationsTemplate = (destinations) => {
  const destinationItemsTemplate = destinations
    .map((element) => `<option value="${element.town}"></option>`)
    .join('');
  return destinationItemsTemplate;
};

function createFormEditTemplate (event, allOffers, destinations) {
  const {type, destinationId, offers, cost, start, end} = event;
  const offersTemplate = createOffers(allOffers.getByType(type), offers);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypes()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.getById(destinationId).town}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationsTemplate(destinations.get().destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format('DD/MM/YYYY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(end).format('DD/MM/YYYY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinations.getById(destinationId).description}</p>
      </section>
    </section>
  </form>
</li>`;
}

export default class FormEditView extends AbstractStatefulView {
  #event = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({event, onFormSubmit, onCloseClick, offers, destinations}) {
    super();
    this._setState(FormEditView.parseEventToState(event));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#offers = offers;
    this.#destinations = destinations;
    this._restoreHandlers();
  }

  get template () {
    return createFormEditTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceChangeHandler);

    this.element.querySelectorAll('.event__type-input')
      .forEach((element) => element.addEventListener('change', this.#eventTypeChangeHandler));

    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((element) => element.addEventListener('change', this.#eventOfferChangeHandler));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToEvent(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #eventPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      cost: evt.target.value,
    });
  };

  #eventOfferChangeHandler = (evt) => {
    evt.preventDefault();

    const { offers } = this._state;
    if (evt.target.checked) {
      if (offers.find((offer) => offer === evt.target.dataset.id) === undefined) {
        this._setState({
          offers: [...offers, parseInt(evt.target.dataset.id, 10)]
        });
      }
    } else {
      const offersLeft = offers.filter((offer) => offer !== parseInt(evt.target.dataset.id, 10));
      this._setState({
        offers: offersLeft,
      });
    }
  };

  static parseEventToState(event) {
    return {
      ...event
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    return event;
  }
}
