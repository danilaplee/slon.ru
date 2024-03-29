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
	    	$('.social-likes').socialLikes({
			    url: 'https://slon.ru/specials/flex-test',
			    title: 'Тест: Насколько вы гибкий на работе? || slon.ru',
			    counters: true,
			    singleTitle: ''
			});
			var canvas = $('.canvas');
	      	var tail = $('div.canvas.two');
			canvas.css({
				'display':'none'
			})
	      	if($(window).width() < 600)
	      	{
	      		tail.css({
	      			'display':'none'
	      		})
	      		$('#floatCanvas').css({
	      			'z-index':'-1',
	      			'display':'none'
	      		})
		      	$('body').css({'overflow':'scroll'})
	      	}
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
		});
	},
	deactivate: function()
	{
	    $('#floatCanvas').css({'visibility':'hidden'})
      	$('body').css({'overflow':'hidden'})
	}
})

export default home;