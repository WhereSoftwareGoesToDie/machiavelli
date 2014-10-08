# Parent Collector Source class
# Use this class directly when the source does not need any overrides
class Source::Source
	def initialize origin_id, settings
		@origin_id = origin_id
		@settings = settings
	end

	# Add any source-specific metadata to the string
	def metaadd m
		return m
	end

	# Make the title of the graph human-readable
	# Default: return the string itself as the title
	def titleize str
		return str
	end
end
