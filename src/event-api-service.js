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
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = ApiService.parseResponse(response);

    return parsedResponse;
  }
}
