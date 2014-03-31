// Stacked Graph Type Javascript
//
//
var dataChart = []

	function getMetrics(metrics) {
		$.each(metrics, function (i, d) {

			feed = metricURL(gon.metrics[i].feed, gon.start, gon.stop, gon.step)
			$.getJSON(feed, function (data) {
				if (data.error) {
					renderError("chart", "endpoint returned an error", data.error);

					stopUpdates();
					return false
				}
				if (data.length == 0) {
					renderError("chart", "no data returned from endpoint",feed);
					stopUpdates();
					return false
				}

				dataChart.push({
					data: data,
					name: d
				})
				flagComplete()
			})
		})
	}

complete = 0

function flagComplete() {
	complete++;
	if (complete == metrics.length) {
		renderStacked(dataChart)
		unrenderWaiting()
	}
}
var slider; 
function isRight(d) { 
	return right_id.indexOf(gon.metrics[d].metric) >= 0 
} 

function noRight() { 
	return clean(right_id, "").length == 0		
} 
function renderStacked(data) {

	var palette = new Rickshaw.Color.Palette({
		scheme: "munin"
	})

	colours = []

	min = Number.MAX_VALUE; max = Number.MIN_VALUE;

	left_range = [min,max]
	right_range = [min,max]
	for (n = 0; n < data.length; n++) {
		min = Number.MAX_VALUE; max = Number.MIN_VALUE;
		for (i = 0; i < data[n].data.length; i++) {
			min = Math.min(min, data[n].data[i].y)
			max = Math.max(max, data[n].data[i].y)
		} 
		if (isRight(n)) { 
			right_range = [ Math.min(min, right_range[0]) , Math.max(max, right_range[1]) ] 
		} else { 
			left_range = [ Math.min(min, left_range[0]) , Math.max(max, left_range[1]) ] 
		} 
	}

	if (!noRight()) { right_scale = d3.scale.linear().domain(right_range) };//.range(right_range); )
	left_scale = d3.scale.linear().domain(left_range);//.range(left_range); 

	// Push scales and their metrics into a rickshaw-eatable array
	series = []
	for (n = 0; n < data.length; n++) {
		colours[n] = palette.color()
		scale = left_scale
		if (isRight(n)) { scale = right_scale}
		series.push({
			color: colours[n],
			data: data[n].data,
			name: data[n].name,
			scale: scale
		})
	}

	// Finally, make the chart
	graph = new Rickshaw.Graph({
		element: document.querySelector("#chart"),
		width: 700,
		height: 300,
		renderer: 'line',
		series: series
	});

	// Left Y-Axis will always be around
	left_axis = new Rickshaw.Graph.Axis.Y.Scaled({
		element: document.getElementById('y_axis'),
		graph: graph,
		orientation: 'left',
		tickFormat: Rickshaw.Fixtures.Number.formatBase1024KMGTP_round,
		scale: left_scale
	});


	// Right Y-Axis will sometimes be here
	if (!noRight()) { 
	right_axis = new Rickshaw.Graph.Axis.Y.Scaled({
		element: document.getElementById('y_axis_right'),
		graph: graph,
		grid: false,
		orientation: 'right',
		tickFormat: Rickshaw.Fixtures.Number.formatBase1024KMGTP_round,
		scale: right_scale
	})
	};

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
		element: $('#slider')[0]
	});


	// Custom Legend
	var legend = document.querySelector("#legend")
	var legend_right = document.querySelector("#legend_right")

	function generate_legend(date, v) {

		header  = "<table>"//<tr><td colspan=3>" + date + "</td></tr>"
		left = []; 
		right = [];
		
		for (var i = 0; i < v.length; i++) { 
			d = v[i]
			swatch = "<div class='swatch' style='background-color: " + d[2] + "'></div>"
			d[0] = d[0].split("~").join("<br/>").split(",").join("<br/>")
			isRight(i) ?
				right.push("<tr><td>"+[swatch, d[0], d[1], left_links[i]].join("</td><td>") + "</td></tr>")
				: left.push("<tr><td>"+[swatch, d[0], d[1], right_links[i]].join("</td><td>") + "</td></tr>")
			
		}
		legend.innerHTML = header + left.join("</td></tr>") + "</table>"
		legend_right.innerHTML = header + right.join("</td></tr>") + "</table>"
	}

		// Initial Labels with no values
	fake_label = []
	for (i = 0; i < metrics.length; i++) {
		fake_label.push([metrics[i], "", colours[i]])
	}
	generate_legend("&nbsp;", fake_label)

	// Overload HoverDetail so it populates our legend dynamically
	var Hover = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {
		render: function (args) {

			date = d3.time.format("%a, %d %b %Y %H:%M:%S")(new Date(args.domainX * 1000)) //args.formattedXValue;
			v = []
		/*sort(function (a, b) {return a.order - b.order})*/
			args.detail.forEach(function (d) {
				v.push([d.name, d.formattedYValue, d.series.color])

				// Highlight selected datapoints
				var dot = document.createElement('div');
				dot.className = 'dot';
				dot.style.top = graph.y(d.value.y0 + d.value.y) + 'px';
				dot.style.borderColor = d.series.color;

				this.element.appendChild(dot);
				dot.className = 'dot active';
				this.show();
			}, this);
			generate_legend(date, v)
		}
	});

	// Call the cover function
	var hover = new Hover({
		graph: graph
	});
}

function updateStacked() {
	intervalID = setInterval(function (d) {

		now = parseInt(Date.now() / 1000)
		span = (gon.stop - gon.start)

		$.each(gon.metrics, function (i, metric) {
			if (metric.live) {
	                        update = metricURL(metric.feed,now-span,now,gon.step)

				$.getJSON(update, function (d) {
					if (d.error) {
						renderError("flash", "update returned an error on update", d.error);
						stopUpdates();
						return false
					}
					if (d.length == 0) {
						renderError("flash", "no data returned from endpoint on update", update);
						stopUpdates();
						return false
					}
					graph.series[i].data = d
					graph.render()
				})
			}
		})

	}, gon.step * 1000)
	return intervalID
}
