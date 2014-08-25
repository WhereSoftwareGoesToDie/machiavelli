class Metric
	def initialize metric
		@origin_id, @metric_id = metric.split(SEP)
		@settings = Settings.origins[@origin_id]
		@store = Object.const_get(@settings.store).new @settings.store_settings
		@source = Object.const_get(@settings.source).new 
	end

	def origin_id; @origin_id; end
	def metric_id; @metric_id; end

	def titleize
		meta = @source.titleize metadata
		return "#{@origin_id} - #{meta}"
	end

	def counter?
		@store.counter?
	end

	def source
		@source
	end
	
	def feed
		"/metric/?metric=#{@origin_id}#{SEP}#{@metric_id}"
	end

	def metadata
		if @metadata.nil?
			@metadata = @store.metadata @metric_id
		end
		return @metadata
	end
	
	def get_metric_url start, stop, step
		@store.get_metric_url self, start, stop, step
	end
	
	def get_metric start, stop, step
		@store.get_metric id, start, stop, step
	end

	def metadata_table
		@store.metadata_table metadata
	end
	
	def id
		"#{@origin_id}#{SEP}#{@metric_id}"
	end

	def live?
		@store.live?
	end

	# Locator16~Word62
        def is_origin_id? str
                match = [KVP,DELIM]
                return false if match.any? {|w| str.include? w}
                return true
        end

        def is_metadata? str
                match = [KVP,DELIM]
                return true if match.any? {|w| str.include? w}
                return false
        end

        # Word62 only   
        def is_id? str
                match = [KVP,DELIM,SEP]
                return false if match.any? {|w| str.include? w}
                return true
        end
		
end
