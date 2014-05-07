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
		gon.metrics = []

		start = to_epoch(params[:start] || UI_DEFAULTS[:start])
		stop  = to_epoch(params[:stop]  || UI_DEFAULTS[:stop])
		
		if stop < start
			flash.now[:error] = "Start time has to be before stop time"
			return
		end

		if stop - start <  UI_DEFAULTS[:points]
			flash.now[:error] = "Time range must be at least #{UI_DEFAULTS[:points]} seconds apart."
			return
		end

		# Everything should be ok from here on out
		@graph = params[:graph] || UI_DEFAULTS[:graph] 

		step  = params[:step]  || (stop - start).to_i / UI_DEFAULTS[:points]
		gon.start, gon.stop, gon.step = start, stop, step
		
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
	def submit #searching 
		metrics = params[:filter][:metrics_select]
		metrics = metrics.split(";") # select2 modal separator: ";", changed purposefully. Will break if metrics contain semicolon. 
		metrics.reject! { |c| c.empty? or c.include?("0000")} 
		redirect_to root_path + chg_qs(:metric, metrics, {url: :referer})
	end

	def stop_time #changing stop parameter
		if params[:commit] == "now"
			redirect_to root_path + obl_qs(:stop, {url: :referer})
		else 
			stop = params[:time][:number] + params[:commit]
			redirect_to root_path + chg_qs(:stop, stop, {url: :referer})
		end
	end
end
