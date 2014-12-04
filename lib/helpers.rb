require 'net/http'
require 'uri'
require 'ostruct'
require 'interpolate'
# Library filers file
module Helpers

	# Wrapper for getting json, with relevant error message
	def json_metrics_list uri, args={}
		get_json uri, args, "Error retrieving #{@settings.title} #{@settings.store} metrics list"
	end

	# Wrapper for getting json, with relevant error message
	def json_metrics uri, args={}
		get_json uri, args, "Error retrieving #{@settings.title} #{@settings.store} metric"
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

	# Given an origin ID, find the key/value in the settings file and return it, plus the search key
	def origin_settings ostr
		settings = Settings.origins.find{|o,k| o.to_s == ostr.to_s}
		unless settings
			# Use a Error store, default Source if no settings found
			return [ostr,OpenStruct.new({store: "Errorstore", source: "Source"})]
		end
		settings
	end

	# Take a string of SEP, KVP, and DELIM ops and split it into a nice hash
        def keysplit m
                keys = Hash[*m.split(DELIM).map{|y| x = y.split(KVP); x.push("") if x.length !=2; x}.flatten]
                keys = Hash[keys.map{|k,v| [URI.decode(k), URI.decode(v)] }]
                keys
        end

	# Base parent key for all our Redis doings
        REDIS_KEY = Settings.metrics_key || "Machiavelli.Metrics"

	# Create a redis connection object
        def redis_conn
                host = Settings.redis_host || "127.0.0.1"
                port = Settings.redis_port || 6379
                Redis.new(host: host, port: port)
        end

	# Remove all keys from the redis
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

	# For a given key, ensure it exists in the Settings hash. Fail if this is not the case
	def mandatory_param p, sub=nil
		raise Store::Error, "Mandatory configuration #{p} not found in section #{sub} for #{@settings.title} origin" unless @settings[sub]
		param = sub ? @settings[sub][p.to_sym] : @settings[p.to_sym]
		if param.nil?
			raise Store::Error, "Must provide mandatory configuration value for #{p} in #{@settings.title} #{@settings.store}"
		else
			param
		end
	end

	# For a given key, check if it exists in the Settings hash. Otherwise, shrug and use the default given.
	def optional_param p, default, sub=nil
		param = sub ? @settings[sub][p.to_sym] : @settings[p.to_sym]
		if param.nil?
			return default
		else
			param
		end
	end

	# Library initaliziation helper
	def init_store name, origin=nil, settings={}
		init_lib "Store", name, origin, settings
	end

	def init_source name, origin=nil, settings={}
		init_lib "Source", name, origin, settings
	end

	def init_lib type, name, origin, settings
		name = name.titleize
		file = File.join(Rails.root, "lib", type.downcase, name.downcase+".rb")
		unless File.exists? file
			raise Store::Error, "Library file #{file} does not exist. Check settings."
		end

		return "#{type}::#{name}".constantize.new origin, settings
	end


	# Data Sanitization
	def top_tail_pad data, start, stop, step, pad=nil
		padded = []

		data = data.sort{|a,b| a[:x] <=> b[:x]}

		(data[0][:x] - step).step(start, -step).each{|x| padded.push({x:x, y: pad}) }

		padded.reverse!
		padded.concat data

                ((data[-1][:x] + step)..stop).step(step).each{|x| padded.push({x:x, y: pad}) }

		padded.take((stop - start)/step)
	end

	def interpolate data, start, stop, step
		lerp = []

		d = {}
		# Format to prefered format and nils to NaN for Interpolate::
		data.each{|i| y = i[:y] || (0.0/0.0); d[i[:x]] = y}

		# Dirty cheater
		path = Interpolate::Points.new(d)
		(start..stop).step(step).each do |x|
			y = path.at(x)
			lerp << {x: x, y: y}
		end

                # Ensure a hard limit on the size of the array before returning
                point_c = (stop - start) / step
                lerp.take(point_c)
	end

	def data_sanitize data, start, stop, step
		data = top_tail_pad(data, start, stop, step)

                if @settings.store_settings.interpolate
                        interpolate(data, start, stop, step).to_json
                else
                        data.to_json
                end
	end

end

