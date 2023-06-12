import { render, replace, remove } from '../framework/render';
import TripEventView from '../view/trip-event';
import FormEditView from '../view/form-edit';

export default class EventPresenter {
  #eventListContainer = null;

  #destinationsModel = null;
  #offersModel = null;

  #eventComponent = null;
  #eventEditComponent = null;
  #handleDataChange = null;

  #event = null;

  constructor({eventListContainer, destinationsModel, offersModel, onDataChange}) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new TripEventView({
      event: this.#event,
      destinations: this.#destinationsModel,
      offers: this.#offersModel,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#eventEditComponent = new FormEditView({
      event: this.#event,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#handleCloseClick,
      offers: this.#offersModel,
      destinations: this.#destinationsModel,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer.element);
      return;
    }

    if (this.#eventListContainer.element.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventListContainer.element.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleCloseClick = () => {
    this.#replaceFormToEvent();
  };

  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceFormToEvent();
  };
}
