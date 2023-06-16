import { RenderPosition, render } from './framework/render';
import FilterView from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';
import FilterModel from './model/filter-model';

const eventModel = new EventModel();
const filterModel = new FilterModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
    count: 0,
  }
];
render(new FilterView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => {}
}), filtersElement, RenderPosition.AFTERBEGIN);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
  destinationsModel: destinationModel,
  offersModel: offerModel
});
boardPresenter.init();
