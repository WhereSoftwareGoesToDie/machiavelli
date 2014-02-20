class Graph::Websocket < Graph::GenericGraph

	def self.view
		"websocket"
	end

	def self.parse_metric m, metric
		metric
	end

end
