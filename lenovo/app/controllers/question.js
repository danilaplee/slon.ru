import Ember from 'ember';

var quest = Ember.Controller.extend({
	actions:
	{
		answerQuestion: function(type)
		{
			var model = this.get('model');
			var nu = model.get('id')
			var res = 
			{
				'type':type,
				'id':nu
			}

			var end = this.container.lookup('controller:result');
			var all = end.get('results');
			var firstTimer = true;
			if(all)
			{
				for (var i = all.length - 1; i >= 0; i--) 
				{
					if(all[i].id === nu)
					{
						all[i].type = type;
						firstTimer = false;
					}

				};

				if(firstTimer)
				{
					all.push(res);
				}
			}
			else
			{
				var all = [res]
			}

			end.set('results', all)

			if(nu < 10)
			{
				nu++;
				this.transitionToRoute('question', nu);
			}
			else
			{
				this.transitionToRoute('result')
			}
		}
	}
})

export default quest;