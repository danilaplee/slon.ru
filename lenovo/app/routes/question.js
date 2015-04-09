import Ember from 'ember';


var home = Ember.Route.extend({
    model: function(params) 
    {
      return this.store.find('question', params.id);
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
	      	var tail = $('div.canvas.two');
	      	tail
	      	.css({
	      		'display':'none'
	      	})
	    	var answerBoxes = $('.answerBox');
	    	var width = $(window).width()
	    	answerBoxes.find('p').lettering('words')
	    	if(width > 1100)
		    {
		    	for (var i = answerBoxes.length - 1; i >= 0; i--) 
		    	{
		    		var box = $(answerBoxes[i])
		    		var words = $(box).find('span');
		    		for (var b = words.length - 1; b >= 0; b--) 
		    		{
		    			var word = $(words[b])
		    			var r = Math.round(Math.random()*10) * 5;
		    			$(word[0]).css({
		    				'display':'inline-block',
		    				'transform':'rotate('+r+'deg)'
		    			})
		    		};
		    		box.mouseover(function()
		    		{
			    		var words = $(this).find('span');
			    		if(words.length > 1)
			    		{
				    		for (var b = words.length - 1; b >= 0; b--) 
				    		{
				    			var word = $(words[b])
				    			$(word[0]).css({
				    				'display':'inline',
				    				'transform':'rotate(0deg)'
				    			})
				    		};
			    		}
			    		else
			    		{
			    			$(this).find('img').css({
			    				'position':'absolute',
			    				'width':'160%',
			    				'height':'auto',
			    				'left':'-100px',
			    				'top':'-100px',
			    				'z-index':'1000'
			    			})
			    		}

		    		})
		    		box.mouseout(function()
		    		{

			    		var words = $(this).find('span');
			    		if(words.length > 1)
			    		{
				    		for (var b = words.length - 1; b >= 0; b--) 
				    		{
				    			var word = $(words[b])
				    			var r = Math.round(Math.random()*10) * 5;
				    			$(word[0]).css({
				    				'display':'inline-block',
				    				'transform':'rotate('+r+'deg)'
				    			})
				    		};
			    		}
			    		else
			    		{
			    			// console.log('images');
			    			$(this).find('img').css({
			    				'position':'relative',
			    				'width':'',
			    				'height':'',
			    				'left':'',
			    				'top':'',
			    				'z-index':'1'
			    			})
			    		}

		    		})
		    	};
		    }
		});
	},
	deactivate: function()
	{
	    $('#floatCanvas').css({'visibility':'hidden'})
	}
})

export default home;