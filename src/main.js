import BoardPresenter from './presenter/board-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const eventModel = new EventModel();
const filterModel = new FilterModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});
const tripEventsElement = document.querySelector('.trip-events');

const filterContainerElement = document.querySelector('.trip-main__trip-controls');
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel: filterModel,
  eventsModel: eventModel
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
  destinationsModel: destinationModel,
  offersModel: offerModel,
  filterModel: filterModel
});

filterPresenter.init();
boardPresenter.init();
