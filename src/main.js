import { render } from './render';
import FilterView from './view/filters';
import SortView from './view/sort';

const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new FilterView(), filtersElement);
render(new SortView(), tripEventsElement);
