class Iptraffic < Source
	include Helpers

	def titleize metric 
		keys = keysplit(metric)
		nice << keys["ip"]
		nice << case keys["bytes"]
		when "rx"; " bytes received"
		when "tx"; " bytes transmitted"
			else keys["bytes"]
		end
		return URI.decode(nice.join(" - "))
	end
end
