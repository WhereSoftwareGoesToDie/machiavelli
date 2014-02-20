class Graph::GenericGraph
#Making a new graph type? Copy these functions!
	
	# Given a metric name and a series of x:y datapoints, format the metric
	# however the graphing library requires it. 
	def self.parse_metric name, metric
		raise NotImplementedError
	end

	# The name of the view in `app/views/graphs/` to render for this chart
	# type. That view can incorporate it's own partials, if required.
	def self.view
		raise NotImplementedError
	end

end
