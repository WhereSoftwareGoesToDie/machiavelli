# "Simple" json feed of data. 
# Sample implementation ./simple_endpoint.rb
# Assumes an endpoint for a list of metrics, and an endpoint to request data for a specific metric
#
# This class can be used as a template for development of any custom classes to leverage JSON feeds of metrics
class Simple < Store
        def initialize origin, settings
		super 
                @base_url = mandatory_param :url, "store_settings"
        end

	# Return the raw list of metrics from the endpoint listing
        def get_metrics_list
		json_metrics_list "#{@base_url}/source_list"
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
		uri = get_metric_url m, start, stop, step
		json_metrics uri
	end
end
