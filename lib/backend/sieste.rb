# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the sieste backend
# #  origin - the origin for the data (BETA)

#require 'open-uri'
require 'net/http'
class Backend::Sieste < Backend::GenericBackend

        def initialize params={}
		self.class.superclass.load_extension  self.class.name

		@alias = params[:alias] || self.class.name.split("::").last
                @base_url = params[:url]
                raise Backend::Error, "Must provide a url value" if @base_url.nil?
                @origin = params[:origin]
                raise Backend::Error, "Must provide an origin value" if @origin.nil?
        end

	# Sieste don't need no storage
        def get_metrics_list
		return []
        end

	# Sieste is dynamic, yo
	def search_metric_list q, args={}

		page = args[:page] || 1
		page_size = args[:page_size] || 25

		uri = "#{@base_url}/simple/search?origin=#{@origin}&q=#{q}&page=#{page - 1}&page_size=#{page_size}"
		result = get_json uri
		result.map{|x| "#{@alias}#{SEP}#{machiavelli_encode x}"}
	end

	# Convert a string into a uri-transferable sieste metric
	def sieste_encode m
		n = m.gsub(":",SEP)
		replace = [ ["/", "%2f"], ["_","%5f"]]
		replace.each { |r| n.gsub!(r[0], r[1]) }
		n
	end

	# Convert a sieste-encoded metric into a machiavelli one
	def machiavelli_encode m
		m.gsub(SEP,":")
	end

        def get_metric m, start, stop, step, args={}
		query = []

		# Sieste's identifcation string...
		# v1 - uri-encoded full string of metric
		# v2 - only requires the Address field, and optional is_float flag

		v2 = "#{DELIM}address#{KVP}"

		if m.include? v2
			key = m.split(DELIM).map{|a| a.split(KVP)}.flatten.select{|a| a[0] == "address"}
			m = key[1]
			float = true if keys["is_float"]
		else
			m = sieste_encode m
		end


		query << "start=#{start - 200}" 
		query << "end=#{stop + 10}"
		query << "interval=#{step}"
		query << "origin=#{@origin}"

		query << "as_double=true" if float

		query_string = "?" + query.join("&")
	
		uri = "#{@base_url}/interpolated/#{m}#{query_string}"

		if args[:return_url]
			return uri
		end

		begin
			data = get_json uri
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, EOFError => e
			raise Backend::Error, "Error retreiving sieste metric #{m}: #{e}"
		end

		if (data.is_a? Hash) then
			if data[:error] then
				raise Backend::Error, "Sieste Exception raised: #{data[:error]}"
			end
		end
			
		metric = []
		data.each do |node|
			metric << {x: node[0], y: node[1]}
		end

		if data.empty? then
			raise Backend::Error, "No data returned from sieste query"
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
		points = (stop - start) / step 

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
