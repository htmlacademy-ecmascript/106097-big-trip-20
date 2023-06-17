import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoEventsText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

function createNoEventsTemplate (filterType) {
  const noEventsTextValue = NoEventsText[filterType];
  return `<p class="trip-events__msg">${noEventsTextValue}</p`;
}

export default class NoEventsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template () {
    return createNoEventsTemplate(this.#filterType);
  }
}
