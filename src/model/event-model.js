import { getRandomEvent } from '../mock/event';

const EVENTS_COUNT = 9;

export default class EventModel {
  #eventsElements = Array.from({length: EVENTS_COUNT}, getRandomEvent);

  get events() {
    return this.#eventsElements;
  }
}
