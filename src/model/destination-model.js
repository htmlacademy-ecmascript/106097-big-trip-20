import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class DestinationModel extends Observable {
  #eventsApiService = null;
  #destinations = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#eventsApiService.destinations;
    } catch (err) {
      throw new Error('Can\'t load destinations.');
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
