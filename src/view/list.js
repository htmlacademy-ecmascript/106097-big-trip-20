import {createElement} from '../render.js';

const emptyListMessage = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now',
};

const createEmptyListTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class ListView {
  constructor({list}) {
    this.list = list;
  }

  getTemplate () {
    return this.list;
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
