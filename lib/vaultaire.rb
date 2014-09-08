# Storage for Vaultaire TSDB (https://github.com/anchor/vaultaire) via it's RESTful backend (https://github.com/anchor/sieste)
class Vaultaire < Store
	include Helpers

	def initialize origin, settings
		super
		@base_url = mandatory_param :host, "store_settings"
	end

	# Sieste can be used to query for a metric's metadata based on it's origin and metric_id alone
	def metadata metric_id
		r = get_json("#{@base_url}/simple/search?origin=#{@origin_id}&address=#{metric_id}").first
		return machiavelli_encode(r) if r
		return metric_id
	end

	# Split the metadata into nice pieces and make a HTML table.
	def metadata_table metric
		t = URI.decode(metric).strip.split(DELIM).map{|a| a.split(KVP)}

		table = ""
		t.each {|a|
			table += "<tr><td>#{a[0]}</td><td> = #{a[1]}</td></tr>"
		}

		header = "<tr><td>#{@origin_id}</td><td> - #{self.class.name}</td></tr>"
		return "<table style='text-align: left'>#{header}#{table}</table>"
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

	# Monkeypatch to prevent data pulls from when there is known to not be data
	def validate_time start, stop
		limit_start = 1405916335 # collectors 2.1 staart
                if start < limit_start
                        puts "Limit start to #{limit_start}"
                        start = limit_start
                end
                return start, stop
	end

	# Use Sieste to search for metrics given an origin id and a query string
	def search_metrics q, args={}
		page = args[:page] || 1
                page_size = args[:page_size] || 25
                uri = "#{@base_url}/simple/search?origin=#{@origin_id}&q=#{q}&page=#{page - 1}&page_size=#{page_size}"
                result = json_metrics_list uri

		# Beta Sieste - remove known bad metadata items
		result.delete_if{|a| a.include? "%3b"} # semicolon
                result.delete_if{|a| !a.include? DELIM} # remove address-only listings

                result.map{|x| "#{@origin_id}#{SEP}#{machiavelli_encode x}"}
	end

	# Generate the url for the datastream for a given metric
	def get_metric_url m, start, stop, step 
		query = []

		metakeys = keysplit(m.metadata)
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

	# Do nothing. This backend isn't cached
	def refresh_metrics_cache
	end

	# Return an empty array. This backend isn't cached
	def get_metrics_list
		return []
	end

	# Get the metric data from sieste/vaultaire, and do some basic validations on the result
	def get_metric m, start, stop, step
		uri = get_metric_url m, start, stop, step

                factor = 1000000000
                data = json_metrics uri

                if (data.is_a? Hash) then
                        if data[:error] then
                                raise Store::Error, "Sieste Exception raised: #{data[:error]}"
                        end
                end

                metric = []
                data.each do |node|
                        metric << {x: node[0] / factor, y: node[1]}
                end

                if data.empty? then
                        raise Store::Error, "No data returned from sieste query"
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

		# Ensure a hard limit on the size of the array before returning
		points = (stop - start)/step
                padded.take(points)
	end
end
