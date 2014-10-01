# Collector: https://github.com/anchor/vaultaire-collector-nagios
class Nagios < Source
	include Helpers

	# Humanize the title for the perfdata feed. Handles both v1 and v2 style Vaultaire metadata
	def titleize keys 
		nice = keys["host"]
		nice << keys["service"] unless keys["service"] == "host"
		nice << keys["metric"]

		return URI.decode(nice.join(" - "))

	end
end
