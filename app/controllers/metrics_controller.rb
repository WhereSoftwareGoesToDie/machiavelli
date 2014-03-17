require 'uri'

class MetricsController < ApplicationController
	helper :all
	
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

		unless available_metrics.include? URI.decode(m) then
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
		backend.get_cached_metrics_list.map{|x| URI.decode(x)}
	end


	def get_metric m, start, stop, step
		metric = m.split(":").last
		(backend m).get_metric metric, start, stop, step
	end

end
