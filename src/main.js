import { RenderPosition, render } from './render';
import FilterView from './view/filters';
import EventsPresenter from './presenter/events-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), filtersElement, RenderPosition.AFTERBEGIN);

const eventModel = new EventModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});

const eventsPresenter = new EventsPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
  destinationsModel: destinationModel,
  offersModel: offerModel
});
eventsPresenter.init();
