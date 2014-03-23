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
		@graph = params[:graph] || UI_DEFAULTS[:graph] 

		start = params[:start] || UI_DEFAULTS[:start]
		gon.start = to_epoch(start)
		gon.stop  = to_epoch(params[:stop] || "0h")
		gon.step  = params[:step] || steps(start) || 60 

		gon.metrics = []

		@metrics.each_with_index do |m,i|
			gon.metrics[i] = { metric: m, feed: "/metric/?metric="+m, live: (init_backend m).live?}
		end
	end
	
	def refresh # refresh button
	
		init_backend.delete_metrics_cache
		Settings.reload!
		errors = []

		if Settings.backends.nil?
			flash[:error] = ui_message(:no_backends)
		else 
			Settings.backends.each do |b|
				begin
					settings = b.settings.to_hash.merge({alias: b.alias||b.type})
					backend = init_backend b.type, settings
					backend.refresh_metrics_cache # b.alias
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
		add_metrics metrics
	end

	def modal_filter_submit # from big metrics listing modal
		metrics = params[:filter][:metrics_select]
		metrics = metrics.split(";") # select2 modal separator: ";", changed purposefully. Will break if metrics contain semicolon. 
		add_metrics metrics
	end

	def add_metrics metrics
		new_url = add_qs :metric, metrics, {url: :referer}
		puts new_url
		redirect_to root_path + new_url
	end

# Functions
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
end
