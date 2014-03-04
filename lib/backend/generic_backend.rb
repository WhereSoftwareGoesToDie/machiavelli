# The Generic Definition of a Backend
# 
require 'redis'
class Backend::GenericBackend

#Making a new backend? Copy these functions!

	# Pre-condition:  none
	# Post-condition: an array of strings of uniquely defined metrics
	def get_metrics_list
		raise NotImplementedError
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

# Parent class functionality after this point

	REDIS_KEY = Settings.metrics_key || "Machiavelli.Backend.Metrics"
	
	def redis_conn
		host = Settings.redis_host || "127.0.0.1"
		port = Settings.redis_port || 6379
		Redis.new(host: host, port: port)
	end

	def get_cached_metrics_list
		redis_conn.smembers REDIS_KEY 
	end

	def delete_metrics_cache
		redis_conn.del REDIS_KEY
	end
	
	def refresh_metrics_cache _alias=nil
		metrics = self.get_metrics_list
		key = REDIS_KEY

		prefix = _alias || self.class.name.split("::").last
		r = redis_conn
		
		metrics.each {|m|
			r.sadd key, "#{prefix}:#{m}"
		}
	end

### Helper functions

end
class Backend::Error < StandardError; end
