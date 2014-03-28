require 'json'
require 'net/http'
require 'colored'
require 'date'

def puts_point h
	x = Time.at(h[0].to_i) #.to_datetime.to_s.gsub!("T"," " )
	y = h[1]
	puts "#{x}: #{y}"
end

$val_count = 0
$val_succ = 0 
def validate item, a, b, tol=0
	$val_count += 1
	at = "Expected #{item}"	
	bt = "Actual #{item}"
	len = 24 # [at.length, bt.length].max

	puts "#{at.ljust(len)} : #{a}"
	puts "#{bt.ljust(len)} : #{b}"
	
	if a == b || a.to_i == b.to_i then
		$val_succ += 1
		puts "PERFECT!".green
	elsif ((a.to_f - b.to_f).abs.to_i < tol.to_i) then
		$val_succ += 1
		puts "GOOD!   Difference only #{a.to_f - b.to_f}, within tolerance #{tol}".green
	else
		tol = tol + 1 if tol == 0
		puts "BAD ->  Difference #{a.to_f - b.to_f} (~#{((a.to_f - b.to_f)/tol.to_i).round(2)} times tolerance)".red
	end
	puts ""
end

url = ARGV[0]

puts "\nDescartes Query"


path = url.split("/").last.split("?").first
query = url.split("?").last

puts "#{"metric".ljust(10)} = #{path}"
query.split("&").each{|a| 
	x = a.split("="); 
	d = "  (#{Time.at(x[1].to_i)}) " if ["start","end"].include? x[0]
	puts "#{x[0].ljust(10)} = #{x[1]} #{d}"
}
puts ""

puts "getting..."
uri = URI.parse(url)
http = Net::HTTP.new(uri.host, uri.port)
result = http.get uri.request_uri
json = JSON.parse(result.body, :symbolize_names => true)



json[0..5].each do |h|
	puts_point h
end

puts "..."
json.reverse[0..5].reverse.each do |h|
	puts_point h
end

xd = json.map{|x| x[0]}
yd = json.map{|y| y[1]}

puts "\nX Domain: #{xd.min} - #{xd.max} (#{xd.max - xd.min})"
puts "Y Domain: #{yd.min} - #{yd.max} (#{yd.max - yd.min})"



puts "\nAnalysis\n"

s = {}
query.split("&").each do |q|
	a = q.split("=")
	s[a[0]] = a[1]
end


puts "Dataset Length should be (end - start) / interval"
exp_ds_length = ( s["end"].to_i - s["start"].to_i) / s["interval"].to_i
validate "Dataset Length", exp_ds_length, json.length 

puts "Start date of data should match asked for start date (within reason)"
validate "Start Date", s["start"], json[0][0], s["interval"]

puts "End date of data should match asked for end date (within reason)"
validate "End Date", s["end"], json.last[0], s["interval"]

puts "Interval of data should match expected interval"
validate "Interval", s["interval"], (json[1][0] - json[0][0])


res =  "Total Checks: #{$val_count}. Successful checks #{$val_succ}"
if $val_count == $val_succ then
	puts res.green
else 
	puts res.red
end
