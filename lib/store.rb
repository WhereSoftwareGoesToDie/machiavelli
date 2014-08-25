class Store
	def initialize settings
		@settings = settings
		@store = settings.store
	end

	def get 
		return "got"
	end
	def id m
		m
	end

	def metadata m
		return m
	end

	def metadata_table m
		'<p align="left">'+m.gsub(SEP, "<br>")+"</p>"
	end

	def live?
		true
	end

	def get_metric
		raise NotImplemented
	end
	
        def refresh_metrics_cache _alias=nil
                metrics = get_metrics_list

                r = redis_conn

                metrics.each {|m|
                        r.set "#{REDIS_KEY}:#{@origin_id}:#{m}", 1
                }
        end

	def json_metrics_list uri, args={}
                get_json uri, args, "Error retriving #{@store} metrics list"
        end

        def json_metrics uri, args={}
                get_json uri, args, "Error retriving #{@store} metric"
        end

	

        REDIS_KEY = Settings.metrics_key || "Machiavelli.Metrics"

        def redis_conn
                host = Settings.redis_host || "127.0.0.1"
                port = Settings.redis_port || 6379
                Redis.new(host: host, port: port)
        end


	def get_metric_url
		raise NotImplemented
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
                param = @settings[p.to_sym]
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
class Store::Error < StandardError; end


