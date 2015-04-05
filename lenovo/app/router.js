import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() 
{
	this.route('home', {path:'/'})
	this.route('question', {path:'/question/:id'})
	this.route('result', {path:'/result'})
});
