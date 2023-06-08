export default class DestinationModel {
  constructor(destinations) {
    this.destinations = destinations;
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.destinations.find((destination) => destination.id === id);
  }
}
