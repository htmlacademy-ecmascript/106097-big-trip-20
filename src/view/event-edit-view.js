import { TYPES, EditType } from '../const.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { getAllDestinationsNames } from '../utils/event.js';
import { parseDateFromEditFormat } from '../utils/utils.js';

const EMPTY_POINT = {
  type: 'taxi',
  destinationId: '',
  start: new Date(),
  end: new Date(),
  cost: 100,
  isFavorite: false,
  offers: []
};

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
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }
  return code;
};

const createDestinationsTemplate = (destinations) => {
  const destinationItemsTemplate = destinations
    .map((element) => `<option value="${element.name}"></option>`)
    .join('');
  return destinationItemsTemplate;
};

function createDestinationPicturesTemaplate(pictures) {
  const picturesTemplate = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `
  <div class="event__photos-container">
  <div class="event__photos-tape">${picturesTemplate}</div>
  </div>`;
}

function createFormEditTemplate (event, allOffers, destinations, editingType) {
  const {type, destinationId, offers, cost, start, end, isDisabled, isSaving} = event;
  const offersTemplate = createOffers(allOffers.getByType(type), offers);
  let destinationName = '';
  if (destinationId !== '') {
    destinationName = destinations.getById(destinationId).name;
  }
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName !== null && destinationName !== undefined && destinationName !== '' ? destinationName : ''}" list="destination-list-1"  ${isDisabled ? 'disabled' : ''} required>
        <datalist id="destination-list-1">
          ${createDestinationsTemplate(destinations.destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format('DD/MM/YYYY HH:mm')}"  ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(end).format('DD/MM/YYYY HH:mm')}"  ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${cost}"  ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn event__reset-btn-${editingType === EditType.EDITING ? 'delete' : 'cancel'}" type="reset"  ${isDisabled ? 'disabled' : ''}>${editingType === EditType.EDITING ? 'Delete' : 'Cancel'}</button>
      ${editingType === EditType.EDITING ? `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` : ''}

    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>

      ${destinationId ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinations.getById(destinationId).description}</p>

        ${editingType === EditType.CREATING ? createDestinationPicturesTemaplate(destinations.getById(destinationId).pictures) : ''}

      </section>
      ` : ''}

    </section>
  </form>
</li>`;
}

export default class FormEditView extends AbstractStatefulView {
  #endDatepicker = null;
  #startDatepicker = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #handleCancelClick = null;

  #type;

  constructor({event = EMPTY_POINT, onFormSubmit, onCloseClick, offers, destinations, onDeleteClick, onCancelClick, type = EditType.EDITING}) {
    super();
    this._setState(FormEditView.parseEventToState(event));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCancelClick = onCancelClick;

    this.#type = type;

    this._restoreHandlers(this.#type);
  }

  get template () {
    return createFormEditTemplate(this._state, this.#offers, this.#destinations, this.#type);
  }

  reset(event) {
    this.updateElement(FormEditView.parseEventToState(event));
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    if (this.element.querySelector('.event__reset-btn-delete')) {
      this.element.querySelector('.event__reset-btn-delete')
        .addEventListener('click', this.#eventDeleteClickHandler);
    }

    if (this.element.querySelector('.event__reset-btn-cancel')) {
      this.element.querySelector('.event__reset-btn-cancel')
        .addEventListener('click', this.#eventCancelClickHandler);
    }

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceChangeHandler);

    this.element.querySelectorAll('.event__type-input')
      .forEach((element) => element.addEventListener('change', this.#eventTypeChangeHandler));

    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((element) => element.addEventListener('change', this.#eventOfferChangeHandler));

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.#setEndDatePicker();
    this.#setStartDatePicker();
  }

  #eventDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(FormEditView.parseStateToEvent(this._state));
  };

  #eventCancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  removeElement() {
    super.removeElement();

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }
  }

  #endDateChangeHandler = ([userDate]) => {
    this._setState({
      end: parseDateFromEditFormat(userDate),
    });
    this.#startDatepicker.set('maxDate', this._state.end);
  };

  #startDateChangeHandler = ([userDate]) => {
    this._setState({
      start: parseDateFromEditFormat(userDate),
    });
    this.#endDatepicker.set('minDate', this._state.start);
  };

  #setEndDatePicker() {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.end,
        onChange: this.#endDateChangeHandler,
        enableTime: true,
        minDate: this._state.start,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true,
      },
    );
  }

  #setStartDatePicker() {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.start,
        onChange: this.#startDateChangeHandler,
        enableTime: true,
        maxDate: this._state.end,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true,
      },
    );
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
      offers: [],
    });
  };

  #eventPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      ...this._state.event,
      cost: parseInt(evt.target.value,10),
    });
  };

  #eventOfferChangeHandler = (evt) => {
    evt.preventDefault();

    const { offers } = this._state;
    if (evt.target.checked) {
      if (offers.find((offer) => offer === evt.target.dataset.id) === undefined) {
        this._setState({
          offers: [...offers, evt.target.dataset.id]
        });
      }
    } else {
      const offersLeft = offers.filter((offer) => offer !== evt.target.dataset.id);
      this._setState({
        offers: offersLeft,
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const allDestinationsNames = getAllDestinationsNames(this.#destinations.destinations);
    if (!destinationName || !(allDestinationsNames.includes(destinationName))) {
      return;
    }
    const destination = this.#destinations.destinations.find((element) => element.name === evt.target.value);
    this.updateElement({
      destinationId: destination.id
    });
  };

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
