# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the descartes backend
# #  origin - the origin for the data (BETA)

#require 'open-uri'
require 'net/http'
class Backend::Descartes < Backend::GenericBackend

        def initialize params={}
		@alias = params[:alias] || self.class.name.split("::").last
                @base_url = params[:url]
                raise Backend::Error, "Must provide a url value" if @base_url.nil?
                @origin = params[:origin]
                raise Backend::Error, "Must provide an origin value" if @origin.nil?
        end

	# Descartes don't need no storage
        def get_metrics_list
		return []
        end

	# Descartes is dynamic, yo
	def search_metric_list q
		uri = "#{@base_url}/simple/search?origin=#{@origin}&q=#{q}"
		result = get_json uri
		result.map{|x| "#{@alias}:#{x}"}
	end

        def get_metric m, start, stop, step
		query = []
		query << "start=#{start}" 
		query << "end=#{stop}"
		query << "interval=#{step}"
		query << "origin=#{@origin}"

		replace = [ ["/", "%2f"], ["_","%5f"]]
		replace.each { |r| m.gsub!(r[0], r[1]) } # TODO make metrics not have to be manhandled back into quasi-encoded status
		
		query_string = "?" + query.join("&")
	
		uri = "#{@base_url}/interpolated/#{m}#{query_string}"

		puts uri
		begin
			data = get_json uri
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, EOFError => e
			raise Backend::Error, "Error retreiving descartes metric #{m}: #{e} (full_url: #{@base_url}/interpolated/#{m}#{query_string})"
		end

		if (data.is_a? Hash) then
			if data[:error] then
				raise Backend::Error, "Descartes Exception raised: #{data[:error]}. uri: #{uri}"
			end
		end
			
		metric = []
		data.each do |node|
			metric << {x: node[0], y: node[1]}
		end

		padded = []
		(start..stop).step(step).each do |i|
			points = metric.select{|p| p[:x].between?(i, i+step-1)}
			if points.length == 1 then
				padded << points.first
			elsif points.length > 1 then
				binding.pry
			elsif points.length == 0 then
				padded << {x: i, y: (0.0/0.0)}
			end
		end

		padded
        end

	def get_json url 
		uri = URI.parse(url)
		http = Net::HTTP.new(uri.host, uri.port)
		result = http.get uri.request_uri
		JSON.parse(result.body, :symbolize_names => true)
	end

	def pretty_metric metric
		if @origin == "LMRH8C" || @origin ==  "R82KX1" then
			type, x = URI.decode(metric).split(":")

			keys = Hash[*x.split(",").map{|y| y.split("~")}.flatten]
			
			nice = [type]
			nice << keys["hostname"]
			nice << keys["service_name"] unless keys["service_name"] == "host"
			nice << keys["metric"]
		
			unit = case keys["uom"]
				when "Invalid", "NullUnit"; ""
				else " (#{keys["uom"]})"
			end

			return URI.decode(nice.join(" - ") + unit)

		elsif @origin == "4HXR1F" then
			type, x = metric.split(":")
			keys = Hash[*x.split(",").map{|y| y.split("~")}.flatten]
			nice = [type]
			nice << keys["ip"]
			nice << case keys["bytes"]
				when "rx"; " bytes received"
				else keys["bytes"]
			end
			return URI.decode(nice.join(" - "))
		else
			return metric
		end
	end
end
