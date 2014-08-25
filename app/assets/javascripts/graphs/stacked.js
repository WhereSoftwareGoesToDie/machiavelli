var dataChart = [];
var flag; 
function getMetrics(metrics,_flag) {
	flag = _flag;
	dataChart = new Array(metrics.length);
	$.each(metrics, function (i, d) {

		feed = metricURL(gon.metrics[i].feed, gon.start, gon.stop, gon.step);
		$.getJSON(feed, function (data) {
			if (data.error) {
				renderError("chart", data.error);
				stopUpdates();
				doneProgress();
				return false;
			}
			if (data.length === 0) {
				renderError("chart", errorMessage.noData);
				stopUpdates();
				doneProgress();
				return false;
			}
			i = $.map(gon.metrics,function(d){ return d.id;}).indexOf(d);
			dataChart[i] = {data: data, name: d};
			flagComplete();
		});
	});
}

var complete = 0;
initProgress();

function flagComplete() {
	complete++;
	updateProgress();
	if (complete == metrics.length) {
		doneProgress();
		renderStacked(dataChart);
		unrenderWaiting();
	}
}
var slider; 
function isRight(d) { 
	return right_id.indexOf(gon.metrics[d].id) >= 0;
} 
function hasRight() { 
	return clean(right_id, "").length != 0;
}
function isLeft(d) { 
	return right_id.indexOf(gon.metrics[d].id) == 0;
} 
function hasLeft() { 
	return gon.metrics.length != clean(right_id,"").length
} 

function renderStacked(data) {

	var palette = new Rickshaw.Color.Palette({
		scheme: "munin"
	});

	colours = [];

	min = Number.MAX_VALUE; max = Number.MIN_VALUE;

	if (config.renderer == "line") { pad = 1} else {pad = 0}

	left_range = [min,max];
	right_range = [min,max];
	for (n = 0; n < data.length; n++) {
		min = Number.MAX_VALUE; max = Number.MIN_VALUE;
		for (i = 0; i < data[n].data.length; i++) {
			if (typeof data[n].data[i].y == "number") {
				min = Math.min(min, data[n].data[i].y);
				max = Math.max(max, data[n].data[i].y);
			}
		} 
		if (isRight(n)) { 
			right_range = [ Math.min(min, right_range[0]) - pad , Math.max(max, right_range[1]) + pad ];
		} else { 
			left_range = [ Math.min(min, left_range[0]) - pad, Math.max(max, left_range[1]) + pad ];
		} 
	}

	if (hasRight()) { 
		right_scale = d3.scale.linear().domain(right_range);
	}
	if (hasLeft()) { 
		left_scale = d3.scale.linear().domain(left_range);
	}

	// Push scales and their metrics into a rickshaw-eatable array
	series = [];
	for (n = 0; n < data.length; n++) {
		colours[n] = palette.color();
		if (isRight(n)) { 
			scale = right_scale;
		} else { 
			scale = left_scale; 
		}
		series.push({
			color: colours[n],
			data: data[n].data,
			name: data[n].name,
			scale: scale
		});
	}

	// Finally, make the chart
	config.interpolate = "monotone";

	if (flag == "xkcd") {
		config.interpolate = "xkcd";
	}

	graph = new Rickshaw.Graph({
		element: document.querySelector("#chart"),
		width: 700,
		height: 300,
		series: series
	});

	graph.configure(config);

	if (hasLeft()) { 
		left_axis = new Rickshaw.Graph.Axis.Y.Scaled({
			element: document.getElementById('y_axis'),
			graph: graph,
			orientation: 'left',
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
			scale: left_scale
		});
	}

	if (hasRight()) { 
		right_axis = new Rickshaw.Graph.Axis.Y.Scaled({
			element: document.getElementById('y_axis_right'),
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

	generate_legend();
}

function generate_legend() { 

	var legend = document.querySelector("#legend-dual");
	
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
		obj.index = i;
		obj.div_name = "metric_"+i+"_url";

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

	arr = [];
	len = Math.max(left.length, right.length) ;
	for (var j = 0; j < len; j++) { 
		arr.push([left[j],right[j]]);
	} 

	showURLs = [];

	table = ["<table class='table table-condensed borderless' width='100%'>"];

	function rtd(side) { 
		c = [];

		["&nbsp","average","deviation","bounds"].forEach(function(d){
			c.push("<td align='right'>"+d+"</td>");
		});
		c.splice(1,0, "<td>"+side+" Axis</td>");
		return c.join("");
	} 

	emptyHeader = "<td colspan=5>&nbsp;</td>"
	header = ""
	if (arr[0][0]) { header += rtd("Left");	} else { header += emptyHeader }
	if (arr[0][1]) { header += rtd("Right");} else { header += emptyHeader } 
	table.push(header);

	// Stacked graphs will order last to first, so flip the legend, for sanity
	if (config.stack) { arr = arr.reverse() }

	arr.forEach(function(d) { 
		table.push("<tr>");

		function databit(data, tooltip) { 
			s = "<td class='table_detail' align='right' data-toggle='tooltip-shuffle' nowrap ";
			s +="data-original-title='"+tooltip+"'>" + data + "</td>";
			return s;
		} 

		d.forEach(function(e) {
			if (typeof(e) == "object") { 
				y = arr_f(e.ydata);

				el = ["<td class='legend-color' style='width: 10px; background-color: "+e.colour+"'>&nbsp</td>"];
				el.push("<td class='legend-metric'><a href='"+e.link +  
					"' data-toggle='tooltip-shuffle' data-original-title='"+ 
					e.tooltip+"'>"+e.metric+"</a> <div id='"+e.div_name+"' class='metric_url' style='display:inline'></div></td>");
				el.push(databit(fix(y.mean), y.mean));
				el.push(databit(fix(y.deviation), y.deviation));
				el.push(databit(fix(y.min) + ", " + fix(y.max), y.min +" - "+ y.max));
				table.push(el.join(""));
				showURLs.push([e.div_name, e.sourceURL]);
			} else { 
				table.push("<td colspan=5>&nbsp;</td>");
			} 

		});
		table.push("</tr>");
	});

	if (hasRight()) { 
		table.push("<tr><td colspan=12><a href='"+reset+"'>Reset Left/Right Axis</a></td></tr>");
	} else {
		if (graph.series.length >= 2) { 
			table.push("<tr><td colspan=12>Click a metric to move it to the Right Axis</td></tr>");
		} 
	}
	table.push("<table>");

	legend.innerHTML = table.join("\n");

	showURLs.forEach(function(d){
		showURL(d[0],d[1]);
	});

	$("[data-toggle='tooltip-shuffle']").tooltip({ 
		placement: "bottom", 
		container: "body", 
		delay: { show: 500 }
	});
}

function updateStacked() {
	intervalID = setInterval(function (d) {

		now = parseInt(Date.now() / 1000);
		span = (gon.stop - gon.start);

		$.each(gon.metrics, function (i, metric) {
			if (metric.live) {
	                        update = metricURL(metric.feed,now-span,now,gon.step);

				$.getJSON(update, function (d) {
					if (d.error) {
						renderError("flash", d.error);
						stopUpdates();
						return false;
					}
					if (d.length === 0) {
						renderError("flash", errorMessage.noData);
						stopUpdates();
						return false;
					}
					graph.series[i].data = d;
					graph.render();
				});
			}
		});

	}, gon.step * 1000);
	return intervalID;
}
