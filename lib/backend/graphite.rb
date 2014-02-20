require 'open-uri'


# Required config/settings.yml > backend > settings parameters: 
#  url - the graphite instance url. 


# Here be graphite hackery
class Backend::Graphite < Backend::GenericBackend

	def initialize params={}
		@base_url = params[:url]
		raise Backend::Error, "Must provide a url value" if @base_url.nil?
	end

	def get_metrics_list
		begin
			get_json "#{@base_url}/metrics/index.json"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
			raise Backend::Error, "Error retrieving Graphite metrics list: #{e}"
		end
	end

	def get_metric m, _start=nil, _end=nil, options={}
		from = ( _start.nil?  ? "-1h" : "-#{_start}" )

                if options[:datapoints]
                        step = to_seconds(_start) / options[:datapoints]
                        step = 1 if step == 0
                end

		uri = 	@base_url + 
			"/render?target=" + m + 
			"&from=" + from +
			"&format=json"

		# Because why cook when you can create?
		uri.gsub!(m, "summarize(#{m},'#{step}sec','avg')") if step

		begin
			stats = get_json uri
		rescue ArgumentError => e
			raise Backend::Error, "Graphite Exception raised: #{e}"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
			raise Backend::Error, "Error retrieving Graphite metric #{m}: #{e}"
		end
	
		raise Backend::Error, "No data available for metric #{m}" if stats == []

		metric = []
		stats[0]["datapoints"].each do |node|
			#because Graphite does [value,epoch], instead of the more sane [epoch,value]
			metric << {x: node[1], y: node[0] } 
		end

		metric
	end

	def get_json uri
		result = URI.parse(uri).read

		# Because asking for json return html if there's an error. 
		if result.include? "Exception"
			raise ArgumentError, result.split("\n").select{|i| i[/^Exception/]}.join("\n").gsub("&#39;","'")
		end
		
		JSON.parse(result)
	end
end

