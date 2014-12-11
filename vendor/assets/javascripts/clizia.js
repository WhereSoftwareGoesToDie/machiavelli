/* Clizia  - A Comedy written by Machiavelli */

var Clizia = {};

Array.prototype.max = function() { return Math.max.apply(null, this); };
Array.prototype.min = function() { return Math.min.apply(null, this); };

/* Proper validation of an array requires a lot of checks */
var is_array = function (value) {
	return value &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		typeof value.splice === 'function' &&
		!(value.propertyIsEnumerable('length'));
};


var nanobar;

/**
A nanobar.js object
@param args.count - the expected number of events to be returned before the page is "complete"
*/
Clizia.Nanobar = function(args) {
	if (typeof Nanobar !== "function") {
	       	throw "Clizia.Nanobar requires Nanobar.js";
	}
	var that = {};
	var complete = 0;
	that.init = function(args) {
		if (!args.count) {
			throw "Cannot create progress without a count of expected items";
		}
		that.count = args.count;
		that.nanobar = new Nanobar({bg: "#356895" ,id:"#progress"})
	};

	that.inc = function() {
		complete = complete + 1;
		var len = (complete / that.count) * 100;
		if (len < 100) {
			that.nanobar.go(len);
		}
		else {
			that.nanobar.go(100);
		}
	};

	// Force the completion of the nanobar progress (e.g. unrecoverable error)
	that.complete = function() {
		that.nanobar.go(100);
	}

	that.init(args);

	return that;
};

var clizia_utils_unique_id_seed = 0;
Clizia.Utils = {
	showURL: function(element, url) {
		var show = "<span class='data_source'><a href='"+
			url+
			"' target=_blank><i title='Open external data source' "+
			"class='icon-external-link'></i></a></span>";
		document.getElementById(element).innerHTML = show;
	},
	removeURL: function(element, url) {
		var rm = "<span class='remove_metric'><a href='"+
			url+
			"'><i title='Remove graph' class='icon-remove'></i></a></span>";
		document.getElementById(element).innerHTML = rm;
	},
	ProgressBar: function(a) {
		nanobar = Clizia.Nanobar({count: a});
	},

	uniq_id: function(a) {
		//unique, not a GUID, but unique enough
		if (typeof a === "undefined") {
			div_name = "id_"
		} else {
			div_name = a + "_"
		}
		return div_name + (++clizia_utils_unique_id_seed)
	}

};
Clizia.Graph = function(args) {
        var that = {};

        that.init = function(args) {
		if (!args) throw "Clizia.Graph requires at least some settings. You have provided none."

                if (!args.chart) throw "Clizia.Graph needs a chart";
                that.chart = args.chart;

                if (!args.metric) throw "Clizia.Graph needs a metric"
                that.metric = args.metric;
        }

        that.render = function(args) { throw "Cannot invoke parent Clizia.Graph.render() directly." }
        that.update = function(args) { throw "Cannot invoke parent Clizia.Graph.update() directly." }


	next_color = function() {
		if (typeof clizia_palette === "undefined") {
			clizia_palette = new Rickshaw.Color.Palette({scheme: "munin"})
		}
		return clizia_palette.color()
	}

	that.state = function(args) {
		if (typeof args === "String" ) { args = {state: args} }

		function rmv_wait() { graph.find(".waiting").remove() }

		if (args.state) {
			var graph = $("#"+that.chart)
			if (args.state === "waiting") {
				graph.append("<div class='waiting'><i class='icon-spin'></i></div>")
			} else if (args.state === "error") {
				rmv_wait()

				error = args.error;
				removeURL = args.removeURL || ""
				showURL = args.showURL || ""
				detail = args.detail || ""

				error = stripHTML(error);
				error_alert = "<div class='alert alert-danger'>" + error;

				if (showURL) {
					error_alert +=  ". <a class='alert-link' href='"+showURL+"'>Check source data</a>";
				}

				if (removeURL) {
					error_alert +=  ". <a class='alert-link' href='"+removeURL+"'>Remove graph</a>.";
				}

				if (detail) {
					error_alert +=  "<a class='detail_toggle alert-link' href='javascript:void(0);'>(details)</a>" +
						"<div class='detail' style='display:none'>" +
						detail +
						"</div>";
				}
				error_alert += "</div>";
				graph.append(error_alert)

				graph.addClass("error")
			} else if (args.state === "complete") {
				rmv_wait()
			}
		} else {
			throw "No state"
		}
	}
	function stripHTML(e) {  return e.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,""); }

	that.metric_complete = function() {
		if (typeof nanobar === "object") {
			nanobar.inc()
		}
	}

	that.metric_failed = function() {
		if (typeof nanobar === "object") {
			nanobar.complete()
		}
	}

	that.init(args);
	return that;
}

