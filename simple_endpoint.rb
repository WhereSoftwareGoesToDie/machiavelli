require 'sinatra'
require "sinatra/reloader" if development?
require 'json'

source_list = ["The_Prince","Discources_On_Livy","Andria","Clizia","The_Mandrake"]

get '/' do
	"Beep Boop. I am a simple API. I have these endpoints: <br/><br/>"+ 
	"<dt><code>/source_list</code> <dd>query list of available sources</dt>"+
	"<dt><code>/sources/{source}</code> <dd>get information for a source</dt>"
end

get '/source_list' do
	content_type :json
	source_list.to_json
end

get '/source/:source' do
	content_type :json

	start = (params[:start] || Time.now().to_i - 60*60*24).to_i # 24 Hours
	stop  = (params[:end]   || Time.now().to_i).to_i            # Now
	step  = (params[:step]  || 300).to_i                        # 5 minutes => ~300 datapoints
	source = params[:source]

	return '[]' unless source_list.include? params[:source]
	
	data = []
	i = source_list.index(source) || 2

	(start..stop).step(step).each {|x|
		y = 10 * (Math.sin(0.005 * x) + Math.sin((0.004 * x) + ((Math::PI * i) / source_list.length) )) + 20 + i 
		data << { x: x, y: y.round(2) } 
	}

	data.to_json

end

["/source/","/source"].each do |path|
	get path do 
		"Must provide a source. e.g. <code>/sources/#{source_list.first}</code>"
	end
end

