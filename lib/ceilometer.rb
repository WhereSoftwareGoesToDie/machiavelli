# Collector: https://github.com/anchor/ceilometer-publisher-vaultaire

class Ceilometer < Source
	include Helpers
	def titleize metric

		keys = keysplit(metric)
		nice = []

		display_name = nil
=begin
		# Given the metadata for a OpenStack object, this should return human readable metric names
		@origin = "4YL1CF" ## TODO - dynamic this
		if keys["counter_name"] then
			if (keys["counter_name"].include? "network.") then
				uri = "#{@base_url}/simple/search?origin=#{@origin_id}&q=*memory*#{keys["instance_id"]}*"
				result = keysplit(machiavelli_encode((get_json uri).first))
				display_name = "(#{result.last["hostname"]})"
			end
			if keys["counter_name"] == "image.download" || keys["counter_name"] == "image.serve" then
				uri = "#{@base_url}/simple/search?origin=#{@origin_id}&q=*gauge*image*#{keys["resource_id"]}*"
				test = get_json uri
				test = test.select{|m| m.include? "resource%5fid~#{keys["resource_id"]}," }
				test = test.select{|m| m.include? "counter%5fname~image," } if test.length > 1
				result = keysplit(machiavelli_encode test.first)
				display_name = "(#{result.last["name"]})"
			end
		end
=end
		if display_name
			nice << display_name
		else
			nice << (keys["display_name"] || keys["name"] || keys["id"])
		end

		nice << (keys["display_name"] || keys["name"] || keys["id"])
		nice << keys["counter_name"]
		nice << keys["counter_type"]
		nice << keys["_unit"]
		return URI.decode(nice.join(" - "))
	end
end
