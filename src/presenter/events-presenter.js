import { RenderPosition, render } from '../framework/render';
import ListView from '../view/list';
import SortView from '../view/sort';
import FormEditView from '../view/form-edit';
import TripEventView from '../view/trip-event';

const listTemplate = '<ul class="trip-events__list"></ul>';

export default class EventsPresenter {
  listComponent = new ListView({list: listTemplate});

  constructor ({ boardContainer, eventsModel, destinationsModel, offersModel }) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init () {
    this.boardEvents = [...this.eventsModel.getEvents()];

    render(this.listComponent, this.boardContainer);
    render(new FormEditView(), this.listComponent.element);
    render(new SortView(), this.boardContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new TripEventView({event: this.boardEvents[i], destinations: this.destinationsModel, offers: this.offersModel}), this.listComponent.element);
    }
  }
}
