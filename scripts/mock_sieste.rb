require 'sinatra'
require 'json'

require 'sinatra/reloader' if development?
set :port, 1234


simple = ["JISPVTWX", "EVVDPKOX", "FASXEOMD", "FWNDTEZZ", "WZBXPSXK", "PRBXDCLZ"]
meta_list = ["host","metric","service"]

list_url = "/simple/search"
metric_url = "/interpolated/:source"


get '/' do
	"MOCK Sieste thingy. Use in case of ZMQTmieouts or whatnot." +
	"<dt><code>#{list_url}</code> <dd>query list of available sources</dt>"+
	"<dt><code>#{metric_url}</code> <dd>get information for a source</dt>"
end

get list_url do
	content_type :json
	return [].to_json if params[:page] && params[:page].to_i > 0
	list = simple.each_with_index.map{|a,i| "address~#{a},#{meta_list.map{|b| "#{b}~#{a}"}.join(",")}#{",_float~1" if i.even?}"}
	list.to_json
end

get metric_url do
	content_type :json

	[:start, :end].each do |p|
		return { error: "Must provide #{p}"}.to_json unless params[p]
	end
	
	start = params[:start].to_i

	return {error: "Start must be > 0"}.to_json if start < 0
	stop = params[:end].to_i
	step = (params[:interval] || 60).to_i 
	float = true if params[:as_double]

	unless simple.include? params[:source] then
		return {error: "Source #{params[:source]} does not exist. Check #{list_url}"}.to_json
	end
	
	source = params[:source]
	
	i = simple.index(source) || 2
	len = simple.length

	data = []

	round = float ? 2 : 0

	(start..(stop-step)).step(step).each do |x|
		y = 10 * (Math.sin(0.005 * x) + Math.sin((0.004 * x) + ((Math::PI * i) / len) )) + 20 + i 
		data << [x * 1000000000, y.round(round)]
	end

	data.to_json

end

["/source/","/source"].each do |path|
	get path do 
		"Must provide a source. See <code>#{list_url}</code>"
	end
end

