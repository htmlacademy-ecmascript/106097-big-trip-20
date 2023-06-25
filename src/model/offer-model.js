import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class OfferModel extends Observable {
  #offers = null;
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#offers = await this.#eventsApiService.offers;
    } catch (err) {
      throw new Error('Can\'t load offers');
    }

    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
