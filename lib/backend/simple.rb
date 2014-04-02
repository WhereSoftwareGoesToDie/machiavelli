# A sample implementation of a simple backend. 


# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the simple backend (for sinatra, usually `http://localhost:4567`)
#

require 'open-uri'
class Backend::Simple < Backend::GenericBackend

        def initialize params={}
		@alias = params[:alias] || self.class.name.split("::").last
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

        def get_metric m, start=nil, stop=nil, step=nil
	
		query = []
		query << "start=#{start}"
		query << "stop=#{stop}"
		query << "step=#{step}"

		query_string = "?" + query.join("&")

		begin
			get_json "#{@base_url}/source/#{m}#{query_string}"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
			raise Backend::Error, "Error retreiving simple metric #{m}: #{e}"
		end
        end

	def get_json uri 
		result = URI.parse(uri).read
		JSON.parse(result, :symbolize_names => true)
	end

end
