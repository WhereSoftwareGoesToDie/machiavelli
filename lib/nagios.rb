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



	# For nagios, add some nice things
	def metaadd meta
		if meta["service"] == "cpu" then
			color = { "Idle" => "#dddddd",  # an "idle" color
	   			"User" => "#3465a4", "System" => "#73d216", "Nice" => "#f57900", "Iowait" => "#cc0000", #pnp4nagios
				"Irq" => "#916f7c", "Softirq" => "#9955ff" , "Steal" => "#ffcc00" # fill the remaining palette

			}
		elsif meta["service"] == "mem" then
			color = { "Used" => "#729fcf", "Cached" => "#fcaf3e", "Buffers" => "#fce84f", "Free" => "#8ae234"} #pnp4nagios
		end

		color.each{|k,v| if meta["metric"].include? k then meta["color"] = v; end } if color

		return meta
	end
end
