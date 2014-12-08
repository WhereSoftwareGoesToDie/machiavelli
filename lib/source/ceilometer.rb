# Collector: https://github.com/anchor/ceilometer-publisher-vaultaire
class Source::Ceilometer < Source::Source
	include Helpers

	# Take a metric metadata string, and return a human readable title
	def titleize metric
		keys = metric
		nice = []

		display_name = nil

		# Given the metadata for a OpenStack object, this should return human readable metric names
		# Only attempt to use a nicer name if we get sufficient metadata back from our calls
		if keys["metric_name"] then

			# Create a Store object from the settings file to search metrics for us
			store = init_store @settings.store, @origin_id, @settings

			if keys["metric_name"] == "image.download" || keys["metric_name"] == "image.serve" then
				search = store.search_metrics "*gauge*image*#{keys["resource_id"]}*"
				if search.length >= 1
					result = keysplit(search.first)
					display_name = "(#{result["name"]})"
				end
			end
		end

		# If we found a nicer name, use that. Otherwise, try and default it
		if display_name
			nice << display_name
		else
			nice << (keys["display_name"] || keys["name"] || keys["id"])
		end

		nice << keys["metric_name"]
		nice << keys["metric_type"]
		nice << keys["_unit"]

		return URI.decode(nice.delete_if{|a| a.nil?}.join(" - "))
	end
end
