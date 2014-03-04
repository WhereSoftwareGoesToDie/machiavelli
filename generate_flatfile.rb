file = "public/flatfile.csv"

datapoints = 600
step = 1

stop = Time.now().to_i
start = stop - (datapoints * step)


data = []
(start..stop).step(step).each do |p|
	data.push "#{p},#{rand(100)}"
end

File.open(file, "w") do |f|
	f.puts data
end


