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
		query << "interval=#{step}"
		query << "origin=#{@origin}"

		query_string = "?" + query.join("&")
		
		begin
			data = get_json "#{@base_url}/interpolated/#{m}#{query_string}"
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, OpenURI::HTTPError=> e
			raise Backend::Error, "Error retreiving descartes metric #{m}: #{e}"
		end

		metric = []
		data.each do |node|
			metric << {x: node[0], y: node[1]}
		end
		metric
        end

	def get_json uri 
		puts "Loaded URI: #{uri}"
		result = URI.parse(uri).read
		JSON.parse(result, :symbolize_names => true)
	end

	def pretty_metric metric
		if @origin == "LMRH8C" || @origin ==  "R82KX1" then
			type, x = metric.split(":")
			keys = Hash[*x.split(",").map{|y| y.split("~")}.flatten]
			
			nice = [type]
			nice << keys["hostname"]
			nice << keys["service_name"] unless keys["service_name"] == "host"
			nice << keys["metric"]
			
			unit = case keys["uom"]
				when "Invalid", "NullUnit"; ""
				else " (#{keys["uom"]})"
			end

			return nice.join(" - ") + unit

		elsif @origin == "4HXR1F" then
			type, x = metric.split(":")
			keys = Hash[*x.split(",").map{|y| y.split("~")}.flatten]
			nice = [type]
			nice << keys["ip"]
			nice << case keys["bytes"]
				when "rx"; " bytes received"
				else keys["bytes"]
			end
			return nice.join(" - ")
		else
			return metric
		end
	end
end
