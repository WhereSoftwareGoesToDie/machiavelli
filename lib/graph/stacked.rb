# Stacked Rickshaw
class Graph::Stacked < Graph::GenericGraph

	def self.view
		"stacked"
	end

	def self.parse_metric m, metric
		[{ name: m, data: metric }]
	end
end
