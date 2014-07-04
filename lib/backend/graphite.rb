# Required config/settings.yml > backend > settings parameters: 
#  url - the graphite instance url. 
require 'net/http'

class Backend::Graphite < Backend::GenericBackend

	def initialize params={}
		@alias = params[:alias] || self.class.name.split("::").last
		@base_url = params[:url]
		raise Backend::Error, "Must provide a url value" if @base_url.nil?
	end

	def get_metrics_list
		json_metrics_list "#{@base_url}/metrics/index.json"
	end

	def get_metric m, start=nil, stop=nil, step=nil, args={}
		url = 	@base_url + 
			"/render?target=" + m + 
			"&from=#{start}" +
			"&until=#{stop}" +
			"&format=json"

		# Graphite requires summation -- TODO differenciate between sums and counters?
		url.gsub!(m, "summarize(#{m},'#{step}sec','avg')") if step

		if args[:return_url]
			return url
		end

		# Graphite errors are python stack dumps, so let's parse out what we need
		parse = lambda{|v| v.split("\n").select{|i| i[/^Exception/]}.join("\n").gsub("&#3  9;","'")}

		stats = json_metrics url, {error_parse: parse}
	
		raise Backend::Error, "No data available for metric #{m}" if stats == []

		metric = []
		stats[0][:datapoints].each do |node|
			#because Graphite does [value,epoch], instead of the more sane [epoch,value]
			metric << {x: node[1], y: node[0] } 
		end

		points = (stop - start)/step

		return metric.take(points)
	end
end

