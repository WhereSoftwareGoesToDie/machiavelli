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

	def live
		true
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
end

