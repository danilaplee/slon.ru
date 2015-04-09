import Ember from 'ember';


var home = Ember.Route.extend({
    model: function() 
    {
      return [];
    },
  	renderTemplate: function() 
  	{
        this.render('result', {  
          into: 'application', 
          outlet: 'main',
          controller: 'result'
        })
    },
    activate: function() 
    {
        this._super.apply(this, arguments);
    },
    setupController: function(result, model) 
    {
        result.set('model', model)
	    Ember.run.schedule('afterRender', this, function () 
	    {
	      	var tail = $('div.canvas.two');
	      	var shot = document.getElementById('packshot')
	      	tail
	      	.css({
	      		'display':'none'
	      	})
	      	shot.addEventListener('ended', function() 
	      	{ 
			   this.currentTime = 7;
			   this.pause();
			}, false);
	      	$('body').css({'overflow':'scroll'})
		});
	},
	deactivate: function()
	{
	    $('#floatCanvas').css({'visibility':'hidden'})
      	$('body').css({'overflow':'hidden'})
	}
})

export default home;