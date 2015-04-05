import Ember from 'ember';

var quest = Ember.ObjectController.extend({
	actions:
	{
		answerQuestion: function(type)
		{
			var model = this.get('model');
			// var id = model.get('id')
			console.log(type, model.id);
		}
	}
})

export default quest;