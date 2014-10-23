# Controller for Metrics
# Because metrics can come from many source, we serve them from our own itty bitty endpoint, passing them through the ruby server-side code and preventing their exposure directly to the user.
class MetricsController < ApplicationController
	
	include Layouts::ApplicationLayoutHelper


	START = 60*60*3
	STOP  = 0
	STEP = 10

	# Basic GET point - given a metric name only, and provided or default 3st parameters, get the metric information
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

	# List all the metrics available, limited by search terms if given
	def list

		settings_origins =  Settings.origins.map{|a,b| a.to_s}
		b = [params[:origin] || settings_origins].flatten

		search = params[:q] || "*"

		page = params[:page]
		page ||= 1
	
		page_size = params[:page_size] || 25
		
		search.gsub!(" ","*") 
		list = []

		# For all the backends, search their metric listings
		b.each do |x|
			begin
				origin, settings = Settings.origins.find{|o,k| o.to_s == x}
				be = "Store::#{settings.store}".constantize.new origin, settings
				ret = be.search_metrics(search, { page: page.to_i, page_size: page_size.to_i})
				ret.each do |r| 
					m = Metric.new r
					list << {id: m.id, text: m.titleize}
				end
			rescue Store::Error, Errno::ECONNREFUSED => e
				 # Do not render errors if we are in an AJAX callback
				 unless  params[:callback] then
					 render json: { error: e.to_s } 
					 return
				 end
			end
		end

		list.flatten!
	
		# Sort it outselves
		list.sort!{|i,j| i[:text] <=> j[:text]}

		if params[:callback] then
			# Generate a nice AJAX callback listing
			render json: "#{params[:callback]}({metrics:#{list.to_json}});"
		else
			# Just return the IDs. Not usually called from the UI.
			render json: list.map{|x| x[:id]}.to_json
		end
		
	end

	def files
		site = params[:site] || "*"
		@files = Dir.glob("public/files/#{site}/*").sort
		render layout: false
	end
end
