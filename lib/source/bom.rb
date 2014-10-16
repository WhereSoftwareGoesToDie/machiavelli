class Source::Bom < Source::Source
	include Helpers

	BOM_VALUE= {"wind_spd_kmh"=> "Wind Speed, km/h", 
	     	"delta_t"=> "Wet Bulb Depression, degrees Celsius",
		"gust_kmh"=>"Wind Gust, km/h",
		"rain_trace"=>"Rain since 9am",
		"rel_hum"=> "Relative Humidity",
		"apparent_t" => "Apparent Temperature",
		"air_temp" => "Temperature"}

	def titleize metric
		site, met = metric.split("-")
		return [site.titleize, BOM_VALUE[met]].join(" - ")	

	end
end
