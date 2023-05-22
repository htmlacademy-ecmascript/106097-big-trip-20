export default class OfferModel {
  constructor(offers) {
    this.offers = offers.offers;
  }

  get() {
    return this.offers;
  }

  getByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }
}
