import BoardPresenter from './presenter/board-presenter';
import EventModel from './model/event-model';
import DestinationModel from './model/destination-model';
import { destinations } from './mock/destination';
import OfferModel from './model/offer-model';
import { offers } from './mock/offer';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewEventButtonView from './view/new-event-btn-view';
import { render } from './framework/render';
import EventApiService from './event-api-service';

const AUTHORIZATION = 'Basic yW2wrW44xdo1wq2J0';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const eventModel = new EventModel({
  eventsApiService: new EventApiService(END_POINT, AUTHORIZATION),
});
const filterModel = new FilterModel();
const offerModel = new OfferModel({offers: offers});
const destinationModel = new DestinationModel({destinations: destinations});
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

render(newEventButtonComponent, tripMainElement);

filterPresenter.init();
boardPresenter.init();
