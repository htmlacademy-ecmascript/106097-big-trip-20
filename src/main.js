import { RenderPosition, render } from './render';
import FilterView from './view/filters';
import EventsPresenter from './presenter/events-presenter';
import EventModel from './model/event-model';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), filtersElement, RenderPosition.AFTERBEGIN);

const eventModel = new EventModel();
const eventsPresenter = new EventsPresenter({
  boardContainer: tripEventsElement,
  eventsModel: eventModel,
});
eventsPresenter.init();
