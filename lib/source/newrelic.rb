# Parent Collector Source class
# Use this class directly when the source does not need any overrides
class Source::Newrelic < Source::Source
	def titleize str
		metric, sub_type = str.split("-")
		return [metric, sub_type.titleize].join(" - ")
	end
end
