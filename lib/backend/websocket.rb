class Backend::Websocket < Backend::GenericBackend

	def initialize params={}
		@base_url  = params[:url]
		raise Backend::Error, "Error initalizing Websocket backend: Must provide a url value" if @base_url.nil?
		@metric = params[:metric]
		raise Backend::Error, "Error initalizing Websocket backend: Must provide a metric name for display" if @metric.nil?
	end
        
	def get_metrics_list
		[@metric]	
        end

        def get_metric m, _start=nil, _end=nil, options={}
		@base_url
        end
end 
