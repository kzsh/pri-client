import Ember from 'ember';

const { ajax } = Ember.$;
const { Promise } = Ember.RSVP;

 const stations = [
  {id: 0, label:"90s Pop Radio"},
  {id: 1, label: "Africando All Stars Radio"},
  {id: 2, label: "Arcade Fire Radio"},
  {id: 3, label: "Arvo Pärt Radio"},
  {id: 4, label: "Avishai Cohen (Bassist) Radio"},
  {id: 5, label: "Benedictine Monks Of Santo Domingo De Silos Radio"},
  {id: 6, label: "Berlin Philharmonic Orchestra Radio"},
  {id: 7, label: "Buena Vista Social Club Radio"},
  {id: 8, label: "Cafe Cubano Radio"},
  {id: 9, label: "Christmas Radio"},
  {id: 10, label: "Classical Guitar Radio"},
  {id: 11, label: "Don't Forget Me Radio"},
  {id: 12, label: "Early Jazz Radio"},
  {id: 13, label: "Electro Radio"},
  {id: 14, label: "Erik Satie Radio"},
  {id: 15, label: "Fryderyk Chopin Radio"},
  {id: 16, label: "Gilberto Gil Radio"},
  {id: 17, label: "Groove beats Radio"},
  {id: 18, label: "Jazz Essentials Radio"},
  {id: 19, label: "Magalenha Radio"},
  {id: 20, label: "Manu Chao Radio"},
  {id: 21, label: "Miserere, Motet For Double Chorus In E Minor: Miserere Radio"},
  {id: 22, label: "Modern Classical"},
  {id: 23, label: "Motown Radio"},
  {id: 24, label: "Mugen Swords (Ode To Samurai Champloo) Radio"},
  {id: 25, label: "Méditation, For Violin & Orchestra (Or Other Arrangement) (From"},
  {id: 26, label: "Paul Oakenfold Radio"},
  {id: 27, label: "Progressive House Radio"},
  {id: 28, label: "RJD2 Radio"},
  {id: 29, label: "Sergey Prokofiev Radio"},
  {id: 30, label: "She & Him (Holiday) Radio"},
  {id: 31, label: "Sunset Radio"},
  {id: 32, label: "Symphonic, Classical Period Radio"}
];
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
    var baseEndpoint = 'http://localhost:3000';

    return Ember.$.ajax({
      url: baseEndpoint + endpoint,
      type: method.toUpperCase()
    }).then(function (result) {
      return result;
    });
 }
});