Clizia.Graph.Horizon = function(args) {
	var that = Clizia.Graph(args)

	that.init = function(args) {
		if (!args.start) throw "Clizia.Graph.Horizon needs a start time"
		that.start = args.start

		if (!args.stop)  throw "Clizia.Graph.Horizon needs a stop time"
		that.stop = args.stop

		if (!args.step)  throw "Clizia.Graph.Horizon needs a step interval"
		that.step = args.step


		if (that.chart.indexOf("#") === -1 ) { that.chart = "#" + that.chart }
		that.clock = args.clock || "utc"
		that.width = args.width || 600;
		that.color = args.color || ["#08519c","#3182bd","#6baed6","#bdd7e7","#bae4b3","#74c476","#31a354","#006d2c"];

		delay = Date.now() - (that.stop* 1000)

		var context = cubism.context()
			.serverDelay(delay)
			.clientDelay(0)
			.step(that.step*1000) //1e3)
			.size(that.width)
			.stop();
		that.context = context;
	}

	that.render = function() {
		context = that.context

		if (that.clock == "utc") { context.utcTime(true);}

		datum = [];

		machiavelli = context.machiavelli(window.location.origin);
		for (n = 0; n < that.metric.length; n++ ) {
			m = that.metric[n]
			id = m.id;
			title = m.title || m.id
			datum.push(machiavelli.metric(id,title, that.metric_complete))
		}

		d3.select(that.chart).call(function(div) {
			div.append("div")
				.attr("class", "axis")
				.call(context.axis().orient("top"));

			div.selectAll(".horizon")
				.data(datum)
				.enter().append("div")
				.attr("class", "horizon")
				.call(
					context.horizon()
					.height(50)
					.colors(that.color)
				);

			div.append("div")
				.attr("class", "rule")
				.call(context.rule());
		});
		// On mousemove, reposition the chart values to match the rule.
		context.on("focus", function(i) {
			d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
		});
	}

	that.init(args)
	return that
}
Clizia.Graph.Rickshaw = function (args) { 
	if (typeof Rickshaw !== "object") throw "Clizia.Graph.Rickshaw requires Rickshaw.Graph"

	var that = Clizia.Graph(args)

	var defaults = { width: 700, height: 200, padding: 1 , clock: "utc"}

	that.init = function(args) { 
		//TODO arg handler? args key then error if 404 then assignment?
		container = $("#"+that.chart)
		container.addClass("chart_container")

		that.yaxis = Clizia.Utils.uniq_id("y_axis")
		container.append("<div id='"+that.yaxis+"' class='y_axis'></div>")

		that.graph = Clizia.Utils.uniq_id("graph")
		that.graph_id = that.graph
		container.append("<div id='"+that.graph+"' class='chart'></div>")

		that.y2axis = args.y2axis

		if (args.slider) { 
			that.slider = args.slider 
			$("#"+that.slider.element).addClass("slider")
		} 
		else { that.noSlider = true }
		

		if (args.dynamic) { that.dynamic = args.dynamic }
		if (args.showurl) { that.showurl = args.showurl}
		if (args.removeurl) { that.removeurl = args.removeurl}
		if (args.zeromin) { that.zeromin = args.zeromin }

		if (is_array(that.metric)) { 

			that.color = args.color || []
			for (n = 0; n < that.metric.length; n++ ) {
				m = that.metric[n]
				m.metadata = m.metadata || {}
				if (!m.feed && !m.data) {
					throw "Metric '"+m.id+"' has no data or feed!"
				}

				// Expect metric and color to either be Object, String; or [Object], [String]
				m.color = m.metadata.color || that.color[n] || next_color(); 
			}

		} else {
			that.metric.metadata = that.metric.metadata || {}

			if (!that.metric.feed && !that.metric.data) { throw "Metric "+that.metric.id+" has no data or feed!" }
			that.metric.color = that.metric.metadata.color || args.color || next_color();
		} 
		

		//TODO nicer defaults, like above, but optional?
		that.width = args.width || defaults.width;
		that.height = args.height || defaults.height;
		that.padding = args.padding || defaults.padding;
		that.clock = args.clock || defaults.clock;
		that.base = args.base || "??";

		that.state({state: "waiting"})
	} 

	that.invalidData = function(data) { 
		if (data.error) { return true } 
		if (data.length === 0) { return true } 
		return false
	} 

	that.extents = function(data) { 
		min = Number.MAX_VALUE; 
		min = $.map(data, function(d){return d.y}).min() 
		if (that.zeromin) { min = 0 } 

		max = Number.MIN_VALUE;
		max = $.map(data, function(d){return d.y}).max()
		
		if (min == Number.MAX_VALUE) { 
			min=0; 
			max=0;
		}
		return [min, max]
	} 

	that.update = function(args) {  
				
		if (is_array(args.metric)) { 
			$.each(args.metric, function(n, m) { 
				if (m.data) {  
					that.graph.series[n].data = m.data
				} else { 
					newfeed = m.feed
					$.getJSON(newfeed, function(data) { 
						if (that.invalidData(data)) { 
							throw "Invalid Data, cannot render update" 
						}
						that.graph.series[n].data = data
					})
				}	
			})
			if (typeof that.update_overlay == "function") { that.update_overlay() }
			that.graph.render();
		} else {
			if (args.metric.data) {
				that.graph.series[0].data = args.metric.data
				that.graph.render();
				if (typeof that.update_overlay == "function") { that.update_overlay() }
			} else { 
				newfeed = args.metric.feed
				$.getJSON(newfeed, function(data) {
					if (that.invalidData(data)) { throw "Invalid Data, cannot render update" }
					that.graph.series[0].data = data
					that.graph.render();
					if (typeof that.update_overlay == "function") { that.update_overlay() }
				 })
			}
		}
	}

	that.format = function(d) {
		return Rickshaw.Fixtures.Number.formatKMBT_round(parseFloat(d),0,0,4);
	}

	that.timeFixture = function() {
		if (that.clock == "utc") { 
			return new Rickshaw.Fixtures.Time.Precise()
		} else { 
			return new Rickshaw.Fixtures.Time.Precise.Local() 
		}
	}
	that.d3_time = function(x) {
		f_string = "%Y-%m-%d %H:%M:%S %Z"
		date = new Date(x*1000)
		if (that.clock == "utc") {
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
		if (that.y2axis) { 
			$("#"+that.y2axis).attr("style","left: "+(new_width+60)+"px");
		}
		if (that.legend) { 
			$("#"+that.legend).attr("style","width: "+(new_width)+"px");
		}
	} 

	that.dynamicWidth = function() {
		if (that.dynamic) { 
			that.fitToWindow()
			$(window).on('resize', function(){ that.fitToWindow(); })
		}
	} 

	that.zoomtoselected = function(_base, _start, _stop) { 
		$(window).on('hashchange', function() {
			hash = window.location.hash.slice(1).split(",");
			start = parseInt(hash[0]);
			stop = parseInt(hash[1]);
			if (start === 0) { start = _start; }
			if (stop === 0) { stop = _stop; }

			if (stop - start < 600) { stop = start + 600; } //prevent zooms that are too small 

			url = _base;

			url += "&start=" + start;
			url +=  "&stop=" + stop;

			html =  "<a href='"+url+"' data-toggle='tooltip_z' " ;
			html += "data-original-title='Magnify search to selected'><i class='icon-zoom-in no_link'>";
			html += "</i></a>";
			$("#zoomtoselected").html(html);
			$("[data-toggle='tooltip_z']").tooltip({ placement: "bottom", container: "body", delay: { show: 500} });
		});

	},

	that.init(args) 
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

		//Stacked works in arrays
		if (!is_array(that.metric)) {
			that.metric = [that.metric]
		}
		that.scalarPad = args.scalarPad || args.padding || 1;
		if (args.renderer != "line" ) { that.scalarPad = 0 }

		that.ratioPad  = args.ratioPad || 0.1;

		that.right = args.right || []
		that.right_links = args.right_links || []
		that.left_links = args.left_links || []

		if (that.right.length === that.metric.length) { that.hasLeft = false }
		else { that.hasLeft = true; }

		if (that.right.length === 0) { that.hasRight = false }
		else { that.hasRight = true; }

		that.stack = args.stack || "off";
		that.renderer = args.renderer || "line";

	}

	isRight = function (m) { return that.right.indexOf(that.metric[m].id) >=  0 }
	isLeft = function (m) { return that.right.indexOf(that.metric[m].id) === -1 }

	dataStore = []

	that.render = function(args) {
		$.each(that.metric, function(i,d) {
			if (d.data) {
				dataStore[i] = {data: d.data, name: d.title || d.id }; flagComplete()
			} else {
				feed = that.metric[i].feed
				$.getJSON(feed, function(data) {
					if (that.invalidData(data)) {
						err = data.error || "No data received"
						that.state({state: "error", chart: that.chart, error: err})
						that.metric_failed()
						throw err
					}
					dataStore[i] = {data: data, name: d }
					flagComplete()
				})
			}
		})

	}

	completeCount = 0;
	flagComplete = function(args) {
		that.metric_complete()
		completeCount += 1;
		if (completeCount === that.metric.length) {
			completeRender()
		}
	}

	completeRender = function() {

		right_range = [Number.MAX_VALUE, Number.MIN_VALUE];
		left_range  = [Number.MAX_VALUE, Number.MIN_VALUE];

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

		if (that.hasRight) {
			right_range = [right_range[0] - that.scalarPad, right_range[1] + that.scalarPad]
			right_scale = d3.scale.linear().domain(right_range);
		}

		if (that.hasLeft)  {
			left_range  = [left_range[0]  - that.scalarPad, left_range[1]  + that.scalarPad]
			left_scale = d3.scale.linear().domain(left_range);
		}

		series = [];
		for (n = 0; n < dataStore.length; n++) {
			scale = isRight(n) ? right_scale : left_scale

			series.push({
				data: dataStore[n].data,
				name: dataStore[n].name,
				color: that.metric[n].color,
				scale: scale
			})
		}

		config = {}
		config.renderer = that.renderer;
		config.stack = that.stack;
		config.interpolate = "monotone";

		if (that.hasRight && that.hasLeft ) {
			d = [Math.min(left_scale.domain()[0], right_scale.domain()[0]),
			Math.max(left_scale.domain()[1], right_scale.domain()[1])]
		} else if (that.hasRight) {
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


		try {
			graph = new Rickshaw.Graph({
				element: document.getElementById(that.graph),
				width: that.width,
				height: that.height,
				series: series
			})
		} catch (e) {
			that.state({state: "error", element: that.chart, error: e, removeURL: that.metric.removeURL})
			return
		}

		graph.configure(config);

		that.graph = graph;

		if (that.hasLeft) {
			left_axis = new Rickshaw.Graph.Axis.Y.Scaled({
				element: document.getElementById(that.yaxis),
				graph: graph,
				orientation: 'left',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				scale: left_scale
			});
		}

		if (that.hasRight) {
			right_axis = new Rickshaw.Graph.Axis.Y.Scaled({
				element: document.getElementById(that.y2axis),
				graph: graph,
				grid: false,
				orientation: 'right',
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
				scale: right_scale
			});
			that.ryaxis = right_axis;
		}

		// One X-axis for time
		new Rickshaw.Graph.Axis.Time({
			graph: graph,
			timeFixture: that.timeFixture()
		});

		/////
		that.dynamicWidth();
		graph.render();

		// Make stacks easier to see by adding an alpha transperancy to both
		// the graph and the legend
		if (that.stack === false && (that.renderer == "area")) {
			$(document.head).append("<style>path.area{opacity:0.8};.legend-color{opacity:0.8}</style>");
		}

		// X-axis slider for zooming
		if (that.slider) {
			that.slider.render({graphs: graph, onchange: that.generateLegend})
		}

		var hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: graph,
			formatter: function(series, x, y, fx, fy, d) {
				var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
				var date = '<span class="date"> '+that.d3_time(x)+'</span>';
				var content = swatch + that.metric[d.order -1].title + ": " + y.toFixed(4) + "<br>"+ date;
				return content;
			},
			xFormatter: function(x){
				return new Date(x * 1000).toString();
			}
		} );

		that.generateLegend()
		that.zoomtoselected(that.base || base , that.start || start, that.stop || stop);
		that.state({state: "complete"})
	}

	that.generateLegend = function() {
		if (that.legend) {

		var legend = document.getElementById(that.legend);

		function median(a) {
			a.sort(function(a,b){return a - b});
			h = Math.floor(a.length/2)
			if (a.length % 2) { n = a[h]; m = n }
			else { n = a[h-1]; m = a[h] }
			return (n + m) / 2.0
		}

		function arr_f(a) {
			r = {avg: 0, median: 0, min: 0, max: 0, std: 0};
			t = a.length;
			r.max = Math.max.apply(Math, a);
			r.min = Math.min.apply(Math, a);
			r.median = median(a);
			for(var m, s = 0, l = t; l--; s += a[l]);
			for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
			return r.deviation = Math.sqrt(r.variance = s / t), r;
		}

		function fix(a) { return Rickshaw.Fixtures.Number.formatKMBT_round(a);}

		function visibleData(a) {
			if (that.graph.window.xMin === undefined) {
				min = Number.MIN_VALUE;
			} else { min = that.graph.window.xMin; }
			if (that.graph.window.xMax === undefined) {
				max = Number.MAX_VALUE;
			} else { max = that.graph.window.xMax; }

			return $.map(a, function(d) { if (d.x >= min && d.x <= max) { return d.y;}  });
		}

		left = [];
		right = [];

		for (var i = 0; i < that.graph.series.length; i++) {
			d = that.graph.series[i];
			obj = {};
			obj.metric = that.metric[i].title || that.metric[i].id;
			obj.colour = d.color;

			obj.ydata = visibleData(d.data);
			obj.sourceURL = that.metric[i].sourceURL;
			obj.removeURL = that.metric[i].removeURL;
			obj.index = i;
			obj.show_url = "metric_"+i+"_showurl";
			obj.remove_url = "metric_"+i+"_removeurl";

			if (isRight(i)) {
				obj.link = that.left_links[i];
				obj.tooltip = "Move metric to the left y-axis";
				right.push(obj);
			} else {
				obj.link = that.right_links[i];
				obj.tooltip = "Move metric to the right y-axis";
				left.push(obj);
			}
		}

		showURLs = [];
		removeURLs = [];

		table = ["<table class='table table-condensed borderless' width='100%'>"];

		function rtd(side) {
			c = [];

			["&nbsp","mean","median","std.deviation","min, max","&nbsp"].forEach(function(d){
				c.push("<td align='right'>"+d+"</td>");
			});

			if ( left.length > 0 && right.length > 0 ) {  c.splice(1,0, "<td>"+side+" Axis</td>"); }
			else { c.splice(1,0,"<td>&nbsp;</td>")}
			return c.join("");
		}


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
			el.push(databit(fix(y.median), y.median));
			el.push(databit(fix(y.deviation), y.deviation));
			el.push(databit(fix(y.min) + ", " + fix(y.max), y.min +" - "+ y.max));
			el.push("<td style='width: 10px'><div id='"+e.remove_url+"' style='display:inline'></div></td>");
			t.push(el.join(""));
			showURLs.push([e.show_url, e.sourceURL]);
			removeURLs.push([e.remove_url, e.removeURL]);

			t.push("</tr>");
			return t.join("");
		};

		// Stacked graphs will order last to first, so flip the legend, for sanity
		if (that.stack) { left = left.reverse(); right = right.reverse()  }

		if (left[0]) { table.push(rtd("Left"))  }
		left.forEach(function(d){ row = tableize(d); table.push(row) })

		if (right[0]) { table.push("<tr><td>&nbsp;</td></tr>"); table.push(rtd("Right"))}
		right.forEach(function(d){ row = tableize(d); table.push(row) })


		if (that.hasRight) {
			table.push("<tr><td colspan=99><a href='"+reset+"'>Reset Left/Right Axis</a></td></tr>");
		} else {
			if (that.graph.series.length >= 2) {
				table.push("<tr><td colspan=99>Click a metric to move it to the Right Axis</td></tr>");
			}
		}
		table.push("</table>");

		legend.innerHTML = table.join("\n");

		showURLs.forEach(function(d){
			Clizia.Utils.showURL(d[0],d[1]);
		});

		removeURLs.forEach(function(d) {
			Clizia.Utils.removeURL(d[0],d[1]);
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
Clizia.Graph.Rickshaw.Standard = function(args) {
	var that = Clizia.Graph.Rickshaw(args);

	that.render = function(args) {

		if (that.metric.feed) {

			$.getJSON(that.metric.feed, function(data) {
				if (that.invalidData(data)) {
					err = data.error ||  errorMessage.noData
					that.state({state: "error", element: that.chart, error: err, removeURL: that.metric.removeURL})
					if (that.slider) { that.slider.failed({graph: that.metric.id}) }
					that.metric_complete();
					throw "Error retrieving data: "+err
				}

				that.process(data)

			})
		} else if (that.metric.data) {
			that.process(that.metric.data)
		}
	}

	that.process = function(data) {
		if (that.showurl) {
			Clizia.Utils.showURL(that.showurl, that.metric.sourceURL);
		}

		if (that.removeurl) {
			Clizia.Utils.removeURL(that.removeurl, that.metric.removeURL);
		}
		graph = new Rickshaw.Graph({
			element: document.getElementById(that.graph),
			width: that.width,
			height: that.height,
			renderer: 'line',
			series: [{ data: data, color: that.metric.color }]
		});

		that.graph = graph;
		extent = that.extents(data);
		pextent = {min: extent[0] - that.padding, max: extent[1] + that.padding}

		if (that.zeromin) { pextent.min = 0 }

		graph.configure(pextent);

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
			timeFixture: that.timeFixture()
		});

		that.dynamicWidth();
		graph.render();

		new Rickshaw.Graph.HoverDetail({
			graph: graph,
			formatter: function (series, x, y) {
				content = "<span class='date'>" +
					  that.d3_time(x) +
					  "</span><br/>" +
					  that.format(y);
				return content;
			}
		});

		graph.render();
		that.state({state: "complete"})
		that.metric_complete();

		if (that.slider) {
			that.slider.render({graphs: graph})
		}

		that.zoomtoselected(that.base || base , that.start || start, that.stop || stop);
	}

	return that;
}

Clizia.Graph.Rickshaw.Slider = function (args) { 
	var that = {} 

	var defaults = { height: 30 }

	that.init = function(args) { 
		if (!args.element) { throw "Clizia.Slider requires an element to use" }
		that.element = args.element

		that.height = args.height || defaults.height
		that.length = args.length || 1 		
	}

	that.graphs = []

	that.failed = function(args) { 
		if (args.graph) { 
			console.log("Slider was informed that "+ args.graph + " failed. Decrease expected graph count.")
			that.length = that.length - 1; 
			that.render()
		} 
	} 

	that.render = function(args) {
		if (args) { 	
			if (args.graphs) { that.graphs.push(args.graphs) } 
		}

		if (!that.graphs) { throw "Clizia.Slider cannot render if no graphs" }

		if (that.length == that.graphs.length && that.length >= 1) {
			settings = {
				graphs: that.graphs,
				height: that.height, 
				element: document.getElementById(that.element)
			}
			if (args) { if (args.onchange) { settings.onChangeDo = args.onchange }}
			that.slider = new Rickshaw.Graph.RangeSlider.Preview(settings)

			that.slider.render()
		}
	}

	that.init(args) 
	return that;	
} 

Clizia.Graph.Rickshaw.Tealeaves = function(args) { 
	var that = Clizia.Graph.Rickshaw(args);
	
	that.render = function(args) { 
		if (that.metric.feed) { 
			$.getJSON(that.metric.feed, function(data) { 
				if (that.invalidData(data)) { 
					err = data.error ||  errorMessage.noData	
					that.state({state: "error", element: that.chart, error: err, removeURL: that.metric.removeURL, showURL: that.metric.sourceURL})
					if (that.slider) { that.slider.failed({graph: that.metric.id}) }
					that.metric_complete();
					throw "Error retrieving data: "+err
				}
				
				that.process(data)
			})
		} else if (that.metric.data) { 
			that.process(that.metric.data) 
		} 
	} 

	that.process = function(data) {  
		if (that.showurl) {
			Clizia.Utils.showURL(that.showurl, that.metric.sourceURL);
		} 

		if (that.removeurl) { 
			Clizia.Utils.removeURL(that.removeurl, that.metric.removeURL);
		} 

		graph = new Rickshaw.Graph({
			element: document.getElementById(that.graph),
			width: 348, 
			height: 100,
			interpolation: 'step-after',
			renderer: 'area', 
			series: [{ data: data, color: '#afdab1' }]
		});


		that.graph = graph;
		graph.render();

		container = $("#"+that.graph.element.id)
		container.append("<div class='overlay-name'>"+that.metric.title+"</div>")
		container.append("<div class='overlay-number'></div>")
		that.update_overlay()

		that.state({state: "complete"})
		that.metric_complete(); 
	} 

	that.update_overlay = function() { 
		last = that.graph.series[0].data[graph.series[0].data.length -1].y
		last = Math.round(last*1000)/1000	
		$("#"+that.graph.element.id).find(".overlay-number").text(last)
	}

	that.init(args)

	return that;
}
