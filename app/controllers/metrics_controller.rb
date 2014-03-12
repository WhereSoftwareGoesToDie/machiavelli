class MetricsController < ApplicationController
	include Layouts::ApplicationLayoutHelper

	START = 60*60*3
	STOP  = 0
	STEP = 10
# GET
	def get
		unless params[:metric] then
			render json: available_metrics
			return
		end
		m = params[:metric]

		now = Time.now().to_i
		start  = (params[:start] || now - START).to_i 
		stop   = (params[:stop] || now - STOP).to_i
		step   = (params[:step] || STEP).to_i

		unless available_metrics.include? m then
			render json: {error: "Metric '#{m}' not in list of available metrics"}
			return
		end

		begin
			metric = get_metric(m, start, stop, step)
			render json: metric	
		rescue Backend::Error => e
			render json: { error: e.to_s } 
			return
		end
	end
	
# Functions
	def available_metrics
		Backend::GenericBackend.new.get_cached_metrics_list
	end


	def get_metric m, start, stop, step
		type, metric = m.split(":")
		settings = Settings.backends.map{|h| h.to_hash}.select{|a| (a[:alias] || a[:type]).casecmp(type) == 0}.first
		backend = init_backend settings[:type], settings[:settings]
		backend.get_metric metric, start, stop, step
	end

	def init_backend name, settings
		"Backend::#{name.titleize}".constantize.new settings.to_hash
	end

end
