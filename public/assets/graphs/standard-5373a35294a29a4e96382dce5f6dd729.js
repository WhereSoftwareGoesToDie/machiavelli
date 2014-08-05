var graph=[];
var data;

initProgress();

function renderStandard(index) { 
	update = metricURL(gon.metrics[index].feed, gon.start, gon.stop, gon.step);
                
	$.getJSON(update, function(data) {
		var chart = "chart_" + index;
		var yaxis = "y_axis_" + index;
		if (data.error) { 
			renderError(chart, data.error, null, gon.metrics[index].removeURL); 
			stopAll(); 
			graphDone();
			return false;
		} 
		if (data.length === 0) { 
			renderError(chart, errorMessage.noData, null, gon.metrics[index].removeURL);
			stopAll(); 
			graphDone();
			return false;
		}
		graph[index] = new Rickshaw.Graph({
			element: document.getElementById(chart),
			width: 700,
			height: 200,
			renderer: 'line',
			series: [{data: data, color: color[index]}]
		});

		min = Number.MAX_VALUE; max = Number.MIN_VALUE;
		for (i = 0; i < data.length; i++) {
			if (typeof data[i].y === "number") { 
				min = Math.min(min, data[i].y);
				max = Math.max(max, data[i].y);
			}
		}
		if (min == Number.MAX_VALUE) { min=0; max=0; }

		graph[index].configure({min: min - 0.5, max: max + 0.5});
		if (gon.metrics[index].metric.indexOf("uom:c") != -1 )  { 
			graph[index].configure({interpolation: 'step'});
		}

		new Rickshaw.Graph.Axis.Y( {
			graph: graph[index],
			orientation: 'left',
			interpolate: 'monotone',
		   	pixelsPerTick: 30,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT_round,
			element: document.getElementById(yaxis)
		} );

		new Rickshaw.Graph.Axis.Time({
			graph: graph[index],
			timeFixture: getTimeFixture()
		});

		dynamicWidth(graph[index]);
		graph[index].render();
		
		new Rickshaw.Graph.HoverDetail({
			graph: graph[index],
			formatter: function (series, x, y) {
				content = "<span class='date'>"+ getD3Time(x) +"</span><br/>"+formatData(y);
				return content;
			}
		});

		graph[index].render();

		unrenderWaiting(chart);
		graphDone();
	});
}

function updateStandard(){ 
	id = setInterval(function() { 		
		now = parseInt(Date.now()/1000);
		span = (gon.stop - gon.start);

		$.each(gon.metrics, function(i, metric) { 
			if (metric.live) { 

				update = metricURL(metric.feed,now-span,now,gon.step);
				$.getJSON(update, function(d){
					if (d.error) { 
						renderError("flash", d.error); stopAll(); 
						return false;
					} 
					if (d.length === 0) {
						renderError("flash", errorMessage.noData); stopAll(); 
						return false;
					}
					graph[i].series[0].data = d;
					graph[i].render();
				});
			}
		});
	}	, gon.step*1000);
	return id;
}


var complete = 0;
var slider; 

function graphDone() { 
	complete++;
	updateProgress()

        // Render the multiple graph slider only when all the graphing operations have been completed.
        if (complete == gon.metrics.length) { 
		doneProgress(); //force
		slider = new Rickshaw.Graph.RangeSlider.Preview({ 
			graphs: clean(graph, undefined), 
			height: 30,
			element: document.getElementById("multi_slider")
		});
	}
}
;
