# Generic IP Traffic Collector. i
# Assumes sieste-style metadata in the form address, bytes: [tx,rx], collection_point: [datacenter], ip: [IPv4,IPv6]
class Source::Iptraffic < Source::Source
	include Helpers

	# Use the useful parts of the metadata as the title
	def titleize keys 
		nice = []
		nice << keys["ip"]
		nice << case keys["bytes"]
		when "rx"; " bytes received"
		when "tx"; " bytes transmitted"
			else keys["bytes"]
		end
		return URI.decode(nice.join(" - "))
	end
end
