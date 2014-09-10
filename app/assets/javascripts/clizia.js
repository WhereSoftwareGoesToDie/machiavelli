/* Clizia  - A Comedy written by Machiavelli */

var Clizia = {}

Clizia.Graph = function(args) { 
	var that = {};

	that.init = function(args) { 
		if (!args.element) throw "Clizia.Graph needs a element";
		that.element = args.element;

		if (!args.metric) throw "Clizia.Graph needs a metric"
		that.metric = args.metric;
	}

	that.init(args);
	return that;
} 


Clizia.Graph.Rickshaw = function (args) { 
	if (typeof Rickshaw !== "object") throw "Clizia.Graph.Rickshaw requires Rickshaw.Graph"

	var that = Clizia.Graph(args)

	var defaults = { width: 700, height: 200 }

	var palette = new Rickshaw.Color.Palette({scheme: "munin"})

	that.init = function(args) { 
		console.log("rickshaw init")

		if (!args.start) throw "Clizia.Graph.Rickshaw needs a start time"
		that.start = args.start

		if (!args.stop) throw "Clizia.Graph.Rickshaw needs a stop time"
		that.stop = args.stop

		if (!args.step) throw "Clizia.Graph.Rickshaw needs a step interval"
		that.step = args.step

		if (!that.metric.feed) throw "Metric has no feed!"
	

		//TODO nicer defaults
		that.color = args.color || palette.color();
		that.width = args.width || defaults.width;
		that.height = args.height || defaults.height;

	} 

	that.feed = function() { 
		feed = that.metric.feed + "&start=" + that.start + "&stop=" + that.stop + "&step=" + that.step;
		console.log(feed);
		return feed
	}
	that.invalidData = function(data) { 

		if (data.error) { 
			renderError(that.element, data.error, null, that.metric.removeURL);
			return true
		} 
		if (data.length === 0) { 
			renderError(that.element, errorMessage.noData, null, that.metric.removeURL)
			return true
		} 
		return false
	} 


	that.init(args) 
	return that;	
} 

Clizia.Graph.Rickshaw.Standard = function(args) { 
	var that = Clizia.Graph.Rickshaw(args);
	that.render = function(args) { 
		console.log("Standard specific render")
		$.getJSON(that.feed(), function(data) { 
			if (that.invalidData(data))  throw "No data returned, cannot render"

			yaxis = "clizia_y"

			graph = new Rickshaw.Graph({
				element: document.getElementById(that.element),
				width: that.width, 
				height: that.height,
				renderer: 'line', 
				series: [{ data: data, color: that.color }]
			});

			min = Number.MAX_VALUE; max = Number.MIN_VALUE;
			for (i = 0; i < data.length; i++) {
				if (typeof data[i].y === "number") { 
					min = Math.min(min, data[i].y);
					max = Math.max(max, data[i].y);
				}
			}
			if (min == Number.MAX_VALUE) { min=0; max=0; }

			graph.configure({min: min - 0.5, max: max + 0.5});

			if (that.metric.counter)  { 
				graph.configure({interpolation: 'step'});
			}

			new Rickshaw.Graph.Axis.Y( {
				graph: graph,
				orientation: 'left',
				interpolate: 'monotone',
				pixelsPerTick: 30,
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				element: document.getElementById(yaxis)
			} );

			new Rickshaw.Graph.Axis.Time({
				graph: graph,
				timeFixture: getTimeFixture()
			});

			dynamicWidth(graph);
			graph.render();
			
			new Rickshaw.Graph.HoverDetail({
				graph: graph,
				formatter: function (series, x, y) {
					content = "<span class='date'>"+ getD3Time(x) +"</span><br/>"+formatData(y);
					return content;
				}
			});

			graph.render();	

			graph.render()
			that.graph = graph;
		})
	} 
	return that;
}

Clizia.Graph.Rickshaw.Stacked = function(args) { 
	var that = Clizia.Graph.Rickshaw(args);
	that.render = function(args) { 
		console.log("Stacked specific renderer")
	}	
//	that.init(args);
	return that;
} 

