import { getRandomEvent } from '../mock/event';
import Observable from '../framework/observable';

const EVENTS_COUNT = 9;

export default class EventModel extends Observable {
  #eventsElements = Array.from({length: EVENTS_COUNT}, getRandomEvent);

  get events() {
    return this.#eventsElements;
  }
}
