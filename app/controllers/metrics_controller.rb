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

		page = params[:page]
		page ||= 1
	
		search.gsub!(" ","*") 
		list = []

		begin
			b.each do |x|
				list << ((init_backend x).search_metric_list search, page.to_i)
			end
			list.flatten!
			if params[:callback] then
				be = init_backend list.first
				render json: "#{params[:callback]}({metrics:#{list.map{|x| {id: x, text: (be.style_metric :pretty, x)}}.to_json}});"
			else
				render json: list
			end
		rescue Backend::Error => e
			render json: { error: e.to_s } 
			return
		end
		
	end
	
# Functions
	def get_metric m, start, stop, step
		metric = m.split(SEP).last
		(init_backend m).get_metric metric, start, stop, step
	end

end
