# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the descartes backend
# #  origin - the origin for the data (BETA)

require 'open-uri'
class Backend::Descartes < Backend::GenericBackend

        def initialize params={}
                @base_url = params[:url]
                raise Backend::Error, "Must provide a url value" if @base_url.nil?
                @origin = params[:origin]
                raise Backend::Error, "Must provide an origin value" if @origin.nil?
        end

        def get_metrics_list
		begin
			uri = "#{@base_url}/simple/search?origin=#{@origin}"
			get_json uri
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, OpenURI::HTTPError => e
			raise Backend::Error, "Error retreiving descartes metrics list: #{e} -- #{uri}"
		end
        end

        def get_metric m, start=nil, stop=nil, step=nil
		query = []
		query << "start=#{start}"
		query << "stop=#{stop}"
		query << "step=#{step}"
		query << "origin=#{@origin}"

		query_string = "?" + query.join("&")

		begin
			get_json "#{@base_url}/interpolated/#{m}#{query_string}"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, OpenURI::HTTPError=> e
			binding.pry
			raise Backend::Error, "Error retreiving descartes metric #{m}: #{e}"
		end
        end

	def get_json uri 
		result = URI.parse(uri).read
		JSON.parse(result, :symbolize_names => true)
	end

end
