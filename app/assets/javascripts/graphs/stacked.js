var dataChart = [];
var flag; 
	function getMetrics(metrics,_flag) {
		flag = _flag;
		dataChart = new Array(metrics.length);
		$.each(metrics, function (i, d) {

			feed = metricURL(gon.metrics[i].feed, gon.start, gon.stop, gon.step);
			$.getJSON(feed, function (data) {
				if (data.error) {
					renderError("chart", errorMessage.endpointError, data.error);
					stopUpdates();
					return false;
				}
				if (data.length === 0) {
					renderError("chart", errorMessage.noData ,feed);
					stopUpdates();
					return false;
				}
				i = $.map(gon.metrics,function(d){ return d.metric;}).indexOf(d);
				dataChart[i] = {data: data, name: d};
				flagComplete();
			});
		});
	}

var complete = 0;

function flagComplete() {
	complete++;
	if (complete == metrics.length) {
		renderStacked(dataChart);
		unrenderWaiting();
	}
}
var slider; 
function isRight(d) { 
	return right_id.indexOf(gon.metrics[d].metric) >= 0;
} 

function noRight() { 
	return clean(right_id, "").length === 0;
} 
function renderStacked(data) {

	var palette = new Rickshaw.Color.Palette({
		scheme: "munin"
	});

	colours = [];

	min = Number.MAX_VALUE; max = Number.MIN_VALUE;

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
			right_range = [ Math.min(min, right_range[0]) , Math.max(max, right_range[1]) ];
		} else { 
			left_range = [ Math.min(min, left_range[0]) , Math.max(max, left_range[1]) ];
		} 
	}

	if (!noRight()) { 
		right_scale = d3.scale.linear().domain(right_range);
	}
	left_scale = d3.scale.linear().domain(left_range);

	// Push scales and their metrics into a rickshaw-eatable array
	series = [];
	for (n = 0; n < data.length; n++) {
		colours[n] = palette.color();
		scale = left_scale;
		if (isRight(n)) { 
			scale = right_scale;
		}
		series.push({
			color: colours[n],
			data: data[n].data,
			name: data[n].name,
			scale: scale
		});
	}

	// Finally, make the chart
	interpolate = "cardinal";
	if (flag == "xkcd") {interpolate = "xkcd";}
	graph = new Rickshaw.Graph({
		element: document.querySelector("#chart"),
		width: 700,
		height: 300,
		interpolation: interpolate,
		renderer: 'line',
		series: series
	});

	// Left Y-Axis will always be around
	left_axis = new Rickshaw.Graph.Axis.Y.Scaled({
		element: document.getElementById('y_axis'),
		graph: graph,
		orientation: 'left',
		tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
		scale: left_scale
	});


	// Right Y-Axis will sometimes be here
	if (!noRight()) { 
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
		timeFixture: new Rickshaw.Fixtures.Time.Precise.Local()
	});

	/////
	dynamicWidth(graph);
	graph.render();


	// X-axis slider for zooming
	slider = new Rickshaw.Graph.RangeSlider.Preview({
		graph: graph,
	        height: 30,
		element: $('#slider')[0]
	});


	// Custom Legend
	var legend = document.querySelector("#legend-dual");

	function divme(className, inner) { 
		var x = document.createElement("div");
		x.className = className;
		x.innerHTML = inner;
		return x;
	} 

	function generate_legend(date, v) { 
		legend.innerHTML = "";

		left = [];
		right = [];

		for (var i = 0; i < v.length; i++) { 
			d = v[i];
			obj = {};
			obj.metric = format_metrics[i] //d[0].split(",").join(", ").split("~").join(" - ");
			obj.data = formatData(d[1]);
			obj.colour = d[2];
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

		table = ["<table class='table table-condensed borderless' width='100%'>"];
		table.push("<tr><td colspan=6>"+date+"</td></tr>");

		arr.forEach(function(d) { 
			table.push("<tr>");
			d.forEach(function(e) {
				if (typeof(e) == "object") { 
					el = ["<td style='background-color: "+e.colour+"'>&nbsp</td>"];
					el.push("<td class='legend-metric'><a href='"+e.link +  
						"' data-toggle='tooltip-shuffle' data-original-title='"+ 
						e.tooltip+"'>"+e.metric+"</td>");
					el.push("<td align='right'>"+e.data+"</td>");
					table.push(el.join(""));
				} else { 
					table.push("<td colspan=3>&nbsp;</td>");
				} 
			});
			table.push("</tr>");
		});

		table.push("<tr><td colspan=6><a href='"+reset+"'>Reset Left/Right Axis</a></td></tr>");
		table.push("<table>");

		legend.innerHTML = table.join("\n");
	
		$("[data-toggle='tooltip-shuffle']").tooltip({ 
			placement: "bottom", 
			container: "body", 
			delay: { show: 500 }
		});
	} 

	// Initial Labels with no values
	fake_label = [];
	for (i = 0; i < format_metrics.length; i++) {
		fake_label.push([format_metrics[i], "", colours[i]]);
	}
	generate_legend("Hover over graph for details", fake_label);

	// Overload HoverDetail so it populates our legend dynamically
	var Hover = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {
		render: function (args) {

			date = d3.time.format("%a, %d %b %Y %H:%M:%S")(new Date(args.domainX * 1000));
			v = [];
			args.detail.forEach(function (d) {
				v.push([d.name, d.formattedYValue, d.series.color]);

				// Highlight selected datapoints
				var dot = document.createElement('div');
				dot.className = 'dot';
				dot.style.top = graph.y(d.value.y0 + d.value.y) + 'px';
				dot.style.borderColor = d.series.color;

				this.element.appendChild(dot);
				dot.className = 'dot active';
				this.show();
			}, this);
			generate_legend(date, v);
		}
	});

	// Call the cover function
	var hover = new Hover({
		graph: graph
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
						renderError("flash", errorMessage.endpointError + " on update", d.error);
						stopUpdates();
						return false;
					}
					if (d.length === 0) {
						renderError("flash", errorMessage.noData + " on update", update);
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
