import { getRandomEvent } from '../mock/event';

const EVENTS_COUNT = 9;

export default class EventModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomEvent);

  getEvents() {
    return this.events;
  }
}
