require 'uri'

class MetricsController < ApplicationController
	
	include Layouts::ApplicationLayoutHelper

	helper_method :init_backend

	START = 60*60*3
	STOP  = 0
	STEP = 10
# GET
	def get
		unless params[:metric] then
			render json: {error: "must provide a metric"}
			return
		end
		m = params[:metric]

		now = Time.now().to_i
		start  = (params[:start] || now - START).to_i 
		stop   = (params[:stop] || now - STOP).to_i
		step   = (params[:step] || STEP).to_i

		begin
			metric = get_metric(m, start, stop, step)
			render json: metric	
		rescue StandardError, Backend::Error => e
			render json: { error: e.to_s } 
			return
		end
	end

	def list 
		b = [params[:backend] || backends].flatten

		search = params[:q] || "*"
	
		search.gsub!(" ","*") 
		list = []

		begin
			b.each do |x|
				list << ((init_backend x).search_metric_list search)
			end
			list.flatten!
			if params[:callback] then
				render json: "#{params[:callback]}({metrics:#{list.map{|x| {id: x, text: x}}.to_json}});"
			else
				render json: list
			end
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
		metric = m.split("~").last
		(init_backend m).get_metric metric, start, stop, step
	end

end
