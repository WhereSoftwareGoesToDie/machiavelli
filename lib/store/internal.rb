# Super Special Internal Test Thing
# This class can be used as a template for development of any custom classes to leverage JSON feeds of metrics
class Store::Internal < Store::Store
        def initialize origin, settings
		super 
        end

	# Special Internal Source - will always be true
	def is_up?
		true
	end	
	
        def sources
                 ["The_Prince","Discources_On_Livy","The_Woman_of_Andros_Part_1","Clizia","The_Mandrake"]
        end

	# Return the raw list of metrics from the endpoint listing
        def get_metrics_list
		sources
        end

        # Build a basic query for the metric data
	def get_metric_url m, start=nil, stop=nil, step=nil
		query = []
		query << "start=#{start}"
		query << "stop=#{stop}"
		query << "step=#{step}"

		query_string = "?" + query.join("&")

		uri = "#{@base_url}/source/#{m.metric_id}#{query_string}"

		return uri
        end

	# Return the raw data from the metric endpoint
        def get_metric m, start=nil, stop=nil, step=nil
                i = sources.index(m.metric_id) || 2
                len = sources.length

                data = []

                (start..(stop-step)).step(step).each do |x|
                        y = 10 * (Math.sin(0.005 * x) + Math.sin((0.004 * x) + ((Math::PI * i) / len) )) + 20 + i
                        data << { x: x, y: y.round(2) }
                end

                return data.to_json
	end
end
