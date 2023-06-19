import BoardPresenter from './presenter/board-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-btn-view';
import { render } from './framework/render';
import EventApiService from './events-api-service';

const AUTHORIZATION = 'Basic yW2wrW44xdo1wq2J0';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const eventModel = new EventModel({
  eventsApiService: new EventApiService(END_POINT, AUTHORIZATION),
});
const offerModel = new OfferModel({
  eventsApiService: new EventApiService(END_POINT, AUTHORIZATION),
});
const destinationModel = new DestinationModel({
  eventsApiService: new EventApiService(END_POINT, AUTHORIZATION),
});

const filterModel = new FilterModel();
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

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
  filterModel: filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick,
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

filterPresenter.init();
boardPresenter.init();
destinationModel.init();
offerModel.init();
eventModel.init()
  .finally(() => render(newEventButtonComponent, tripMainElement));
