import { RenderPosition, render } from './framework/render';
import FilterView from './view/filters-view';
import EventsPresenter from './presenter/events-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';
import { generateFilter } from './mock/filter';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const eventModel = new EventModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});

const filters = generateFilter(eventModel.events);
render(new FilterView({filters}), filtersElement, RenderPosition.AFTERBEGIN);

const eventsPresenter = new EventsPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
  destinationsModel: destinationModel,
  offersModel: offerModel
});
eventsPresenter.init();
