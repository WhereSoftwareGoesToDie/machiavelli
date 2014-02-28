
function render_rickshaw(index, data) { 

	chart = "chart_"+index
	yaxis = "y_axis_"+index

	graph[index]= new Rickshaw.Graph({
                element: document.getElementById(chart),
                width: 700,
                height: 200,
                renderer: 'line',
                series: [{ color: "#cb513a", data: data }]
        });

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

        ///////
        graph[index].render();

        new Rickshaw.Graph.HoverDetail({ 
                graph: graph[index],
                formatter: function (series, x, y) {
                        return content = "<span class='date'>"+d3.time.format("%Y-%m-%d %H:%M:%S")(new Date(x*1000)) +"</span><br/>"+y
                }
	});


	unrenderWaiting();
	renderSlider();
}

