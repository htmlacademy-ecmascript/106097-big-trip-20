import { RenderPosition, render } from './framework/render';
import FilterView from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';
import { generateFilter } from './mock/filter';

const eventModel = new EventModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filters = generateFilter(eventModel.events);
render(new FilterView({filters}), filtersElement, RenderPosition.AFTERBEGIN);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
  destinationsModel: destinationModel,
  offersModel: offerModel
});
boardPresenter.init();
