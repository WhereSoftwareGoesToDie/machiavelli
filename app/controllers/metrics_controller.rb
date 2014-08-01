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
	
		page_size = params[:page_size] || 25
		
		search.gsub!(" ","*") 
		list = []

		b.each do |x|
			begin
				be = init_backend x
				ret = be.search_metric_list(search, { page: page.to_i, page_size: page_size.to_i})
				list << ret.map{|r| {id: be.get_metric_id(r), text: be.style_metric(:pretty, r)}}
			rescue Backend::Error, Errno::ECONNREFUSED => e
				 unless  params[:callback] then
					 render json: { error: e.to_s } 
					 return
				 end
			end
		end

		list.flatten!
	
		# Sort it outselves
		list.sort!{|i,j| i[:text] <=> j[:text]}

		binding.pry if page.to_i > 1
		if params[:callback] then
			render json: "#{params[:callback]}({metrics:#{list.to_json}});"
		else
			render json: list.map{|x| x[:id]}.to_json
		end
		
	end
	
# Functions
	def get_metric m, start, stop, step
		metric = m.split(SEP).last
		(init_backend m).get_metric metric, start, stop, step
	end

end
