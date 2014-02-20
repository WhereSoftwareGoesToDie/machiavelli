class GraphsController < ApplicationController
	include Layouts::ApplicationLayoutHelper

	def all_metrics; backend.get_cached_metrics_list; end
	def selected_metrics url=nil; 
		m = []; url ||= request.url
		m = CGI::parse(URI::parse(url).query)["metric"] if URI::parse(url).query; 
		m
	end
# GET
	def index # index.html
		@metrics = selected_metrics
		_start  = params[:start] || UI_DEFAULTS[:start]
		_end    = params[:end]
		@available_metrics = []

		gon.stats = {}
		begin
			@all_metrics = all_metrics #backend.get_cached_metrics_list
			
			@available_metrics = @all_metrics - @metrics || []
			@metrics.each do |m|
				options = (graph.view == "cubism" ? {datapoints: 700} : {} )
				metric = get_metric(m, _start, _end, options)
				stats = graph.parse_metric m, metric
				gon.stats[safe_string(m)] = stats
			end
			@graph = graph.view 
		rescue Backend::Error => e
			flash.now[:error] = "#{e}"
		end
		
	end
	
	def refresh # refresh button

		backend.delete_metrics_cache
		Settings.reload!
		errors = []

		if Settings.backends.nil?
			flash[:error] = ui_message(:no_backends)
		else 

			Settings.backends.each do |b|
				backend = init_backend b.type, b.settings
				begin
					backend.refresh_metrics_cache b.alias
				rescue Backend::Error => e
					errors << e
				end
			end
			flash[:error] = errors.join("<br/>").html_safe unless errors.empty?
		end
		redirect_to root_path
	end

# POST
	def graph_filter_submit # from "filter metrics" search bar
		available_metrics = all_metrics - selected_metrics(request.referer) || []
		metrics = available_metrics.select{|m| m.downcase.include? params[:search][:filter].downcase }
		new_url = add_qs :metric, metrics, {url: :referer}
		redirect_to root_path + new_url
	end

# Functions
	def backend
		Backend::GenericBackend.new
	end

	def graph
		case params[:graph] || UI_DEFAULTS[:graph]
		when "horizon" then; Graph::Cubism
		when "stacked" then; Graph::Stacked
		else 		     Graph::Rickshaw
		end
	end

	def get_metric m, _start, _end, options
		
		type, metric = m.split(":")

		settings = Settings.backends.map{|h| h.to_hash}.select{|a| (a[:alias] || a[:type]).casecmp(type) == 0}.first

		backend = init_backend settings[:type], settings[:settings]

		backend.get_metric metric, _start, _end, options
	end

	def init_backend name, settings
		"Backend::#{name.titleize}".constantize.new settings.to_hash
	end

end
