def generate step=15, datapoints=600
	step = 1 if step == 0

	file = "public/flatfile_#{step}s.csv"
	stop = Time.now().to_i
	start = stop - (datapoints * step)
	data = []
	(start..stop).step(step).each do |p|
		data.push "#{p},#{rand(100)}"
	end

	File.open(file, "w") do |f|
		f.puts data
	end

	puts "Generated #{file}"
end

generate 1
generate 15

