import Ember from 'ember';

var result = Ember.ArrayController.extend({
	results:null,
	count: function()
	{
		var res = this.get('results');
		var count = [];
			count[0] = {'type':'A', 'value':0}
			count[1] = {'type':'B', 'value':0}
			count[2] = {'type':'C', 'value':0}
			count[3] = {'type':'D', 'value':0}
		var predicatBy = function(prop)
		{
		   return function(a,b)
		   {
		      if( a[prop] > b[prop])
		      {
		          return 1;
		      }
		      else if( a[prop] < b[prop] )
		      {
		          return -1;
		      }
		      return 0;
		   }
		}

		for (var i = res.length - 1; i >= 0; i--) 
		{
			var r = res[i]
			if(r.type == 'A')
			{
				count[0].value++;
			}
			if(r.type == 'B')
			{
				count[1].value++;
			}
			if(r.type == 'C')
			{
				count[2].value++;
			}
			if(r.type == 'D')
			{
				count[3].value++;
			}
		};

		var d = count.sort(predicatBy('value'))
		var t = d[3].type;
		var f = this.store;

		if(t == 'A')
		{
			return f.find('result', 1)
		}
		if(t == 'B')
		{
			return f.find('result', 2)
		}
		if(t == 'C')
		{
			return f.find('result', 3)
		}
		if(t == 'D')
		{
			return f.find('result', 4)
		}

	}.property('model')
})

export default result;