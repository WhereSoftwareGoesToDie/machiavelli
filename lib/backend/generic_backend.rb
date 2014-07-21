require 'redis'
require 'uri'
require 'net/http'

class Backend::GenericBackend

	def initialize params={}
		load_extension  self.class.name
		@params = params
		@alias = optional_param :alias, name
	end

	# Return an array of uniquely defined metrics
	def get_metrics_list
		raise NotImplementedError
	end

	def search_metric_list q, args={}
		raise Backend::Error, "Unable to connect to #{name} backend at #{@base_url}" unless is_up?
		
		return [] if args[:page] and args[:page].to_i > 1

		r = redis_conn
		keys = r.keys "#{REDIS_KEY}:#{backend_key}#{q}"
		keys.map!{|x|x.split(":").last}
		keys.map!{|x| "#{@alias}#{SEP}#{x}"}
		keys 
	end

	# Pre-condition: a metric name (an element of the `get_all_metrics` array)
	# Post-condition: a valid json hash of: 
	#    [ 
	#      	{ "x": epoch, "y": value },
	#      	{ "x": epoch, "y": value },
	#      	...
	#    ] 
	def get_metric m, start=nil, stop=nil, step=nil, args={}
		raise NotImplementedError
	end
	
	# Generally, the metric id is the metric itself.
	def get_metric_id m; m;	end

	# Generally, the metric includes all meta data
	def get_metric_meta m; m; end

	# Is the metric returning live data? That is, can it be assumed to have
	# data values up to Time.now() within step tolerance?
	def live?
		true
	end

	def is_up? uri=@base_url 
		begin
			return true if Net::HTTP.get(URI.parse(uri))
		rescue
			return false
		end
	end

	# Define any rules to make a metric name stylized. Default, do nothing. 
	def style_metric style, metric
		m = URI.decode(metric)
		if style == :pretty then
			m.gsub(SEP, " - ").gsub(DELIM, ", ").gsub(KVP, " = ")
		elsif style == :table then
			'<p align="left">'+m.gsub(SEP, "<br>")+"</p>"
		else
			m
		end
	end

# Parent class functionality after this point
	def name
		self.class.name.split("::").last
	end
	
	def get_metric_url m, start, stop, step
		get_metric m, start, stop, step, {:return_url => true}
	end

	def json_metrics_list uri, args={}
		get_json uri, args, "Error retriving #{name} metrics list"
	end

	def json_metrics uri, args={}
		get_json uri, args, "Error retriving #{name} metric"
	end
	

	REDIS_KEY = Settings.metrics_key || "Machiavelli.Metrics"
	
	def redis_conn
		host = Settings.redis_host || "127.0.0.1"
		port = Settings.redis_port || 6379
		Redis.new(host: host, port: port)
	end

	def get_cached_metrics_list
		redis_conn.keys "#{REDIS_KEY}*"
	end

	def delete_metrics_cache
		r = redis_conn
		keys = r.keys REDIS_KEY+'*'
		keys.each { |k| r.del k } 
	end

	def backend_key 
		@alias 
	end

	def refresh_metrics_cache _alias=nil
		metrics = self.get_metrics_list

		r = redis_conn
		
		metrics.each {|m|
			r.set "#{REDIS_KEY}:#{backend_key}:#{m}", 1
		}
	end

### Helper functions

	# If a file exists within the extensions folder, require it
	def load_extension class_name
		base = class_name.downcase.gsub("::","/")
		ext = "#{Rails.root}/lib/extensions/#{base}.rb"

		if File.exists? ext
			require_dependency ext
		end
	end

	# Precond:  valid URI, optional error parsing lambda
	# Postcond: key-symbolized parsed JSON hash
	def get_json url, args={}, error_msg=""
		

		uri = URI.parse(url)
		
		puts "Get JSON: #{uri}" if Rails.env.development?

		http = Net::HTTP.new(uri.host, uri.port)

		if uri.is_a? URI::HTTPS then
			http.use_ssl = true
			http.verify_mode = OpenSSL::SSL::VERIFY_NONE
		end

		request = Net::HTTP::Get.new(uri.request_uri)
		if @username 
		        request.basic_auth(@username,@password);
		end

		begin
			response = http.request(request)
		rescue Errno::EHOSTUNREACH, Errno::ECONNREFUSED, SocketError => e
			raise Backend::Error, "#{error_msg}: #{e}"
		end

		if Rails.env.development?
			puts "Response: #{response.code}, body length: #{response.body.length} characters"
			puts "Body: #{response.body[0..50]}..."
		end
		
		if response.code.match(/2\d\d/)
			return JSON.parse(response.body, symbolize_names: true)
		else
			error = response.body
			error = args[:error_parse].call(error) if args[:error_parse]
			raise Backend::Error, "#{error_msg}: #{response.code} - #{error}"
		end
		
	end

	# Get the parameter named p, or fail
	def mandatory_param p
		param = @params[p.to_sym]
		if param.nil? 
			raise Backend::Error, "Must provide #{p} value"
		else
			param
		end
	end

	def optional_param p, default
		param = @params[p.to_sym]
		if param.nil?
			return default
		else
			param
		end
	end

end
class Backend::Error < StandardError; end
