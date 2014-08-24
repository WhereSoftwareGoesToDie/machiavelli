require 'redis'

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
=begin
		# This is a test
		new_metrics = que_qs(:metric)
		@metrics = new_metrics.map{|m| Metric.new m }
		puts @metrics[0].titleize if @metrics.length > 0
		binding.pry
		# ty
=end
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
		gon.metrics = new_metrics.map{|m| Metric.new m }

=begin
		selected_metrics.each_with_index do |m,i|
			b = (init_backend m)
			metric_meta = b.get_metric_meta(m)
			metric_id = b.get_metric_id(m)
			gon.metrics[i] = { 
				metric: metric_meta,
				id: metric_id,
				feed: "/metric/?metric="+metric_id,
				live: b.live?,
				sourceURL: b.get_metric_url(m.split(SEP).last,start,stop,step),
				removeURL: rem_qs(:metric, m)
			}

		end
=end
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
	
		init_backend.delete_metrics_cache
		Settings.reload!
		errors = []

		if Settings.backends.nil?
			flash[:error] = ui_message(:no_backends)
		else 
			inactive_backends = []; refresh_errors :remove
			Settings.backends.each do |b|
				begin
					settings = b.settings.to_hash.merge({alias: b.alias||b.type})
					backend = init_backend b.type, settings
					backend.refresh_metrics_cache # b.alias
				rescue Backend::Error => e
					inactive_backends << [(b.alias||b.type), e]
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
