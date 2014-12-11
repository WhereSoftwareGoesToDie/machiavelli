Clizia.Graph.Rickshaw.Standard = function(args) {
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

