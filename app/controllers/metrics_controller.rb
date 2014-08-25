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
			metric = Metric.new(m).get_metric(start, stop, step)
			render json: metric	
		rescue StandardError, Store::Error => e
			render json: { error: e.to_s } 
			return
		end
	end

	def list

		settings_origins =  Settings.origins.map{|a,b| a.to_s}
		b = [params[:origin] || settings_origins].flatten

		search = params[:q] || "*"

		page = params[:page]
		page ||= 1
	
		page_size = params[:page_size] || 25
		
		search.gsub!(" ","*") 
		list = []

		b.each do |x|
			begin
				origin, settings = Settings.origins.find{|o,k| o.to_s == x}
				be = (Object.const_get settings.store).new origin, settings
				ret = be.search_metrics(search, { page: page.to_i, page_size: page_size.to_i})
				ret.each do |r| 
					m = Metric.new r
					list << {id: m.id, text: m.titleize}
				end
			rescue Store::Error, Errno::ECONNREFUSED => e
				 unless  params[:callback] then
					 render json: { error: e.to_s } 
					 return
				 end
			end
		end

		list.flatten!

		if params[:callback] then
			render json: "#{params[:callback]}({metrics:#{list.to_json}});"
		else
			render json: list.map{|x| x[:id]}.to_json
		end
		
	end
end
