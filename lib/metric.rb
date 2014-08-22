class Metric
	def initialize metric
		@origin_id, @metric_id = metric.split(SEP)

		@settings = Settings.origins[@origin_id]
		@store = Store.new @settings
		@source = Source.new @settings.source
	end

	def titleize
		@source.titleize @metric_id
	end

	def id
		@metric_id
	end
end

