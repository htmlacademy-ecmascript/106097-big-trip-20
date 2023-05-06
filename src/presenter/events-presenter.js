import { RenderPosition, render } from '../render';
import ListView from '../view/list';
import SortView from '../view/sort';
import FormEditView from '../view/form-edit';
import TripEventView from '../view/trip-event';

export default class EventsPresenter {
  listComponent = new ListView();

  constructor ({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init () {
    render(this.listComponent, this.boardContainer);
    render(new FormEditView(), this.listComponent.getElement());
    render(new SortView(), this.boardContainer, RenderPosition.AFTERBEGIN);
    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.listComponent.getElement());
    }
  }
}
