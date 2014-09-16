Clizia.Graph.Rickshaw = function (args) { 
	if (typeof Rickshaw !== "object") throw "Clizia.Graph.Rickshaw requires Rickshaw.Graph"

	var that = Clizia.Graph(args)

	var defaults = { width: 700, height: 200, padding: 1 }

	that.init = function(args) { 
		//TODO arg handler? args key then error if 404 then assignment?
		if (!args.start) throw "Clizia.Graph.Rickshaw needs a start time"
		that.start = args.start

		if (!args.stop)  throw "Clizia.Graph.Rickshaw needs a stop time"
		that.stop = args.stop

		if (!args.step)  throw "Clizia.Graph.Rickshaw needs a step interval"
		that.step = args.step

		if (!args.yaxis) throw "I should have a yaxis"
		that.yaxis = args.yaxis	

		if (args.slider) { that.slider = args.slider } 
		else { that.noSlider = true }


		if (args.showurl) { that.showurl = args.showurl}
		if (args.removeurl) { that.removeurl = args.removeurl}

		if (is_array(that.metric)) { 

			that.color = args.color || []
			for (n = 0; n < that.metric.length; n++ ) {
				m = that.metric[n]

				if (!m.feed) {
					throw "Metric '"+m.id+"' has no feed!"
				}

				// Expect metric and color to either be Object, String; or [Object], [String]
				m.color = that.color[n] || next_color(); 
			}

		} else {
			if (!that.metric.feed) { throw "Metric "+that.metric.id+" has no feed!" }

			that.metric.color = args.color || next_color();
		} 
		

		//TODO nicer defaults, like above, but optional?
		that.width = args.width || defaults.width;
		that.height = args.height || defaults.height;
		that.padding = args.padding || defaults.padding;
	} 

	that.feed = function(args) { 
		args = args || {}
		index = args.index || 0
		if (is_array(that.metric)) {
			feed = args.feed || that.metric[index].feed
		} else { 
			feed = args.feed || that.metric.feed
		} 
		start = args.start || that.start
		stop = args.stop || that.stop
		step = args.step || that.step
		
		return feed + "&start=" + start + "&stop=" + stop + "&step=" + step;
	}

	that.invalidData = function(data) { 
		if (data.error) { return true } 
		if (data.length === 0) { return true } 
		return false
	} 

	that.extents = function(data) { 
			min = Number.MAX_VALUE; 
			min = $.map(data, function(d){return d.y}).min() 

			max = Number.MIN_VALUE;
			max = $.map(data, function(d){return d.y}).max()
			
			if (min == Number.MAX_VALUE) { 
				min=0; 
				max=0;
			}
		return [min, max]
	} 

	that.update = function() {  
		now = parseInt(Date.now() / 1000, 10)
		span = (that.stop - that.start)

		if (is_array(that.metric)) { 
			$.each(that.metric, function(n, m) { 
				newfeed = that.feed({index: n, start: now - span, stop: now})
				$.getJSON(newfeed, function(data) { 
					if (that.invalidData(data)) { throw "Invalid Data, cannot render update" }
					that.graph.series[n].data = data
					that.graph.render();
				})	
			})
		} else {
			newfeed = that.feed({start: now - span, stop: now})
			$.getJSON(newfeed, function(data) {
				 if (that.invalidData(data)) { throw "Invalid Data, cannot render update" }
				 that.graph.series[0].data = data
				 that.graph.render();
			 })
		}
	}

	that.format = function(d) {
		return Rickshaw.Fixtures.Number.formatKMBT_round(parseFloat(d),0,0,4);
	}

	that.timeFixture = function() {
		if (gon.clock == "utc") { 
			return new Rickshaw.Fixtures.Time.Precise()
		} else { 
			return new Rickshaw.Fixtures.Time.Precise.Local() 
		}
	}
	that.d3_time = function(x) {
		f_string = "%Y-%m-%d %H:%M:%S %Z"
		date = new Date(x*1000)
		if (gon.clock == "utc") {
			d = d3.time.format.utc(f_string)
		} else {
			d = d3.time.format(f_string)
		}
		return d(date)
	}

	that.fitToWindow = function() { 
		if (window.innerWidth < 768) { r = 180; } else { r = 460; }
		new_width = window.innerWidth - r;
		that.graph.configure({ width: new_width});
		that.graph.render();
		if (that.ryaxis) { 
			$(that.yaxis).attr("style","left: "+(new_width+60)+"px");
		}
		if (that.legend) { 
			$(that.legend).attr("style","width: "+(new_width)+"px");
		}
	} 

	that.dynamicWidth = function() { 
		that.fitToWindow()
		$(window).on('resize', function(){ that.fitToWindow(); })
	} 


	that.init(args) 
	return that;	
} 
