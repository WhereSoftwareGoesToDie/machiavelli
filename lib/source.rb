class Source
	def initialize source=nil
		@source = source
	end

	def titleize str
		return str
	end

	# Take a string of SEP, KVP, and DELIM ops and split it into a nice hash
	def keysplit m
                keys = Hash[*m.split(DELIM).map{|y| x = y.split(KVP); x.push("") if x.length !=2; x}.flatten]
                keys = Hash[keys.map{|k,v| [URI.decode(k), URI.decode(v)] }]
                keys
        end

end
