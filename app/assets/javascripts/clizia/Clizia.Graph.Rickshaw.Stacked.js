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
	
	} 

	isRight = function (m) { return that.right.indexOf(that.metric[m].id) >=  0 } 
	isLeft = function (m) { return that.right.indexOf(that.metric[m].id) === -1 } 
	
	dataStore = []
	
	that.render = function(args) {
		$.each(that.metric, function(i,d) { 
			$.getJSON(that.feed({index: i}), function(data) { 
				if (that.invalidData(data)) { 
					err = data.error || "No data receieved"
					that.state({state: "error", chart: that.chart, error: err})
					throw err
				} 
				dataStore[i] = {data: data, name: d }
				flagComplete();
			}) 
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

		// ...
		if (that.flag === "xkcd") {
			config.interpolate = "xkcd";
		}

		graph = new Rickshaw.Graph({
			element: document.getElementById(that.chart),
			width: that.width, 
			height: that.height, 
			series: series
		})

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
		if (config.stack === false && (config.renderer == "area")) {
			$(document.head).append("<style>path.area{opacity:0.8};.legend-color{opacity:0.8}</style>");
		}

		// X-axis slider for zooming
		slider = new Rickshaw.Graph.RangeSlider.Preview({
			graph: graph,
			height: 30,
			element: $('#slider')[0],
			onChangeDo: that.generateLegend
		});

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
		that.zoomtoselected(that.base, that.start, that.stop);	
		that.state({state: "complete"})
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
			obj.metric = that.metric[i].title;
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

		if (that.hasRight) {
			table.push("<tr><td colspan=99><a href='"+reset+"'>Reset Left/Right Axis</a></td></tr>");
		} else {
			if (graph.series.length >= 2) {
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
