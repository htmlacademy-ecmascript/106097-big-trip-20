import { RenderPosition, render } from './render';
import FilterView from './view/filters';
import EventsPresenter from './presenter/events-presenter';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), filtersElement, RenderPosition.AFTERBEGIN);

const eventsPresenter = new EventsPresenter({boardContainer: tripEventsElement});
eventsPresenter.init();
