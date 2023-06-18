import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class EventApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'base_price': event['cost'],
      'date_from': event['start'],
      'date_to': event['end'],
      'destination': event['destinationId'],
      'is_favorite': event['isFavorite'],
    };

    delete adaptedEvent.cost;
    delete adaptedEvent.start;
    delete adaptedEvent.end;
    delete adaptedEvent.destinationId;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
