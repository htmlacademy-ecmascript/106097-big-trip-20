import { render, remove, RenderPosition } from '../framework/render';
import FormEditView from '../view/event-edit-view';
import { UserAction, UpdateType, EditType } from '../const';

export default class NewEventPresenter {
  #eventListContainer = null;
  #eventEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #offers = null;
  #destinations = null;

  constructor({onDataChange, eventListContainer, onDestroy, offers, destinations}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new FormEditView({
      onFormSubmit: this.#handleFormSubmit,
      offers: this.#offers,
      destinations: this.#destinations,
      type: EditType.CREATING,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleCancelClick = () => {
    remove(this.#eventEditComponent);
    this.destroy();
  };
}
