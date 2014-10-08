# Collector: Demonstration Wave 
# https://github.com/anchor/vaultaire/blob/master/src/DemoWave.hs
class Source::Demowave < Source::Source

	# Return a nice title no matter the input
	def titleize str
		"Demonstration Sinusoidal Wave"
	end
end
