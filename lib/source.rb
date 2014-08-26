# Parent Collector Source class
# Use this class directly when the source does not need any overrides
class Source
	def initialize source=nil
		@source = source
	end

	# Default: return the string itself as the title
	def titleize str
		return str
	end
end
