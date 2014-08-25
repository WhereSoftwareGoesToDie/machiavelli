class Vaultaire < Store
	def initialize settings
		@origin_id = settings.origin
		@base_url = settings.host
	end

	def metadata metric_id
		r = get_json("#{@base_url}/simple/search?origin=#{@origin_id}&address=#{metric_id}").first
		return machiavelli_encode(r)
	end

	def metadata_table metric
		 ret = URI.decode(metric).strip
                 sep = [[SEP,"</td></tr><tr><td>"],[KVP,"</td><td> - "],[DELIM,"</td></tr><tr><td>"]]
                 sep.each {|a| ret.gsub!(a[0],a[1])}
                 '<table style="text-align: left"><tr><td colspan=2>'+ret+'</table>'
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

	def validate_time start, stop
		limit_start = 1405916335 # collectors 2.1 staart
                if start < limit_start
                        puts "Limit start to #{limit_start}"
                        start = limit_start
                end
                return start, stop
	end

	def get_metric_url m, start, stop, step 
		query = []

		metakeys = m.source.keysplit(m.metadata)
		float = metakeys["_float"]
                
		_start, _stop = validate_time(start, stop)

                query << "start=#{_start}"
                query << "end=#{_stop}"
                query << "interval=#{step}"
                query << "as_double=true" if float

                query_string = "?" + query.join("&")

                uri = "#{@base_url}/interpolated/#{@origin_id}/#{m.metric_id}#{query_string}"

		return uri

	end

	def get_metrics_list
		return []
	end

	def get_metric start, stop, step
		uri = get_metric_url start, stop, step

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
