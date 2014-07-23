# Required config/settings.yml > backend > settings parameters: 
# #  url - the entrypoint for the sieste backend
# #  origin - the origin for the data (BETA)

class Backend::Sieste < Backend::GenericBackend

        def initialize params={}
		super
		@base_url = mandatory_param :url
		@origin   = mandatory_param :origin
        end

	# Sieste don't need no storage
        def get_metrics_list
		raise Backend::Error, "Unable to connect to sieste instance at #{@base_url}" unless is_up? @base_url
		return []
        end

	# Sieste is dynamic, yo
	def search_metric_list q, args={}
		page = args[:page] || 1
		page_size = args[:page_size] || 25
		uri = "#{@base_url}/simple/search?origin=#{@origin}&q=#{q}&page=#{page - 1}&page_size=#{page_size}"
		result = json_metrics_list uri
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

	# Ask sieste for the meta data for an address
	def get_metric_meta addr
		return addr if addr.split(DELIM).length > 2
		addr = addr.split(SEP).last if addr.include? SEP
		uri = "#{@base_url}/simple/search?origin=#{@origin}&address=#{addr}"
		result = get_json uri
		return @alias + SEP + machiavelli_encode(result.first)
	end

	def get_metric_id m
		return m unless m.include? DELIM
		k = keysplit m
		x = k[0] + SEP + k[1]["address"]
		x ||= m
		x
	end

        def get_metric m, start, stop, step, args={}
		query = []

	 	float = keysplit(get_metric_meta(m))[1]["_float"]

		m = get_metric_id m
			
		factor = 1000000000
		m = sieste_encode m

		query << "start=#{start}" 
		query << "end=#{stop}"
		query << "interval=#{step}"
		query << "as_double=true" if float

		query_string = "?" + query.join("&")
	
		uri = "#{@base_url}/interpolated/#{@origin}/#{m}#{query_string}"

		if args[:return_url]
			return uri
		end

		data = json_metrics uri

		if (data.is_a? Hash) then
			if data[:error] then
				raise Backend::Error, "Sieste Exception raised: #{data[:error]}"
			end
		end
			
		metric = []
		data.each do |node|
			metric << {x: node[0] / factor, y: node[1]}
		end

		if data.empty? then
			raise Backend::Error, "No data returned from sieste query"
		end

		if stop - start == step then
			# only one point required so get next closest to start
			return [metric.select{|a| a[:x] >= start}.first]
		end

		padded = []


		# Assume that we never get the complete set of data from start to stop. 
		# Backpad the starting data, and forward pad the ending data
		# Use steps to ensure consistent intervals
		first_point = metric[0][:x]

		# Reversing ensures consistent steps from interval BEFORE first data point to start 
		(first_point-step).step(start, -step).each do |x|
			padded << {x: x, y: nil}
		end
		padded.reverse!

		# Append actual data
		padded.concat metric

		# Append forward padding from one step AFTER data to stop
		last_point = metric[-1][:x]
		(last_point+step..stop).step(step).each do |x|
			padded << {x: x, y: nil}
		end

		padded
        end

	def keysplit m
		b, m = m.split(SEP) if m.include? SEP
		b ||= ""
		keys = Hash[*m.split(DELIM).map{|y| y.split(KVP)}.flatten]
		keys = Hash[keys.map{|k,v| [URI.decode(k), URI.decode(v)] }]
		return [b,keys]
	end
end
