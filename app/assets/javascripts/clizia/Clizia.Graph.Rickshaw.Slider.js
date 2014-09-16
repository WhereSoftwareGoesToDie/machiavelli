Clizia.Graph.Rickshaw.Slider = function (args) { 
	var that = {} 

	var defaults = { height: 30 }

	that.init = function(args) { 
		if (!args.element) { throw "Clizia.Slider requires an element to use" }
		that.element = args.element

		that.height = args.height || defaults.height
		that.length = args.length || 1 		
	}

	that.graphs = []

	that.failed = function(args) { 
		if (args.graph) { 
			console.log("Slider was informed that "+ args.graph + " failed. Decrease expected graph count.")
			that.length = that.length - 1; 
			that.render()
		} 
	} 

	that.render = function(args) {
		if (args) { 	
			if (args.graphs) { that.graphs.push(args.graphs) } 
		}

		if (!that.graphs) { throw "Clizia.Slider cannot render if no graphs" }

		if (that.length == that.graphs.length) { 
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

