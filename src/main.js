import { render } from './render';
import FilterView from './view/filters';

const filtersElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), filtersElement);
