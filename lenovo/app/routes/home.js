import Ember from 'ember';


var home = Ember.Route.extend({
    model: function() 
    {
      return [];
    },
  	renderTemplate: function() 
  	{
        this.render('home', {  
          into: 'application', 
          outlet: 'main',
          controller: 'home'
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
	      	var	elastic = Snap.select('#elastic');
	      	var start = Snap.select('#start');
	      	var start_off
	      	var start_on
	      	var pre = Snap.select('#preloading');
	      	var n = 0;
	      	var z = [];
	      	var tail = $('div.canvas.two');
	      	tail.css({
	      		'display':'block'
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
	      	}
	      	//PRELOADING
	      	Snap.load('images/new_3.svg', function(data)
	      	{
	      		elastic.append(data)
	      	})
	      	Snap.load('images/button_on.svg', function(data)
	      	{
	      		start.append(data);
	      		start_on = pre.append(data).selectAll('path');
	      	})
	      	Snap.load('images/button_off.svg', function(data)
	      	{
	      		start_off = pre.append(data).selectAll('path');
	      		var width = $(window).width()
	      		if(width < 1000)
	      		{
	      			start.append(data)
	      		}
	      	})
	      	Snap.load('images/elastic/up-left.svg', function(data)
	      	{
	      		z[1] = pre.append(data).selectAll('path')
	      		pre.clear();
	      	})
	      	Snap.load('images/elastic/up-right.svg', function(data)
	      	{
	      		z[2] = pre.append(data).selectAll('path')
	      		pre.clear();
	      	})
	      	Snap.load('images/elastic/down-left.svg', function(data)
	      	{
	      		z[3] = pre.append(data).selectAll('path')
	      		pre.clear();
	      	})
	      	Snap.load('images/elastic/down-right.svg', function(data)
	      	{
	      		z[4] = pre.append(data).selectAll('path')
	      		pre.clear();
	      	})
	      	$(window).mousemove(function( event ) 
	      	{
				var y = event.pageY
				var x = event.pageX
				var halfwidth = $(window).width()*0.5;
				var halfheight = $(window).height()*0.5;
				var pos
				if(x > halfwidth)
				{
					if(y > halfheight)
					{
						pos = 4
					}
					else
					{
						pos = 2
					}

				}
				else
				{
					if(y > halfheight)
					{
						pos = 3 
					}
					else
					{
						pos = 1
					}
				}
				make(pos)

			});

	      	var make = function(pos)
	      	{
	      		var zone = z[pos]
	      		var target = elastic.selectAll('path')
	      		if(pos >= 3)
	      		{
	      			$('#elastic').css({
	      				'bottom':'80px'
	      			})
	      		}
	      		else
	      		{
	      			$('#elastic').css({
	      				'bottom':'0'
	      			})

	      		}
	      		for (var i = zone.length - 1; i >= 0; i--) 
	      		{
	      			var y = zone[i]
		      		target[i].animate({'d':y}, 700, mina.easein())
	      		};
		    }
		    start.mouseover(function()
		    {
		    	var zone = start_off;
		    	var target = this.selectAll('path');
	      		for (var i = zone.length - 1; i >= 0; i--) 
	      		{
	      			var y = zone[i]
		      		target[i].animate({'d':y}, 700, mina.easein())
	      		};

		    })
		    start.mouseout(function()
		    {
		    	var zone = start_on;
		    	var target = this.selectAll('path');
	      		for (var i = zone.length - 1; i >= 0; i--) 
	      		{
	      			var y = zone[i]
	      			console.log(y);
		      		target[i].animate({'d':y}, 700, mina.easein())
	      		};
		    	
		    })

		});
	}
})

export default home;