/* Clizia  - A Comedy written by Machiavelli */

var Clizia = {}

Clizia.Graph = function(args) { 
	var that = {};

	that.init = function(args) { 
		if (!args.chart) throw "Clizia.Graph needs a chart";
		that.chart = args.chart;

		if (!args.metric) throw "Clizia.Graph needs a metric"
		that.metric = args.metric;
	}
	
	that.render = function(args) { throw "Cannot invoke parent Clizia.Graph.render() directly." }
	that.update = function(args) { throw "Cannot invoke parent Clizia.Graph.update() directly." }

	that.init(args);
	return that;
} 


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

		
		if (!is_array(that.metric)) { that.metric = [that.metric] }
	
		
	//	if (!that.metric.feed) throw "Metric has no feed!"

		if (!args.yaxis) throw "I should have a yaxis"
		that.yaxis = args.yaxis	

		//TODO nicer defaults, like above, but optional?
		that.color = args.color || palette.color();
		that.width = args.width || defaults.width;
		that.height = args.height || defaults.height;
		that.padding = args.padding || defaults.padding;
		
	} 

	that.feed = function(args) { 
		args = args || {}
		index = args.index || 0
		feed = args.feed || that.metric[index].feed
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

Array.prototype.max = function() { return Math.max.apply(null, this) }
Array.prototype.min = function() { return Math.min.apply(null, this) }

var is_array = function (value) {
	return value &&
	typeof value === 'object' &&
	typeof value.length === 'number' &&
	typeof value.splice === 'function' &&
	!(value.propertyIsEnumerable('length'));
};


Clizia.Graph.Rickshaw.Standard = function(args) { 
	var that = Clizia.Graph.Rickshaw(args);

	that.render = function(args) { 
		$.getJSON(that.feed(), function(data) { 
			if (that.invalidData(data)) { 
				err = data.error ||  errorMessage.noData	
				renderError(that.chart, err, null, that.metric.removeURL)
				throw "Error retrieving data: "+err
			}

			graph = new Rickshaw.Graph({
				element: document.getElementById(that.chart),
				width: that.width, 
				height: that.height,
				renderer: 'line', 
				series: [{ data: data, color: that.color }]
			});
			
			extent = that.extents(data);

			graph.configure({min: extent[0] - that.padding, max: extent[1] + that.padding});

			if (that.metric.counter)  { 
				graph.configure({interpolation: 'step'});
			}

			new Rickshaw.Graph.Axis.Y( {
				graph: graph,
				orientation: 'left',
				interpolate: 'monotone',
				pixelsPerTick: 30,
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				element: document.getElementById(that.yaxis)
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
	that.init = function(args) { 
		if (!args.y2axis) { 
			that.disabley2 = true; // TODO extend standard and stacked into one entity?
		} else { that.y2axis = args.y2axis }
		if (!args.legend) { 
			that.disablelegend = true
		} else { that.legend = args.legend }

		that.scalarPad = args.scalarPad || args.padding || 1;
		if (args.renderer != "line" ) { that.scalarPad = 0 } 

		that.ratioPad  = args.ratioPad || 0.1;

		that.right = args.right || [] 
		
		if (that.right.length === that.metric.length) { that.hasLeft = false }
		else { that.hasLeft = true; }
		
		if (that.right.length === 0) { that.hasRight = false } 
		else { that.hasRight = true; }
		
	} 

	isRight = function (m) { right_id.indexOf(that.metric[m].id) >=  0 } 
	isLeft = function (m) { right_id.indexOf(that.metric[m].id) >=  0 } 
	
	dataStore = []
	
	that.render = function(args) {
		$.each(that.metric, function(i,d) { 
			$.getJSON(that.feed({index: i}), function(data) { 
				if (that.invalidData(data)) { 
					err = data.error || errorMessage.noData
					renderError(that.chart, err)
					throw "Error retrieving data: "+err
				} 
				dataStore[i] = {data: data, name: d }
				flagComplete();
			}) 
		})
			
	}
	completeCount = 0;
	flagComplete = function(args) {
		completeCount += 1;
		if (completeCount === that.metric.length) { 
			completeRender()
		} 
	}
		
	right_range = [Number.MAX_VALUE, Number.MIN_VALUE];
	left_range  = [Number.MAX_VALUE, Number.MIN_VALUE];


	completeRender = function() {
		for (n = 0; n < dataStore.length; n++) { 
			extent = that.extents(dataStore[n].data)
			if (isRight(n)) { 
				right_range = [Math.min(extent[0], right_range[0]), 
					       Math.max(extent[1], right_range[1])]
			} else { 
				left_range  = [Math.min(extent[0], left_range[0]), 
					       Math.max(extent[1], left_range[1])]
			}
		}	
	
		if (hasRight()) { 
			right_range = [right_range[0] - that.scalarPad, right_range[1] + that.scalarPad] 
			right_scale = d3.scale.linear().domain(right_range);
		}

		if (hasLeft())  { 
			left_range  = [left_range[0]  - that.scalarPad, left_range[1]  + that.scalarPad] 
			left_scale = d3.scale.linear().domain(left_range);
		}

		series = [];
		for (n = 0; n < dataStore.length; n++) { 
			scale = isRight(n) ? right_scale : left_scale
			
			series.push({ 
				data: dataStore[n].data,
				name: dataStore[n].name,
				color: that.color, 
				scale: scale
			})
		}
		
		config.interpolate = "monotone";
			
		if (hasRight() && hasLeft() ) {
			d = [Math.min(left_scale.domain()[0], right_scale.domain()[0]),
			Math.max(left_scale.domain()[1], right_scale.domain()[1])]
		} else if (hasRight()) {
			d = right_scale.domain()
		} else {
			d = left_scale.domain()
		}

		
		//Ratio Padding - defaults from rickshaw.js
		padY = 0.02
		padX = 0

		if (d[0] >= -2 && d[1] <= 2) { // -1 -> 1, plus scalar padding
			padY = that.ratioPad
		}

		padArray = {top: padY, right: padX, bottom: padY, left: padX}

		config.padding = padArray

		// ...
		if (flag == "xkcd") {
			config.interpolate = "xkcd";
		}

		graph = new Rickshaw.Graph({
			element: document.getElementById(that.chart),
			width: that.width, 
			height: that.height, 
			series: series
		})

		graph.configure(config);

		if (hasLeft()) { 
			left_axis = new Rickshaw.Graph.Axis.Y.Scaled({
				element: document.getElementById(that.yaxis),
				graph: graph,
				orientation: 'left',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				scale: left_scale
			});
		}

		if (hasRight()) { 
			right_axis = new Rickshaw.Graph.Axis.Y.Scaled({
				element: document.getElementById(that.y2axis),
				graph: graph,
				grid: false,
				orientation: 'right',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				scale: right_scale
			});
		}

		// One X-axis for time
		new Rickshaw.Graph.Axis.Time({
			graph: graph,
			timeFixture: getTimeFixture()
		});

		/////
		dynamicWidth(graph);
		graph.render();

		// Make stacks easier to see by adding an alpha transperancy to both
		// the graph and the legend 
		if (config.stack === false && (config.renderer == "area")) {
			$(document.head).append("<style>path.area{opacity:0.8};.legend-color{opacity:0.8}</style>");
		}

		// X-axis slider for zooming
		slider = new Rickshaw.Graph.RangeSlider.Preview({
			graph: graph,
			height: 30,
			element: $('#slider')[0],
			onChangeDo: generate_legend

		});

		var hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: graph,
			formatter: function(series, x, y, fx, fy, d) {
				var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
				var date = '<span class="date"> '+getD3Time(x)+'</span>';
				var content = swatch + format_metrics[d.order - 1] + ": " + y.toFixed(4) + "<br>"+ date;
				return content;
			},
			xFormatter: function(x){
				return new Date(x * 1000).toString();
			}
		} );
	
		that.generateLegend()	
			
		that.graph = graph;

	}

	that.generateLegend = function() {
		if (!that.disableLegend) { 
		
		var legend = document.getElementById(that.legend);

		function arr_f(a) { 
			r = {avg: 0, min: 0, max: 0, std: 0};
			t = a.length;
			r.max = Math.max.apply(Math, a);
			r.min = Math.min.apply(Math, a);
			for(var m, s = 0, l = t; l--; s += a[l]);
			for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
			return r.deviation = Math.sqrt(r.variance = s / t), r;
		}

		function fix(a) { return Rickshaw.Fixtures.Number.formatKMBT_round(a);}

		function visibleData(a) {
			if (graph.window.xMin === undefined) {
				min = Number.MIN_VALUE;
			} else { min = graph.window.xMin; }
			if (graph.window.xMax === undefined) {
				max = Number.MAX_VALUE;
			} else { max = graph.window.xMax; }

			return $.map(a, function(d) { if (d.x >= min && d.x <= max) { return d.y;}  });
		}

		left = [];
		right = [];

		for (var i = 0; i < graph.series.length; i++) { 
			d = graph.series[i];
			obj = {};
			obj.metric = format_metrics[i];
			obj.colour = d.color;

			obj.ydata = visibleData(d.data);
			obj.sourceURL = gon.metrics[i].sourceURL;
			obj.removeURL = gon.metrics[i].removeURL;
			obj.index = i;
			obj.show_url = "metric_"+i+"_showurl";
			obj.remove_url = "metric_"+i+"_removeurl";

			if (isRight(i)) {
				obj.link = left_links[i];
				obj.tooltip = "Move metric to the left y-axis";
				right.push(obj);
			} else {
				obj.link = right_links[i];
				obj.tooltip = "Move metric to the right y-axis";
				left.push(obj);
			}
		}

		showURLs = [];
		removeURLs = [];

		table = ["<table class='table table-condensed borderless' width='100%'>"];

		function rtd(side) {
			c = [];

			["&nbsp","average","deviation","bounds","&nbsp"].forEach(function(d){
				c.push("<td align='right'>"+d+"</td>");
			});

			if ( left.length > 0 && right.length > 0 ) {  c.splice(1,0, "<td>"+side+" Axis</td>"); }
			else { c.splice(1,0,"<td>&nbsp;</td>")}
			return c.join("");
		}


		// Stacked graphs will order last to first, so flip the legend, for sanity
		if (config.stack) { left = left.reverse(); right = right.reverse()  }

		if (left[0]) { table.push(rtd("Left"))  }
		left.forEach(function(d){ row = tableize(d); table.push(row) })

		if (right[0]) { table.push("<tr><td>&nbsp;</td></tr>"); table.push(rtd("Right"))}
		right.forEach(function(d){ row = tableize(d); table.push(row) })

		function tableize(e) { //arr.forEach(function(d) { 
			var t = [];
			t.push("<tr>");

			function databit(data, tooltip) {
				s = "<td class='table_detail' align='right' data-toggle='tooltip-shuffle' nowrap ";
				s +="data-original-title='"+tooltip+"'>" + data + "</td>";
				return s;
			}

			y = arr_f(e.ydata);

			el = ["<td class='legend-color' style='width: 10px; background-color: "+e.colour+"'>&nbsp</td>"];
			el.push("<td class='legend-metric'><a href='"+e.link +
				"' data-toggle='tooltip-shuffle' data-original-title='"+
				e.tooltip+"'>"+e.metric+"</a> <div id='"+e.show_url+"' class='metric_url' style='display:inline'></div></td>");
			el.push(databit(fix(y.mean), y.mean));
			el.push(databit(fix(y.deviation), y.deviation));
			el.push(databit(fix(y.min) + ", " + fix(y.max), y.min +" - "+ y.max));
			el.push("<td style='width: 10px'><div id='"+e.remove_url+"' style='display:inline'></div></td>");
			t.push(el.join(""));
			showURLs.push([e.show_url, e.sourceURL]);
			removeURLs.push([e.remove_url, e.removeURL]);

			t.push("</tr>");
			return t.join("");
		};

		if (hasRight()) {
			table.push("<tr><td colspan=99><a href='"+reset+"'>Reset Left/Right Axis</a></td></tr>");
		} else {
			if (graph.series.length >= 2) {
				table.push("<tr><td colspan=99>Click a metric to move it to the Right Axis</td></tr>");
			}
		}
		table.push("</table>");

		legend.innerHTML = table.join("\n");

		showURLs.forEach(function(d){
			showURL(d[0],d[1]);
		});

		removeURLs.forEach(function(d) {
			removeURL(d[0],d[1]);
		});

		$("[data-toggle='tooltip-shuffle']").tooltip({
			placement: "bottom",
			container: "body",
			delay: { show: 500 }
		});

		}
	} 

	
	that.init(args);
	return that;
} 

