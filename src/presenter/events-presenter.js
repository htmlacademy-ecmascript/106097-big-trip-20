import { RenderPosition, render } from '../render';
import ListView from '../view/list';
import SortView from '../view/sort';
import FormEditView from '../view/form-edit';
import TripEventView from '../view/trip-event';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class EventsPresenter {
  listComponent = new ListView({list: listTemplate});

  constructor ({ boardContainer, eventsModel }) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
  }

  init () {
    this.boardEvents = [...this.eventsModel.getEvents()];

    render(this.listComponent, this.boardContainer);
    render(new FormEditView(), this.listComponent.getElement());
    render(new SortView(), this.boardContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new TripEventView({event: this.boardEvents[i]}), this.listComponent.getElement());
    }
  }
}
