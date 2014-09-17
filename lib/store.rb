# Parent Store class. Contains mostly defaults
class Store
	include Helpers

	# Store given settings into more user friendly forms
	def initialize origin, settings
		@settings = settings
		@origin_id = origin
	end

	# Stub for child class override
	def get_metric_url
		raise NotImplemented
	end

	# Stub for child class override
	def get_metrics_list
		raise NotImplemented
	end

	# Stub for child class override
	def get_metric
		raise NotImplemented
	end

	# Default: make a nice table. Override in child class for something more fancy 
	def metadata_table m
		'<p align="left">'+m.gsub(SEP, "<br>")+"</p>"
	end

	# Default: all child stores can be queried for 'live' updating of data. 
	# Override in child class if this is not the case
	def live?
		true
	end

	# Default: the metadata for a metric is itself.
	# Override in child class if this is not your way
	def metadata m
		m
	end

	# Default: Query a list of metrics for the store, and save them to redis
	# Override in child class if your metric list is too big, or not redis-ready
        def refresh_metrics_cache _alias=nil
                metrics = get_metrics_list
                
		r = redis_conn
                
		metrics.each {|m|
                        r.set "#{REDIS_KEY}:#{@origin_id}:#{m}", 1
                }
        end

	# Default: search redis (populated via `refresh_metrics_cache` for metrics
	# Override in child class to something dynamic if you do not leverage redis
	def search_metrics q, args={}
                raise Store::Error, "Unable to connect to #{@origin_id} backend at #{@base_url}" unless is_up?

		# TODO Pending redis pagination logic
                return [] if args[:page] and args[:page].to_i > 1

                r = redis_conn
                keys = r.keys "#{REDIS_KEY}:#{@origin_id}#{q}"
                keys.map!{|x|x.split(":").last}
                keys.map!{|x| "#{@origin_id}#{SEP}#{x}"}
                keys
        end

end

# Stores have the own errors!
class Store::Error < StandardError; end


