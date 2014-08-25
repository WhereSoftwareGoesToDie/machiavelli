module Helpers
	def json_metrics_list uri, args={}
		get_json uri, args, "Error retriving #{@store} metrics list"
	end

	def json_metrics uri, args={}
		get_json uri, args, "Error retriving #{@store} metric"
	end

	# Test if a URI is responding
	def is_up? uri=@base_url
		begin
			#TODO test head only?
                        return true if Net::HTTP.get(URI.parse(uri))
                rescue
                        return false
                end
        end

	def origin_settings ostr
		Settings.origins.find{|o,k| o.to_s == ostr.to_s}
	end

	# Take a string of SEP, KVP, and DELIM ops and split it into a nice hash
        def keysplit m
                keys = Hash[*m.split(DELIM).map{|y| x = y.split(KVP); x.push("") if x.length !=2; x}.flatten]
                keys = Hash[keys.map{|k,v| [URI.decode(k), URI.decode(v)] }]
                keys
        end

        REDIS_KEY = Settings.metrics_key || "Machiavelli.Metrics"
  
        def redis_conn
                host = Settings.redis_host || "127.0.0.1"
                port = Settings.redis_port || 6379
                Redis.new(host: host, port: port)
        end

	# Get the parameter named p, or fail
	def delete_metrics_cache
                r = redis_conn
                keys = r.keys REDIS_KEY+'*'
                keys.each { |k| r.del k }
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
			raise Store::Error, "#{error_msg}: #{e}"
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
			raise Store::Error, "#{error_msg}: #{response.code} - #{error}"
		end
	end

	def mandatory_param p, sub=nil
		param = sub ? @settings[sub][p.to_sym] : @settings[p.to_sym]
		if param.nil?
			raise Store::Error, "Must provide #{p} value"
		else
			param
		end
	end

	def optional_param p, default
		param = @settings[p.to_sym]
		if param.nil?
			return default
		else
			param
		end
	end

end

