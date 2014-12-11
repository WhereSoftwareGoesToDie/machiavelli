Clizia.Graph.Rickshaw.Tealeaves = function(args) { 
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
			width: 348, 
			height: 100,
			interpolation: 'step-after',
			renderer: 'area', 
			series: [{ data: data, color: '#afdab1' }]
		});


		that.graph = graph;
		graph.render();

		container = $("#"+that.graph.element.id)
		container.append("<div class='overlay-name'>"+that.metric.title+"</div>")
		container.append("<div class='overlay-number'></div>")
		that.update_overlay()

		that.state({state: "complete"})
		that.metric_complete(); 
	} 

	that.update_overlay = function() { 
		last = that.graph.series[0].data[graph.series[0].data.length -1].y
		last = Math.round(last*1000)/1000	
		$("#"+that.graph.element.id).find(".overlay-number").text(last)
	}

	that.init(args)

	return that;
}
