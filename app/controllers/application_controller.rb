class ApplicationController < ActionController::Base
	protect_from_forgery

	# given a metric string, return the backend instance
	# return generic if no string. 
	def backend m=nil

                return Backend::GenericBackend.new if m.nil?

                type = m.split(":").first
                settings = Settings.backends.map{|h| h.to_hash}.select{|a| (a[:alias] || a[:type]).casecmp(type) == 0}.first
                return "Backend::#{settings[:type].titleize}".constantize.new settings[:settings]
	end
end

