import Ember from 'ember';

const { ajax } = Ember.$;
const { Promise } = Ember.RSVP;

export default Ember.Route.extend({
  model() {
    return this.store.findAll('station');
  },

  setupController(controller, model) {
    controller.stations = model;
  },

 actions: {
  play() { this._sendRequest('POST', '/play'); },

  start() { this._sendRequest('POST', '/player/on'); },

  stop() { this._sendRequest('POST', '/player/off'); },

  likeSong() { this._sendRequest('POST', '/song/like'); },

  tiredOfSong() { this._sendRequest('POST', '/song/tired'); },

  nextSong() { this._sendRequest('POST', '/song/next'); },

  banSong() { this._sendRequest('POST', '/song/ban'); },

  station(station) { this._sendRequest('POST', '/stations/' + station); },

  volume(volChange) {
    var endpoint = '/down';
    if(volChange > 0) {
      endpoint = '/up';
    } else if (parseInt(volChange, 10) === 0) {
      endpoint = '/reset';
    }
    this._sendRequest('POST', '/volume' + endpoint);
  },
 },

 _sendRequest: function (method, endpoint) {
    var baseEndpoint = 'http://192.168.0.101:3000';

    return new Promise(function(resolve, reject) {
      ajax({
        url: baseEndpoint + endpoint,
        type: method.toUpperCase()
      }).then(function(data) {
        return resolve(data);
      }, function(error) {
        return reject(error);
      });
    });
 }
});
