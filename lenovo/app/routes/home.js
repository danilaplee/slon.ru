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
	      	var tail = $('#tailCanvas');
	      	tail.css({
	      		'display':'block'
	      	})
	      	Snap.load('images/new_3.svg', function(data)
	      	{
	      		elastic.append(data)
	      	})
	      	var pre = Snap.select('#preloading');
	      	var n = 0;
	      	var storeZone = function(data)
	      	{
	      		n++;
	      		z[n] = pre.append(data).selectAll('path')
	      		pre.clear()
	      	}
	      	var z = [];
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

		});
	}
})

export default home;