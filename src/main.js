import { RenderPosition, render } from './render';
import FilterView from './view/filters';
import SortView from './view/sort';
import TripEventView from './view/trip-event';
import FormEditView from './view/form-edit';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FormEditView(), tripEventsElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersElement, RenderPosition.AFTERBEGIN);
render(new SortView(), tripEventsElement, RenderPosition.AFTERBEGIN);

for (let i = 0; i < 3; i++) {
  render(new TripEventView(), tripEventsElement);
}

