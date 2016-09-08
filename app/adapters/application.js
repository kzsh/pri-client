import DS from 'ember-data';
import Ember from 'ember';

const inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

const { underscore } = Ember.String;

export default DS.RESTAdapter.extend({
  //namespace: 'api/v1',
  pathForType: function(type) {
    return inflector.pluralize(underscore(type));
  }
});
