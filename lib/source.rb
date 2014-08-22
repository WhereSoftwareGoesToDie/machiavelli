class Source
	def initialize source
		@source = source
	end

	def titleize str
		(Object.const_get @source).new.titleize str
	end

end
