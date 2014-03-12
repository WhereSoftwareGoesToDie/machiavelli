// Stacked Graph Type Javascript
//
//
var dataChart = []

	function getMetrics(metrics) {
		$.each(metrics, function (i, d) {

			feed = metricURL(gon.metrics[i].feed, gon.start, gon.stop, gon.step)
			$.getJSON(feed, function (data) {
				if (data.error) {
					renderError("chart", data.error);
					stopUpdates();
					return false
				}
				if (data.length == 0) {
					renderError("chart", "renderStacked(): no data returned from endpoint: " + feed);
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

function renderStacked(data) {

	var palette = new Rickshaw.Color.Palette({
		scheme: "munin"
	})

	colours = [];
	scales = [];

	// Get domain for each scale - the max and min y point
	for (_k = 0, _len1 = data.length; _k < _len1; _k++) {
		series = data[_k].data
		min = Number.MAX_VALUE;
		max = Number.MIN_VALUE;
		for (_l = 0, _len2 = series.length; _l < _len2; _l++) {
			point = series[_l];
			min = Math.min(min, point.y);
			max = Math.max(max, point.y);
		}
		colours.push(palette.color())
		scales.push([min, max]);
	}

	// Attempt consolidation of scales
	// Generate a unique set of scales, and a set of scales in a 1-to-1 array for
	// each metric
	function overlap(a, b) {
		return (Math.max(a[0], b[0]) < Math.min(a[1], b[1]))
	}

	function merge_ranges(a, b) {
		return [Math.min(a[0], b[0]), Math.max(a[1], b[1])]
	}

	_new = [];
	_copy = scales.slice(0) /*copy*/ ;
	uniq_scales = scales

	if (scales.length > 2) {
		for (i = 0; i < scales.length - 1; i++) {
			for (j = 1; j < scales.length; j++) {
				if (i != j) {
					a = scales[i];
					b = scales[j]
					if (overlap(a, b)) {
						c = merge_ranges(a, b)
						scales[i] = c
						scales[j] = c
						_copy[i] = null;
						_copy[j] = null;
						_new.push(c)
					}
				}
			}
		}

		// Workout a set of unique scales
		_copy = _.compact(_copy)
		_new2 = _.map(_new, function (d) {
			return "" + d[0] + "|" + d[1]
		})
		_cpy2 = _.map(_copy, function (d) {
			return "" + d[0] + "|" + d[1]
		})

		uniq_scales = _.map(_.unique(_.compact(_new2.concat(_cpy2))), function (d) {
			return d.split("|")
		})
	}

	// Make d3 scales for each scale array
	d3_scale = [];
	$.each(scales, function (i, d) {
		d3_scale.push(d3.scale.linear().domain([d[0], d[1]]).nice())
	})
	uniq_d3_scale = [];
	$.each(uniq_scales, function (i, d) {
		uniq_d3_scale.push(d3.scale.linear().domain([d[0], d[1]]).nice())
	})


	// Push scales and their metrics into a rickshaw-eatable array
	series = []
	for (n = 0; n < data.length; n++) {
		series.push({
			color: colours[n],
			data: data[n].data,
			name: data[n].name,
			scale: d3_scale[n],
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
	axis0 = new Rickshaw.Graph.Axis.Y.Scaled({
		element: document.getElementById('axis0'),
		graph: graph,
		orientation: 'left',
		scale: uniq_d3_scale[0],
		tickFormat: Rickshaw.Fixtures.Number.formatKMBT
	});


	// Make a right y-axis for each other metric
	if (uniq_scales.length > 1) {
		for (n = 1; n < uniq_scales.length; n++) {
			axis = "axis" + n
			new Rickshaw.Graph.Axis.Y.Scaled({
				element: document.getElementById(axis),
				graph: graph,
				grid: false,
				orientation: 'right',
				scale: uniq_d3_scale[n],
				tickFormat: Rickshaw.Fixtures.Number.formatKMBT
			});
		}
	}

	// One X-axis for time
	new Rickshaw.Graph.Axis.Time({
		graph: graph,
		timeFixture: new Rickshaw.Fixtures.Time.Local()
	});

	/////
	graph.render();

	// X-axis slider for zooming
	new Rickshaw.Graph.RangeSlider({
		graph: graph,
		element: $('#slider')
	});


	// Custom Legend
	var legend = document.querySelector("#legend")

		function generate_legend(date, v) {
			legend.innerHTML = "<table><tr><td colspan=3>" + date + "</td></tr>" + $.map(v, function (d) {
				return "<tr><td><div class='swatch' style='background-color: " + d[2] + "'></div></td>" + "</td><td>" + d[0] + "</td><td> " + d[1] + "</td></tr>"
			}).join("</td></tr>")

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
			args.detail.sort(function (a, b) {
				return a.order - b.order
			}).forEach(function (d) {
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
	pad = []
	for (i = 0; i < uniq_scales.length; i++) {
		pad.push(1)
	}

	// For each metric scale, check which unique -- and visible -- scale it matches
	// Then, make a matching swatch of the line colour, for readability
	for (i = 0; i < scales.length; i++) {
		for (j = 0; j < uniq_scales.length; j++) {
			res = scales[i][0] + "|" + scales[i][1] == uniq_scales[j][0] + "|" + uniq_scales[j][1]
			if (res) {
				ax = document.getElementById("axis" + j + "_stub")
				ax.innerHTML += "<div class='swatch_line' style='background-color: " + colours[i] + "; left: " + (pad[j] * 3 - 3) + "px'></div>"
				pad[j]++
			}
		}
	}
	document.getElementById("axis0").setAttribute("style", "left: -" + (pad[0] * 3 - 6) + "px")

	for (j = 1; j < uniq_scales.length; j++) {
		document.getElementById("axis" + j).lastChild.setAttribute("style", "left: " + (pad[j] * 3 - 3) + "px")
	}

}

function updateStacked() {
	intervalID = setInterval(function (d) {

		now = parseInt(Date.now() / 1000)

		$.each(gon.metrics, function (i, metric) {
			if (metric.live) {
				update = metricURL(metric.feed, now - gon.step, now, gon.step)

				$.getJSON(update, function (d) {

					if (d.error) {
						renderError("flash", d.error);
						stopUpdates();
						return false
					}
					if (d.length == 0) {
						renderError("flash", "renderStacked(): no data returned from endpoint: " + update);
						stopUpdates();
						return false
					}
					graph.series[i].data.shift()
					graph.series[i].data.push(d.slice(-1)[0])
					graph.render()
				})
			}
		})

	}, gon.step * 1000)
	return intervalID
}
