# Flatfile - ideally a CSV of `time,value\n`
class Store::Flatfile < Store::Store

	# Initalize and get settings
	def initialize origin, settings
		super
		@file      = mandatory_param :file_name, "store_settings"
		@metric    = mandatory_param :metric, "store_settings"
		@delimiter = optional_param  :delimiter, ",", "store_settings"

		@base_url  = @file #synonym for is_up error msg
	end

	# Raise an error if the file doesn't exist
	def test_file
		raise Store::Error, "Error: file #{@file} does not exist" unless is_up?
	end

	# In lieu of pinging a href, confirm the existance of the file
	def is_up?
		File.exists?(@file)
	end

	# Flat files don't auto update, therefore cannot be assumed to be live
	def live?
		false
	end

	# In lieu of querying an endpoint, confirm the file exists, and return the metric from the settings
	def get_metrics_list
		test_file
		[@metric]
        end

	# In lieu of a href, use a file locator
	def get_metric_url m, start,stop,step
		 return "file://#{Rails.root}/#{@file}"

	end

	# Traverse the file for the parameters given
        def get_metric m, start=nil, stop=nil, step=nil
		test_file

		data = []
		File.open(@file).each_line do |line|
			x, y = line.split(@delimiter)
			data << {x: x.to_i, y: y.to_f} if x.to_i.between?(start, stop)
		end

		raise Store::Error, "No data for #{m.metric_id} within selected time period" if data == []

		if @settings.store_settings.interpolate
                        interpolate(data, start, stop, _step).to_json
                else
                        data.to_json
                end
        end
end
