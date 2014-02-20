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
		@file      = params[:file_name]
		@metric    = params[:metric]
		@delimiter = params[:delimiter]  || ","
	end
        
	def get_metrics_list
		[@metric]	
        end

        def get_metric m, _start=nil, _end=nil, options={}
		data = []
		s = to_epoch(_start)
		s = 0 if s == ""
		e = to_epoch(_end)
		e = Time.now().to_i if e == ""
		
	
		begin
			f = File.open(@file)
			f.each_line do |line|
				x, y = line.split(@delimiter)
				data << {x: x.to_i, y: y.to_f} if x.to_i.between?(s,e)
			end
		rescue ENOENT => e
			raise Backend::Error, e
		end

		raise Backend::Error, "No data for #{m} within selected time period" if data == []
		data
        end
end 
