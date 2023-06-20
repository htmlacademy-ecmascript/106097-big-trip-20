import HeaderView from '../view/header-view';
import { RenderPosition, render, replace, remove } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #eventModel = null;
  #destinationModel = null;
  #headerComponent = null;

  constructor({headerContainer, eventModel, destinationModel}) {
    this.#headerContainer = headerContainer;
    this.#eventModel = eventModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    const prevHeaderComponent = this.#headerComponent;

    this.#headerComponent = new HeaderView({
      events: this.#eventModel.events,
      destinations: this.#destinationModel.destinations,
    });

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }
}
