require 'redis'

class GraphsController < ApplicationController
	include Layouts::ApplicationLayoutHelper
	include Helpers

	def all_metrics; backend.get_cached_metrics_list; end
	def selected_metrics url=nil; 
		m = []; url ||= request.url
		m = CGI::parse(URI::parse(url).query)["metric"] if URI::parse(url).query; 
		m
	end
# GET
	def index # index.html
		gon.metrics = []

		start = to_epoch(get_param(:start))
		stop  = to_epoch(get_param(:stop))

		step  = params[:step]  || (stop - start).to_i / UI_DEFAULTS[:points]
		gon.start, gon.stop, gon.step = start, stop, step

		gon.clock = params[:clock] || UI_DEFAULTS[:clock]

		base = obl_qs(:stop, {url: obl_qs(:start) })
		base = chg_qs(:time, "absolute", {url: base})

		gon.base = base
	

		new_metrics = que_qs(:metric)
		gon.metrics = []

		@metrics = new_metrics.map{|m| Metric.new(m)}

		new_metrics.each_with_index{|mstr, i|
		       	g = {}
			g[:id]        = @metrics[i].id
			g[:feed]      = @metrics[i].feed
			g[:live]      = @metrics[i].live?
			g[:sourceURL] = @metrics[i].get_metric_url start, stop, step
			g[:removeURL] = rem_qs(:metric, mstr)

		 #	g[:counter] = true if m.counter? ##TODO Incorporate vaultaire based metadata
			gon.metrics << g
	       	}

		@gon = gon

		if stop < start
			flash.now[:error] = "Start time has to be before stop time"
			return
		end

		if stop - start <  UI_DEFAULTS[:points]
			flash.now[:error] = "Time range must be at least #{UI_DEFAULTS[:points]} seconds apart."
			return
		end

		# Everything should be ok from here on out
		@graph = get_param(:graph)
	end
	def refresh # refresh button
	
		delete_metrics_cache
		Settings.reload!
		errors = []

		if Settings.origins.nil?
			flash[:error] = ui_message(:no_backends)
		else 
			inactive_backends = []; refresh_errors :remove
			Settings.origins.each do |o|
				begin
					origin, settings = o
					store = Object.const_get(settings.store).new origin, settings
					store.refresh_metrics_cache
				rescue Store::Error => e
					inactive_backends << [o[0], e]
					errors << e
				end
			end
			unless errors.empty?
				flash[:error] = errors.join("<br/>").html_safe 
				refresh_errors :save, inactive_backends
			end
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

	def absolute_time 
		start = Time.parse(params[:time][:start_time]).to_i
		stop = Time.parse(params[:time][:stop_time]).to_i
		p_url = chg_qs(:start, start, {url: :referer})
		url = chg_qs(:stop, stop, {url: p_url})
		redirect_to root_path + url
	end
end
