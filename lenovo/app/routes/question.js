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
	    	$('#floatCanvas').css({'visibility':'visible'})
	    	var answerBoxes = $('.answerBox > p');
	    	answerBoxes.lettering('words')
	    	for (var i = answerBoxes.length - 1; i >= 0; i--) 
	    	{
	    		var box = $(answerBoxes[i])
	    		console.log(box);
	    		var words = box.find('span');
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
		    		for (var b = words.length - 1; b >= 0; b--) 
		    		{
		    			var word = $(words[b])
		    			var r = Math.round(Math.random()*10) * 5;
		    			$(word[0]).css({
		    				'display':'inline',
		    				'transform':'rotate(0deg)'
		    			})
		    		};

	    		})
	    		box.mouseout(function()
	    		{

		    		var words = $(this).find('span');
		    		for (var b = words.length - 1; b >= 0; b--) 
		    		{
		    			var word = $(words[b])
		    			var r = Math.round(Math.random()*10) * 5;
		    			$(word[0]).css({
		    				'display':'inline-block',
		    				'transform':'rotate('+r+'deg)'
		    			})
		    		};

	    		})
	    	};
		});
	},
	deactivate: function()
	{
	    $('#floatCanvas').css({'visibility':'hidden'})
	}
})

export default home;