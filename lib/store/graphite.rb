require 'net/http'

# Class for extracting data from Graphite (https://github.com/graphite-project/graphite-web)
class Store::Graphite < Store::Store

	def initialize origin,settings
		super
		@base_url = mandatory_param :url, "store_settings"
	end

	# Return Graphite's internal metrics list
	def get_metrics_list
		json_metrics_list "#{@base_url}/metrics/index.json"
	end

	# For a given metric, return a Graphite json feed URL
	def get_metric_url metric, start=nil, stop=nil, step=nil
		m = metric.metric_id
		url = 	@base_url + 
			"/render?target=" + m + 
			"&from=#{start}" +
			"&until=#{stop}" +
			"&format=json"

		# Graphite requires summation -- TODO differenciate between sums and counters?
		url.gsub!(m, "summarize(#{m},'#{step}sec','avg')") if step

		return url
	end

	# Retrieve data for a graphite metric
	def get_metric metric, start=nil, stop=nil, step=nil
		url = get_metric_url metric,start,stop,step
		m = metric.metric_id

		# Graphite errors are python stack dumps, so let's parse out what we need
		parse = lambda{|v| v.split("\n").select{|i| i[/^Exception/]}.join("\n").gsub("&#3  9;","'")}

		stats = json_metrics url, {error_parse: parse}
	
		raise Store::Error, "No data available for metric #{m}" if stats == []

		metric = []
		stats[0][:datapoints].each do |node|
			#because Graphite does [value,epoch], instead of the more sane [epoch,value]
			metric << {x: node[1], y: node[0] } 
		end

		# Ensure a hard limit on the size of the array before returning
		points = (stop - start)/step
		return metric.take(points)
	end
end

