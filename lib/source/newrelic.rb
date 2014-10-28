# Parent Collector Source class
# Use this class directly when the source does not need any overrides
class Source::Newrelic < Source::Source
	def titleize str
		metric, sub_type = str.split("-")
		metric =  metric.tr("_","/").tr(".",":")
		return [metric, sub_type.titleize].join(" - ")
	end
end
