class Simple < Store

        def initialize params={}
		super 
                @base_url = mandatory_param :url
        end

        def get_metrics_list
		json_metrics_list "#{@base_url}/source_list"
        end

        def get_metric m, start=nil, stop=nil, step=nil
		uri = get_metric_url m, start, stop, step
		json_metrics uri
	end

        def get_metric_url m, start=nil, stop=nil, step=nil
		query = []
		query << "start=#{start}"
		query << "stop=#{stop}"
		query << "step=#{step}"

		query_string = "?" + query.join("&")

		uri = "#{@base_url}/source/#{m}#{query_string}"

		return uri
        end
end
