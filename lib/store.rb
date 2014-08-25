class Store
	include Helpers

	def initialize origin, settings
		@settings = settings
		@origin_id = origin
	end

	def get_metric_url
		raise NotImplemented
	end

	def metadata_table m
		'<p align="left">'+m.gsub(SEP, "<br>")+"</p>"
	end

	def live?
		true
	end

	def get_metrics_list
		raise NotImplemented
	end

	def get_metric
		raise NotImplemented
	end
	
        def refresh_metrics_cache _alias=nil
                metrics = get_metrics_list
                
		r = redis_conn
                
		metrics.each {|m|
                        r.set "#{REDIS_KEY}:#{@origin_id}:#{m}", 1
                }
        end

	# Search for metrics - defaults to searching Redis
	def search_metrics q, args={}
                raise Store::Error, "Unable to connect to #{@origin_id} backend at #{@base_url}" unless is_up?

                return [] if args[:page] and args[:page].to_i > 1

                r = redis_conn
                keys = r.keys "#{REDIS_KEY}:#{@origin_id}#{q}"
                keys.map!{|x|x.split(":").last}
                keys.map!{|x| "#{@origin_id}#{SEP}#{x}"}
                keys
        end

end
class Store::Error < StandardError; end


