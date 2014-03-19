var graph=[]
var data;


function renderStandard(index) { 

	update = metricURL(gon.metrics[index].feed, gon.start, gon.stop, gon.step)
                
	$.getJSON(update, function(data) {
		if (data.error) { 
			renderError("chart_"+index, "error retreiving data from endpoint", data.error); stopAll(); return false
		} 
		if (data.length == 0) { 
			renderError("chart_"+index, "no data returned from endpoint", metricURL(gon.metrics[index].feed, gon.start, gon.stop, gon.step)); stopAll(); return false
		}
		graph[index] = new Rickshaw.Graph({
			element: document.getElementById("chart_"+index),
			width: 700,
			height: 200,
			renderer: 'line',
			series: [{data: data, color: palette.color()}   ]
		})

		chart = "chart_"+index
		yaxis = "y_axis_"+index

		new Rickshaw.Graph.Axis.Y( {
			graph: graph[index],
			orientation: 'left',
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			element: document.getElementById(yaxis)
		} );

		new Rickshaw.Graph.Axis.Time({
			graph: graph[index],
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		});

		graph[index].render()
		
		new Rickshaw.Graph.HoverDetail({
			graph: graph[index],
			formatter: function (series, x, y) {
				return content = "<span class='date'>"+d3.time.format("%Y-%m-%d %H:%M:%S")(new Date(x*1000)) +"</span><br/>"+y
			}
		});

		graph[index].render()

		unrenderWaiting();
		renderSlider();
	}) 
}

function updateStandard(){ 
	id = setInterval(function() { 		
		now = parseInt(Date.now()/1000)

		$.each(gon.metrics, function(i, metric) { 
			if (metric.live) { 
			update = metricURL(metric.feed,now-gon.step,now,gon.step)
			$.getJSON(update, function(d){ 
				if (d.error) { 
					renderError("flash", "error retrieving data from endpoint", d.error); stopAll(); return false
				} 
				if (d.length == 0) { 
					renderError("flash", "no data returned from endpoint", update); stopAll(); return false
				}
				new_data = {data: d[d.length-1].y}
				graph[i].series.addData(new_data); 
				graph[i].render()
			})
			}
		})
	}
	, gon.step*1000);
	return id
}


function clean (arr, deleteValue) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == deleteValue) {         
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};


var complete = 0;
function renderSlider() { 
        complete++;

        // Render the multiple graph slider only when all the graphing operations have been completed.
        if (complete = gon.metrics.length) { 
        new Rickshaw.Graph.RangeSlider({ 
                graph: clean(graph, undefined), 
                element: $("#multi_slider")
                });
        }
}
