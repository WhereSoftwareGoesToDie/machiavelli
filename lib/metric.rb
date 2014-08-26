# The metric object
#   - A `metric` represents a stream of data collected from a `source` and stored in a `store`
class Metric
	include Helpers

	# Take all the YAML file settings, and store them more user friendly forms
	def initialize metric
		metric_id = get_id metric
		@origin_id, @metric_id = metric_id.split(SEP)
		@settings = origin_settings(@origin_id).last
		@store = Object.const_get(@settings.store).new @origin_id, @settings
		@source = Object.const_get(@settings.source).new 
	end

	# origin_id accessor function
	def origin_id
		@origin_id
       	end

	# metric_id accessor function
	def metric_id
	       	@metric_id
       	end

	# source accessor function
	def source
		@source
	end

	# Get the human readable metric title from the available metadata, and prepend the title, or the origin_id
	def titleize
		meta = @source.titleize metadata
		return "#{@settings.title || @origin_id} - #{meta}"
	end

	# Generate the metric controller feed for the metric	
	def feed
		"/metric/?metric=#{@origin_id}#{SEP}#{@metric_id}"
	end

	# metadata accessor function, but generate it only once
	def metadata
		if @metadata.nil?
			@metadata = @store.metadata @metric_id
		end
		return @metadata
	end
	
	# Use the store to generate the metric's external url
	def get_metric_url start, stop, step
		@store.get_metric_url self, start, stop, step
	end
	
	# Use the store to pull data for the metric
	def get_metric start, stop, step
		@store.get_metric self, start, stop, step
	end

	# Use the store to generate a nice html table for the metadata 
	def metadata_table
		@store.metadata_table metadata
	end
	
	# Use the store to query about the liveliness of the metric
	def live?
		@store.live?
	end
	
	# id accessor method, which leverages a builder function
	def id
		build_id
	end

	# build the metric's unique identifer, using the global variables if none are provided
	def build_id o=@origin_id, m=@metric_id
		"#{o}#{SEP}#{m}"
	end

	# Given an id, metadata string or metric_id, return the metric's id
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

	# True if Locator16~HashIdentifer (from anchor/vaultaire-common)
        def is_id? str
                match = [KVP,DELIM]
                return false if match.any? {|w| str.include? w}
                return true
        end

	# True if it contains keys and values and delimiters
        def is_metadata? str
                match = [KVP,DELIM]
                return true if match.any? {|w| str.include? w}
                return false
        end

        # True if hashIdentifier only (from anchor/vaultaire-common)
        def is_metric_id? str
                match = [KVP,DELIM,SEP]
                return false if match.any? {|w| str.include? w}
                return true
        end
end
