import { RenderPosition, render } from '../framework/render';
import ListView from '../view/list';
import SortView from '../view/sort';
import NoEventsView from '../view/no-events-view';
import EventPresenter from './event-presenter';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class BoardPresenter {
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
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#listComponent,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    eventPresenter.init(tripEvent);
  }
}
