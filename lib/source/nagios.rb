# Collector: https://github.com/anchor/vaultaire-collector-nagios
class Source::Nagios < Source::Source
	include Helpers

	# Humanize the title for the perfdata feed. Handles both v1 and v2 style Vaultaire metadata
	def titleize keys 
		nice = []

		if keys.include? "hostname"
			nice << keys["hostname"]
			nice << keys["service_name"] unless keys["service_name"] == "host"
			nice << keys["metric"]
		else
			nice << keys["host"]
			nice << keys["service"] unless keys["service"] == "host"
			nice << keys["metric"]
		end

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
		elsif meta["service"] == "neutron-L3_agents" then
			color = { "l3_agents_alive" => "#54CA05", "l3_agents_dead" => "#2A6403", "routers_dead" => "#ff0000", "routers_alive" => "#ffeb00"}
		end

		color.each{|k,v| if meta["metric"].include? k then meta["color"] = v; end } if color

		return meta
	end

	def suggest params

		stacks_on = "&graph=stacked&render=area&stack=on"
		area_on   = "&graph=stacked&render=area"

		store = init_store @settings.store, @origin_id, @settings

		query = {}
		style = ""
		query[:host]    =  params[:host].to_s
		query[:service] = "*#{params[:service].to_s}*"


		# Pre query conditionals
		case params[:service]
			when "cpu" then
				query[:metric] = "*Percent*"
		end

		result = (store.adv_search_metrics query).map{|r| keysplit r}

		# Post query conditionals
		case params[:service]
			when "cpu", "mem" then 
				style = stacks_on
			when "load" then 
				result = result.sort_by{|a| a["metric"].split(params[:service]).last.to_i}
			when "diskio" then
				result = result.select{
					|a| (a["metric"].include? "overall") && (a["metric"].include? "bytes")
				}
				style = right_on result 
		end

		"?#{result.map{|r| "&metric=#{urlify r}"}.join("")}#{style}"
	end

	def urlify r
		"#{@origin_id}#{SEP}#{r.address}"
	end

	def right_on ms, index=-1
		right = ms[index]
		return "&graph=stacked&right=#{urlify right}"
	end

end
