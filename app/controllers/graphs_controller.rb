require 'redis'

# Control the main Graphs GUI
class GraphsController < ApplicationController
	include Layouts::ApplicationLayoutHelper
	include Helpers

	# Main index of the system
	def index
		gon.metrics = []

		# Get the parameters from the UI, or use defaults.
		start = to_epoch(get_param(:start))
		stop  = to_epoch(get_param(:stop))

		step  = params[:step]  || (stop - start).to_i / UI_DEFAULTS[:points]
		gon.start, gon.stop, gon.step = start, stop, step

		gon.clock = params[:clock] || UI_DEFAULTS[:clock]

		base = obl_qs(:stop, {url: obl_qs(:start) })
		base = chg_qs(:time, "absolute", {url: base})

		gon.base = base
	

		# Get all the metrics, and build up a javascript blob with their useful bits
		new_metrics = que_qs(:metric)
		gon.metrics = []
		@metrics = []

		new_metrics.each_with_index do |metric,i|
			m = Metric.new(metric)
			@metrics << m

			g = {}
			g[:id]        = m.id
			g[:feed]      = m.feed
			g[:live]      = m.live?
			g[:title]     = m.titleize
			g[:metadata]  = m.metadata
			g[:sourceURL] = m.get_metric_url start, stop, step
			g[:removeURL] = "javascript:removechart(\"#{metric}\", \"#{rem_qs(:metric, metric)}\")"
		 #	g[:counter] = true if m.counter? ##TODO Incorporate vaultaire based metadata

			gon.metrics << g
		end

		@gon = gon

		# Validate the times before continuing on
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

	# Refresh the settings file and cached metrics. UI button within the settings modal
	def refresh
		
		# Remove all the redis data	
		delete_metrics_cache

		# Reload all settings files (rails_config)
		Settings.reload!
		errors = []

		# For all the origins, if available, confirm if they are up, and refresh their cache of metrics
		if Settings.origins.nil?
			flash[:error] = ui_message(:no_backends)
		else 
			inactive_backends = []; refresh_errors :remove
			Settings.origins.each do |o|
				begin
					origin, settings = o
					store = "Store::#{settings.store.titleize}".constantize.new origin, settings
					store.refresh_metrics_cache
				rescue Store::Error => e
					inactive_backends << [o[0], e]
					errors << e
				end
			end

			# Store the information about why the store refresh failed. 
			unless errors.empty?
				flash[:error] = errors.join("<br/>").html_safe 
				refresh_errors :save, inactive_backends
			end
		end
		redirect_to root_path
	end

	# Metrics modal search POST submission
	def submit
		metrics = params[:filter][:metrics_select]

		# select2 modal separator: ";", changed purposefully. Will break if metrics contain semicolon. 
		metrics = metrics.split(";") 

		metrics.reject! { |c| c.empty? or c.include?("0000")} 
		redirect_to root_path + chg_qs(:metric, metrics, {url: :referer})
	end

	# Relative Time form POST submission
	def stop_time
		if params[:commit] == "now"
			redirect_to root_path + obl_qs(:stop, {url: :referer})
		else 
			stop = params[:time][:number] + params[:commit]
			redirect_to root_path + chg_qs(:stop, stop, {url: :referer})
		end
	end

	# Absolute time form POST submission
	def absolute_time 
		start = Time.parse(params[:time][:start_time]).to_i
		stop = Time.parse(params[:time][:stop_time]).to_i
		p_url = chg_qs(:start, start, {url: :referer})
		url = chg_qs(:stop, stop, {url: p_url})
		redirect_to root_path + url
	end
end
