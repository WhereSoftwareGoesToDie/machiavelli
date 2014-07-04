# A sample implementation of a simple backend. 
#
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
		json_metrics_list "#{@base_url}/source_list"
        end

        def get_metric m, start=nil, stop=nil, step=nil, args={}
	
		query = []
		query << "start=#{start}"
		query << "stop=#{stop}"
		query << "step=#{step}"

		query_string = "?" + query.join("&")

		uri = "#{@base_url}/source/#{m}#{query_string}"

		if args[:return_url]
			return uri
		end

		json_metrcs uri
        end
end
