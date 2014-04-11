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
	def modal_filter_submit
		metrics = params[:filter][:metrics_select]
		metrics = metrics.split(";") # select2 modal separator: ";", changed purposefully. Will break if metrics contain semicolon. 
		metrics.reject! { |c| c.empty? or c.include?("0000") } # TODO why for the 0000? (sometimes [object Object])
		redirect_to root_path + chg_qs(:metric, metrics, {url: :referer})

	end

# Functions
	def steps period # take a time period, and return the seconds it represents
		mult, time = period.split(/(\d+)/).reject!{|a| a.empty?}
		sec = case time 
			when "min" then; 60
			when "h"   then; 60*60
			when "d"   then; 60*60*24
			when "w"   then; 60*60*24*7
			end
		sec * mult.to_i / 600
	end
end
