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
	      	// var elastic = document.getElementById('elastic');
	      	var	elastic = Snap.select('#MyPath');
	      	var pre = Snap.select('#preloading');
	      	var n = 0;
	      	var storeZone = function(data)
	      	{
	      		n++;
	      		z[n] = pre.append(data).select('path')
	      		pre.clear()
	      	}
	      	var z = [];
	      	z[1] = Snap.load('images/zone1.svg', storeZone)
	      	z[2] = Snap.load('images/zone2.svg', storeZone)
	      	z[3] = Snap.load('images/zone3.svg', storeZone)
	      	z[4] = Snap.load('images/zone4.svg', storeZone)
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
	      		var zone = z[pos].attr('d')
	      		elastic.animate({'d':zone}, 2500, mina.backin())
		    }

		});
	}
})

export default home;