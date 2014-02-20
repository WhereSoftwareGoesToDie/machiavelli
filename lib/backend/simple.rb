# A sample implementation of a simple backend. 


# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the simple backend (for sinatra, usually `http://localhost:4567`)
#

require 'open-uri'
class Backend::Simple < Backend::GenericBackend

        def initialize params={}
                @base_url = params[:url]
                raise Backend::Error, "Must provide a url value" if @base_url.nil?
        end

        def get_metrics_list
		begin
			get_json "#{@base_url}/source_list"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
			raise Backend::Error, "Error retreiving simple metrics list: #{e}"
		end
        end

        def get_metric m, _start=nil, _end=nil, options={}
		if options[:datapoints]
			_step = to_seconds(_start) / options[:datapoints]
			_step = 1 if _step == 0
		end

		query = []
		query << "start=#{to_epoch(_start)}" unless _start.nil?
		query << "end=#{to_epoch(_end)}"     unless _end.nil?
		query << "step=#{_step}"             unless _step.nil?

		query_string = "?" + query.join("&")
		

		begin
			get_json "#{@base_url}/source/#{m}#{query_string}"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
			raise Backend::Error, "Error retreiving simple metric #{m}: #{e}"
		end
        end

	def get_json uri 
		puts uri
		result = URI.parse(uri).read
		JSON.parse(result, :symbolize_names => true)
	end

end
