# Flatfiles are pretty broad, but at a basic level, they are just a
# list of x and y values. 
#
# 
# Required config/settings.yml > backend > settings parameters: 
#  - file_name - relative to the rails root folder. 
#  - metric    - the label for this data
#
#  optional parmeters
#  - `delimiter` - defaults to comma. 
#
#  The assumed file format is a list of x and y values in epoch, delimited by
#  the defined delimiter. 
#
#  sample file head: 
#
#  1392080000,100
#  1392080010,110
#  1392080020,120

class Backend::Flatfile < Backend::GenericBackend
	def initialize params={}
		@alias = params[:alias] || self.class.name.split("::").last
		@file      = params[:file_name]
		@metric    = params[:metric]
		@delimiter = params[:delimiter]  || ","
	end

	def live?
		false # Flat files don't auto update, therefore cannot be assumed to be live
	end

	def get_metrics_list
		raise Backend::Error, "File #{@file} does not exist" unless File.exists?(@file)
		[@metric]	
        end

        def get_metric m, start=nil, stop=nil, step=nil, args={}
		raise Backend::Error, "File #{@file} does not exist" unless File.exists?(@file)

		if args[:return_url]
			return "file://#{Rails.root}/#{@file}"
		end
		
		data = []
		File.open(@file).each_line do |line|
			x, y = line.split(@delimiter)
			data << {x: x.to_i, y: y.to_f} if x.to_i.between?(start, stop)
		end

		raise Backend::Error, "No data for #{m} within selected time period" if data == []

		filtered = []			
		
		# Attempt filtering of data as per the 3st parameters.
		(start..stop).step(step).each do |x|
			points = data.select{|p| p[:x].between?(x, x+step-1)}
			case
				when points.length == 1 then 
					filtered << {x: x, y: points[0][:y]}
				when points.length > 0 then 
					avg = points.map{|b| b[:y]}.inject{|a, b| a+b}.to_f / points.size
					filtered << {x: x, y: avg}
				when points.length == 0 then
					# no data within range, so give it a NaN
					filtered << {x: x, y: (0.0 / 0.0)}
			end
		end

		filtered
        end
end 
