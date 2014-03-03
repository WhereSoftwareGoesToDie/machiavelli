var graph=[]
var data;

function render_rickshaw(index) { 

	update = gon.feed[index]+"?start="+gon.start+"&stop="+gon.stop+"&step="+gon.step                               
                
        console.log(update)                                                                                            
	$.getJSON(update, function(data) {

		graph[index] = new Rickshaw.Graph({
			element: document.getElementById("chart_"+index),
			width: 700,
			height: 200,
			renderer: 'line',
			series: new Rickshaw.Series.FixedDuration([{name: "data" }], undefined, { 
				timeInterval: gon.step*1000,
				maxDataPoints: data.length, 
				timeBase: data[0].x  
			})
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

		$.each(data, function(i, point) {                                                                         
			x = {data: point.y} 
			graph[index].series.addData(x) //{name: gon.metric[index], data: point.y})
		})
		graph[index].render()

		unrenderWaiting();
		renderSlider();
	}) 
}

function updateRickshaw(){ 
	id = setInterval(function() { 		
		now = parseInt(Date.now()/1000)

		$.each(gon.feed, function(i, feed) { 
			update = feed+"?start="+(now-gon.step)+"&stop="+now+"&step="+gon.step

			$.getJSON(update, function(d){ 
				new_data = {data: d[d.length-1].y}
				graph[i].series.addData(new_data); 
				graph[i].render()
			})
		})
	}
	, gon.step*1000);
	return id
}

var complete = 0;
function renderSlider() { 
        complete++;

        // Render the multiple graph slider only when all the graphing operations have been completed.
        if (complete = gon.metric.length) { 
        new Rickshaw.Graph.RangeSlider({ 
                graph: graph, 
                element: $("#multi_slider")
                });
        }
}
