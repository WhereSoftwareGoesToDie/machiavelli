class Backend::Websocket < Backend::GenericBackend

	def initialize params={}
		@base_url  = params[:url]
		@metric = params[:metric]
		raise Backend::Error, "Must provide a url value" if @base_url.nil?
	end
        
	def get_metrics_list
		[@metric]	
        end

        def get_metric m, _start=nil, _end=nil, options={}
		@base_url
        end
end 
