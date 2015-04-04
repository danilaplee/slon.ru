import Ember from 'ember';


var home = Ember.Route.extend({
    model: function() 
    {
      return [];
    },
  	renderTemplate: function() 
  	{
        this.render('question', {  
          into: 'application', 
          outlet: 'main',
          controller: 'question'
        })
    },
    activate: function() 
    {
        this._super.apply(this, arguments);
    },
    setupController: function(home, model) 
    {
        home.set('model', model)
	    Ember.run.schedule('afterRender', this, function () 
	    {
	    	$('#floatCanvas').css({'visibility':'visible'})
		});
	},
	deactivate: function()
	{
	    $('#floatCanvas').css({'visibility':'hidden'})
	}
})

export default home;