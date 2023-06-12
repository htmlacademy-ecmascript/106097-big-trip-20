import { RenderPosition, render } from '../framework/render';
import ListView from '../view/list';
import SortView from '../view/sort-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import { updateItem } from '../utils/utils';
import { SortType } from '../const';
import { sortByPrice, sortByTime } from '../utils/event';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardEvents = [];
  #eventPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedEvents = [];

  #listComponent = new ListView({list: listTemplate});

  constructor ({ boardContainer, eventsModel, destinationsModel, offersModel }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init () {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#sourcedEvents = [...this.#eventsModel.events];
    render(this.#listComponent, this.#boardContainer);

    if (this.#boardEvents.length === 0) {
      render(new NoEventsView(), this.#boardContainer);
      return;
    }
    this.#renderSort();
    this.#renderEvents();
  }

  #renderEvents() {
    this.#boardEvents.forEach((event) => this.#renderEvent(event));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#boardEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardEvents.sort(sortByPrice);
        break;
      default:
        this.#boardEvents = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEvents();
  };

  #renderSort() {
    this.#sortComponent = new SortView ({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#listComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }
}
