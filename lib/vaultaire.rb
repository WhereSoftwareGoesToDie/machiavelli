class Vaultaire < Store
	def initialize settings
		@origin_id = settings.origin
		@base_url = settings.host
	end

	def metadata metric_id
		r = get_json("#{@base_url}/simple/search?origin=#{@origin_id}&address=#{metric_id}").first
		return machiavelli_encode(r)
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


	def get_metric_url m, start, stop, step, args={}
		query = []

                float = keysplit(get_metric_meta(m))[1]["_float"]

                m = get_metric_id m

                m = sieste_encode m

                _start, _stop = validate_time(start, stop)

                query << "start=#{_start}"
                query << "end=#{_stop}"
                query << "interval=#{step}"
                query << "as_double=true" if float

                query_string = "?" + query.join("&")

                uri = "#{@base_url}/interpolated/#{@origin}/#{m}#{query_string}"

		return uri

	end

	def get_metric m, start, stop, step, args={}
		uri = get_metric_url  m, start, stop, step, args={}

                factor = 1000000000
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
end
