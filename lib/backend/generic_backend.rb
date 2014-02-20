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
	def get_metric m, _start=nil, _end=nil, options={}
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

##GLOBAL HELPER FUCTIONS (could probably live elsewhere)
        def to_epoch s
                return "" if s.nil?
                time_scale = (case s.tr("0-9","")
                        when "min"; "minutes"
                        when "h"; "hours"
                        when "d"; "days"
                        when "w"; "weeks"
                        end )
                eval("#{s.tr("a-z","")}.#{time_scale}.ago.to_i")
        end

        def to_seconds s
                return "" if s.nil?
                multi = (case s.tr("0-9","")
                         when "min"; 60
                         when "h"; 60*60
                         when "d"; 60*60*24
                         when "w"; 60*60*24*7
                         end)
                s.tr("a-z","").to_i * multi
        end	
end

class Backend::Error < StandardError; end
