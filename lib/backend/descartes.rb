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
	def search_metric_list q, page
		uri = "#{@base_url}/simple/search?origin=#{@origin}&q=#{q}&page=#{page - 1}"
		result = get_json uri
		result.map{|x| "#{@alias}#{SEP}#{to_mach(x)}"}
	end

	def to_des m;  m.gsub(":",SEP); end
	def to_mach m; m.gsub(SEP,":"); end 

        def get_metric m, start, stop, step
		query = []
		m = to_des(m)
		query << "start=#{start - 200}" 
		query << "end=#{stop + 10}"
		query << "interval=#{step}"
		query << "origin=#{@origin}"

		replace = [ ["/", "%2f"], ["_","%5f"]]
		replace.each { |r| m.gsub!(r[0], r[1]) } # TODO make metrics not have to be manhandled back into quasi-encoded status
		
		query_string = "?" + query.join("&")
	
		uri = "#{@base_url}/interpolated/#{m}#{query_string}"

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

		if data.empty? then
			raise Backend::Error, "No data returned from descartes query. URI: #{uri}"
		end

		if stop - start == step then
			# only one point required so get next closest to start
			return [metric.select{|a| a[:x] >= start}.first]
		end

		# Walk though the retrieved dataset for the times are assume to
		# get. Add a nil value if the date we aren't for isn't in the set.
		padded = []
		dindex = metric.find_index{|a| a[:x] >= start}
		dstart = metric[dindex][:x]
		xs = 0
		points = (stop - start) / step - 1

		points.times do |n|
			m = metric[dindex + n]
			x =  dstart + (step * xs)
			y = nil

			if m and (m[:x] == dstart + (step * xs)) then
				y = m[:y]
			end

			padded << {x: x, y: y}

			xs += 1
		end
		padded
        end

	def get_json url 
		uri = URI.parse(url)
		puts uri if Rails.env.development?
		http = Net::HTTP.new(uri.host, uri.port)
		result = http.get uri.request_uri
		JSON.parse(result.body, :symbolize_names => true)
	end
end
