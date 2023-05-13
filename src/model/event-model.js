import { getRandomEvent } from '../mock/event';

const EVENTS_COUNT = 5;

export default class EventModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
