Clizia.Graph.Rickshaw.Slider = function (args) { 
	var that = {} 

	var rickshaw_graphs = []

	var defaults = { height: 30 }

	that.init = function(args) { 
		if (!args.element) { throw "Clizia.Slider requires an element to use" }
		that.element = args.element

		that.height = args.height || defaults.height
				
	}

	that.graphs = []


	that.render = function(args) { 
		if (args.graphs) { that.graphs.push(args.graphs) } 

		if (!args.graphs) { throw "Clizia.Slider cannot render if no graphs" }

		if (that.slider) { 
			that.slider.delete
		} else { 
			that.slider = new Rickshaw.Graph.RangeSlider.Preview({
				graphs: that.graphs,
				height: that.height, 
				element: document.getElementById(that.element)
			})
			that.slider.render()
		} 
	}

	that.init(args) 
	return that;	
} 

