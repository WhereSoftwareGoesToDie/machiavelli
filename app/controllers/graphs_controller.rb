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
		@all_metrics = all_metrics #backend.get_cached_metrics_list
		@available_metrics = @all_metrics - @metrics || []
		@graph = params[:graph] || UI_DEFAULTS[:graph] 

		start = params[:start] || UI_DEFAULTS[:start]
		gon.start = to_epoch(start)
		gon.stop  = to_epoch(params[:stop] || "0h")
		gon.step  = steps(start) 

		gon.metric = []
		gon.feed = []

		@metrics.each_with_index do |m,i|
			gon.metric[i] = m
			gon.feed[i] = "/metrics/?metric="+m
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
				begin
					backend = init_backend b.type, b.settings
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

	def steps period # make 600 points per period
		case period
			when "10min" then; 1   # second
			when "1h"    then; 6  
			when "3h"    then; 18 
			when "1d"    then; 144  # ~2.4 minutes
			when "1w"    then; 1008 # ~16.8 minutes 
			when "2w"    then; 2016 # ~33.6 minutes
		end
	end

	def init_backend name, settings
		"Backend::#{name.titleize}".constantize.new settings.to_hash
	end

end
