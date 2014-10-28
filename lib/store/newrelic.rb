# New Relic? In my backend library folder? It's more likely than you think!

# Required config/settings.yml > backend > settings parameters: 
# #  API Key - Generated within New Relic settings by Account Settings > Integrations > Data Sharing
#

require 'open-uri'
class Store::Newrelic < Store::Store

        def initialize origin, settings
		super
		@api_key = mandatory_param :api_key, "store_settings"
		@application_id = mandatory_param :application_id, "store_settings"

		@base_url = "https://api.newrelic.com"
		@newrelic_url = "#{@base_url}/v2/applications"
        end

	def keys
		@@NEW_RELIC_KEYS 
	end

	def hidden_keys
		super.append "api_key"
	end

	def is_up?
		return true
		begin
			uri = URI.parse(@base_url)

			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			request = Net::HTTP::Get.new(uri.request_uri)

			response = http.request(request)	
			return true

		rescue Errno::EHOSTUNREACH, Errno::ECONNREFUSED, SocketError => e
			return false
		end

	end
	
        def get_metrics_list
		begin
		
			json_m = get_headed_json "#{@newrelic_url}/#{@application_id}/metrics.json", {api_key: @api_key}
			metrics = []; 

			json_m[:metrics].each{|a|
				parent = a[:name]
				a[:values].each { |b|
					metrics << "#{parent}-#{b}"
				}
			}

			metrics.map{|a| a.tr("/","_").tr(":",".")}
			       .select{|a| !a.include? "{" }

		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, SocketError => e
			raise Store::Error, "Error retreiving New Relic metrics list: #{e}"
		end
        end

        def get_metric_url m, start=nil, stop=nil, step=nil
		metric, sub_type = parse_newrelic m
		metric = metric.tr("_","/").tr(".",":")
		uri = "#{@newrelic_url}/#{@application_id}/metrics/data.json?names=#{metric}"
		return uri
	end

        def get_metric m, start=nil, stop=nil, step=nil, args={}
		metric, sub_type = parse_newrelic m
		uri = get_metric_url m, start, stop, step		

		begin
			data = get_headed_json uri, {api_key: @api_key}
			
			stream = []

			data[:metric_data][:metrics].first[:timeslices].each {|a| 
				x = DateTime.parse(a[:from]).strftime("%s").to_i
				y = a[:values].select{|k,v| "#{k}" == sub_type}[sub_type.to_sym]
				stream << {x: x, y: y}
			}
		
			return stream
			
		rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, SocketError => e
			raise Store::Error, "Error retreiving New Relic metric #{m}: #{e}"
		end

		return data
        end

	def parse_newrelic m
		m.id.split(SEP).last.split("-")
	end

	def get_headed_json uri, headers
		a = JSON.parse(open(uri, "X-Api-Key" => headers[:api_key]).read, :symbolize_names => true)
		return a
	end

end
