class Graph::Rickshaw < Graph::GenericGraph

	def self.view
		"rickshaw"
	end

	def self.parse_metric m, metric
		[{ name: m, data: metric }]
	end

end
