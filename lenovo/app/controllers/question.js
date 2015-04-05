import Ember from 'ember';

var quest = Ember.Controller.extend({
	actions:
	{
		answerQuestion: function(type)
		{
			var model = this.get('model');
			// console.log(type, model.id);
			var nu = model.get('id')
			console.log(nu++);
			 this.transitionToRoute('question', nu++);
			// this.set('model', newModel);
		}
	}
})

export default quest;