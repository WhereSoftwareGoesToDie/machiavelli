class MetricsController < ApplicationController
	include Layouts::ApplicationLayoutHelper

# GET
	def get
		#begin

		_start  = params[:start]
		_end    = params[:end]
		m = params["metric"]
		options = (graph.view == "cubism" ? {datapoints: 700} : {} )

		begin
			metric = get_metric(m, _start, _end, options)
			render json: metric	
		rescue Backend::Error => e
			render json: { error: e.to_s } 
			return
		end
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
