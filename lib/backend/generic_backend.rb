# The Generic Definition of a Backend
# 
require 'redis'
require 'uri'
class Backend::GenericBackend

#Making a new backend? Copy these functions!

	# Pre-condition:  none
	# Post-condition: an array of strings of uniquely defined metrics
	def get_metrics_list
		raise NotImplementedError
	end

	def sep 
		#URI.decode("\u00BB")
		":"
	end

	def search_metric_list q
		r = redis_conn
		keys = r.keys "#{REDIS_KEY}:#{backend_key}#{q}"
		keys.map!{|x|x.split(":").last}
		keys.map!{|x| "#{@alias}#{sep}#{x}"}
		keys 
	end

	# Pre-condition: a metric name (an element of the `get_all_metrics` array)
	# Post-condition: a valid json hash of: 
	#    [ 
	#      	{ "x": epoch, "y": value },
	#      	{ "x": epoch, "y": value },
	#      	...
	#    ] 
	def get_metric m, start=nil, stop=nil, step=nil
		raise NotImplementedError
	end

	# Is the metric returning live data? That is, can it be assumed to have
	# data values up to Time.now() within step tolerance?
	def live?
		true
	end

	# Define any rules to make a metric name pretty. Default, do nothing. 
	def pretty_metric metric
		metric
	end

# Parent class functionality after this point

	REDIS_KEY = Settings.metrics_key || "Machiavelli.Metrics"
	
	def redis_conn
		host = Settings.redis_host || "127.0.0.1"
		port = Settings.redis_port || 6379
		Redis.new(host: host, port: port)
	end

	def get_cached_metrics_list
		redis_conn.keys "#{REDIS_KEY}*"
	end

	def delete_metrics_cache
		r = redis_conn
		keys = r.keys REDIS_KEY
		keys.each { |k| r.del k } 
	end

	def backend_key 
		@alias 
	end

	def refresh_metrics_cache _alias=nil
		metrics = self.get_metrics_list

		r = redis_conn
		
		metrics.each {|m|
			r.set "#{REDIS_KEY}:#{backend_key}:#{m}", 1
		}
	end

### Helper functions

end
class Backend::Error < StandardError; end
