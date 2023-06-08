import { RenderPosition, render, replace } from '../framework/render';
import ListView from '../view/list';
import SortView from '../view/sort';
import TripEventView from '../view/trip-event';
import FormEditView from '../view/form-edit';
import NoEventsView from '../view/no-events-view';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class EventsPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardEvents = [];

  #listComponent = new ListView({list: listTemplate});

  constructor ({ boardContainer, eventsModel, destinationsModel, offersModel }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init () {
    this.#renderBoard();
    render(new SortView(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    this.#boardEvents = [...this.#eventsModel.events];
    render(this.#listComponent, this.#boardContainer);

    if (this.#boardEvents.length === 0) {
      render(new NoEventsView(), this.#boardContainer);
      return;
    }

    for (let i = 0; i < this.#boardEvents.length; i++) {
      this.#renderTripEvent(this.#boardEvents[i]);
    }
  }

  #renderTripEvent(tripEvent) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new TripEventView({
      event: tripEvent,
      destinations: this.#destinationsModel,
      offers: this.#offersModel,
      onEditClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new FormEditView({
      event,
      onFormSubmit: () => {
        closeEventEditForm();
      },
      onCloseClick: () => {
        closeEventEditForm();
      }
    });

    function replaceEventToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    function closeEventEditForm() {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(eventComponent, this.#listComponent.element);
  }
}
