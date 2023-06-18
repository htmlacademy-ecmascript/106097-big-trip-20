import { RenderPosition, render, remove } from '../framework/render';
import ListView from '../view/list-view';
import SortView from '../view/sort-view';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';
import { SortType, UserAction, UpdateType, FilterType } from '../const';
import { sortByPrice, sortByTime } from '../utils/event';
import { filter } from '../utils/filter';
import NewEventPresenter from './new-event-presenter';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventPresenters = new Map();
  #sortComponent = null;
  #noEventComponent = null;
  #filterModel = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #newEventPresenter = null;
  #handleDestroy;

  #isCreating = false;

  #listComponent = new ListView({list: listTemplate});

  constructor ({ boardContainer, eventsModel, destinationsModel, offersModel, filterModel, onNewEventDestroy }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#handleDestroy = onNewEventDestroy;

    this.#newEventPresenter = new NewEventPresenter({
      onDataChange: this.#handleViewAction,
      eventListContainer: this.#listComponent.element,
      onDestroy: this.#newEventDestroyHandler,
      offers: this.#offersModel,
      destinations: this.#destinationsModel,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init () {
    this.#renderBoard();
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case (SortType.TIME):
        return filteredEvents.sort(sortByTime);
      case (SortType.PRICE):
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  createEvent() {
    this.#isCreating = true;
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(
      UpdateType.MAJOR,
      FilterType.EVERYTHING,
    );
    this.#newEventPresenter.init();
  }

  #newEventDestroyHandler = () => {
    this.#handleDestroy();
    this.#isCreating = false;
    this.#renderNoEvents();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    render(this.#listComponent, this.#boardContainer);

    const eventsCount = this.events.length;
    if (eventsCount === 0 && !this.#isCreating) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }

  #renderEvents() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents() {
    this.#noEventComponent = new NoEventsView({
      filterType: this.#filterType,
    });
    render(this.#noEventComponent, this.#boardContainer);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#clearBoard();
    this.#renderBoard();
    this.#currentSortType = sortType;
  };

  #renderSort() {
    this.#sortComponent = new SortView ({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#listComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }
}
