import AbstractView from '../framework/view/abstract-view';

export default class ListView extends AbstractView {
  constructor ({list}) {
    super ();
    this.list = list;
  }

  get template () {
    return this.list;
  }
}
