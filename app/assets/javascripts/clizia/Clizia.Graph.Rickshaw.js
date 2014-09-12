Clizia.Graph.Rickshaw = function (args) { 
	if (typeof Rickshaw !== "object") throw "Clizia.Graph.Rickshaw requires Rickshaw.Graph"

	var that = Clizia.Graph(args)

	var defaults = { width: 700, height: 200, padding: 1 }

	var palette = new Rickshaw.Color.Palette({scheme: "munin"})

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

		//TODO nicer defaults, like above, but optional?
		that.color = args.color || palette.color();
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
 		newfeed = that.feed({start: now - span, stop: now})
		$.getJSON(newfeed, function(data) { 
			if (that.invalidData(data)) { throw "Invalid Data, cannot render update" }
			that.graph.series[0].data = data
			that.graph.render();
		})	
	}

	that.init(args) 
	return that;	
} 

