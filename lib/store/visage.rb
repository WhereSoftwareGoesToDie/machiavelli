# Store reader for Visage (https://github.com/auxesis/visage) 
#
# NOTICE this implementation is incomplete. See inline TODO's
#
class Store::Visage < Store::Store
	include Helpers

	def initialize origin, settings
		super
		@base_url = mandatory_param :host, "store_settings"
		@hosts_limit = optional_param :hosts_limit, -1, "store_settings"
	end

	# Use basic get_metrics_list and search via redis for sanity
	def get_metrics_list
		uri = "#{@base_url}/data"
		results = json_metrics_list uri
		list = []
		results[:hosts][0..@hosts_limit].each {|h|
			host_results = json_metrics_list "#{uri}/#{h}/"
			list << host_results[:metrics].map{|r| "#{h}/#{r}"}
		}
		return list.flatten
	end

	# Generate the url for the datastream for a given metric
	def get_metric_url m, start, stop, step
		query = []

		query << "start=#{start}"
		query << "finish=#{stop}"
		query << "resolution=#{step}"

		query_string =  "?" + query.join("&")

		uri = "#{@base_url}/data/#{m.metric_id}#{query_string}"

		return uri
	end

	# Get the metric data from sieste/vaultaire, and do some basic validations on the result
	def get_metric m, start, stop, step
		data = json_metrics get_metric_url(m, start, stop, step)
		
		# Return structure is a nested hash labeled in segments from the metric name
		# We want just the internal nest of value > data for parsing
		key = m.metric_id; 
		*key, last = key.split("/").map{|b| b.to_sym}
		nice_data = key.inject(data, :fetch)[last] #[:value][:data]

		# So sometimes, visage likes to return multiple metrics. 
		# I have no idea what to do about this yet, so TODO, and failout nicely for now. 		
		unless nice_data.keys.length == 1
			return {error: "Machiavelli can't yet parse a Visage metric with multiple keys: #{nice_data.keys}" }
		end

		# Points are now a long list of y values with a common step. 
		# So, parse it out into a nice array of x,y hashes
		# TODO validate step logic and output, 'resolution' in visage seems a bit.. off.. 
		xy_data = []
		point_data = nice_data[nice_data.keys[0].to_sym][:data]
		(start..stop).step(step).each_with_index { |x, i|
			xy_data <<  {x: x, y: point_data[i]}
		}

		data_sanitize xy_data, start, stop, step
	end
end
