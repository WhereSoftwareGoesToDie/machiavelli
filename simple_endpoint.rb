require 'sinatra'
require 'json'

require 'sinatra/reloader' if development?

source_list = ["The_Prince","Discources_On_Livy","The_Woman_of_Andros_Part_1","Clizia","The_Mandrake"]

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
sleep 0.1	
	[:start, :stop, :step].each do |p|
		return { error: "Must provide #{p}"}.to_json unless params[p]
	end
	
	start = params[:start].to_i
	stop = params[:stop].to_i
	step = params[:step].to_i

	unless source_list.include? params[:source] then
		return {error: "Source #{params[:source]} does not exist. Check /source_list"}.to_json
	end
	
	source = params[:source]
	
	i = source_list.index(source) || 2
	len = source_list.length

	data = []

	(start..(stop-step)).step(step).each do |x|
		y = 10 * (Math.sin(0.005 * x) + Math.sin((0.004 * x) + ((Math::PI * i) / len) )) + 20 + i 
		data << { x: x, y: y.round(2) } 
	end

	data.to_json

end

["/source/","/source"].each do |path|
	get path do 
		"Must provide a source. e.g. <code>/sources/#{source_list.first}</code>"
	end
end

