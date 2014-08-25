require 'pry-debugger'
class Metric
	include Helpers
	def initialize metric
		metric_id = get_id metric
		@origin_id, @metric_id = metric_id.split(SEP)
		_, s = origin_settings @origin_id
		@settings = s
		@store = Object.const_get(s.store).new @origin_id, s
		@source = Object.const_get(s.source).new 
	end

	def origin_id; @origin_id; end
	def metric_id; @metric_id; end

	def titleize
		meta = @source.titleize metadata
		return "#{@settings.title || @origin_id} - #{meta}"
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
		@store.get_metric self, start, stop, step
	end

	def metadata_table
		@store.metadata_table metadata
	end
	
	def id
		build_id
	end

	def live?
		@store.live?
	end

	def build_id o=@origin_id, m=@metric_id
		"#{o}#{SEP}#{m}"
	end

	def get_id str
		return str if is_id? str
		if is_metadata? str
			if str.include? SEP
				# Origin~[meta]
				origin, str = str.split(SEP) 
			end
			@metadata = str
			# Split to get address, and rebuild
			keys = keysplit(str)
			return build_id origin, keys["address"]

		elsif is_metric_id? str
			return build_id @origin_id, str
		end
	end

	# Locator16~Word62
        def is_id? str
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
        def is_metric_id? str
                match = [KVP,DELIM,SEP]
                return false if match.any? {|w| str.include? w}
                return true
        end
end
