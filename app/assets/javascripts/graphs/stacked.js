// Stacked Graph Type Javascript
//
//
var dataChart = []
var i;
var flag; 
	function getMetrics(metrics,_flag) {
		flag = _flag
		dataChart = new Array(metrics.length)
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
				i = $.map(gon.metrics,function(d){ return d.metric}).indexOf(d)

				dataChart[i] = {data: data, name: d}
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
		if (data[n].name.indexOf("uom:c") != -1 ) { inter = "step"} else { inter = "cardinal" }
		series.push({
			color: colours[n],
			data: data[n].data,
			name: data[n].name,
			interpolation: inter,
			scale: scale
		})
	}

	// Finally, make the chart
	interpolate = "cardinal"
	if (flag = "xkcd") { interpolate = "xkcd" }
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
	        height: 30,
		element: $('#slider')[0]
	});


	// Custom Legend
	var legend = document.querySelector("#legend-dual")

	function divme(className, inner) { 
		var x = document.createElement("div")
		x.className = className
		x.innerHTML = inner
		return x
	} 

	function generate_legend(date, v) {
		legend.innerHTML = ""

		date = divme("legend-date", date)
		
		left = []; 
		right = [];
		
		for (var i = 0; i < v.length; i++) { 
			d = v[i]

			label = divme("legend_label", "")
			swatch = divme("legend-swatch","")
			swatch.style.backgroundColor = d[2]
			metric = divme("legend-metric",d[0])
			data = divme("legend-data",d[1])
			
			label.appendChild(swatch)
			label.appendChild(metric)
			label.appendChild(data)
			
			if (isRight(i)) { 
				icon = "icon-arrow-left"
				el = right
				tip = "Jump metric to the left axis"
				ref = left_links[i]
			} else { 
				icon = "icon-arrow-right"
				el = left
				tip = "Step metric to the right axis"
				ref = right_links[i]
			}
			
			//link = "<a href='"+ref+"'> "+ "<i class='"+icon+"'></i>" +"</a>"
			link = "<a href='"+ref+"' data-toggle='tooltip-shuffle' data-original-title='"+tip+"'> <i class='"+icon+"'> </a>"
			shuffle = divme("legend-shuffle",link)
			label.appendChild(shuffle)
			el.push(label)
	
		}

		legend.appendChild(date)

		a = divme("legend-indent","")
		for (var i = 0; i < left.length; i++) { 
			a.appendChild(left[i])
		} 
		legend.appendChild(a)

		b = divme("legend-indent","")
		for (var i = 0; i < right.length; i++) { 
			b.appendChild(right[i])
		} 
		legend.appendChild(b)

		$("[data-toggle='tooltip-shuffle']").tooltip({ placement: "bottom", container: "body", delay: { show: 500}}) 
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
