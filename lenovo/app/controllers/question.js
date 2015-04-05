import Ember from 'ember';

var quest = Ember.ObjectController.extend({
	actions:
	{
		answerQuestion: function(type)
		{
			var model = this.get('model');
			console.log(type, model.id);
		}
	}
})

export default quest;