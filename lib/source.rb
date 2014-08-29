# Parent Collector Source class
# Use this class directly when the source does not need any overrides
class Source
	def initialize origin_id, settings
		@origin_id = origin_id
		@settings = settings
	end

	# Default: return the string itself as the title
	def titleize str
		return str
	end
end
