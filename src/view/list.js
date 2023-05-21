import {createElement} from '../render.js';

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
