require 'spec_helper'
require './generate_flatfile'
describe "Post Timescales", :js => true do

	it "Returns valid data using the GUI and POST searches" do
		metric = ["thing_one"]
		
		url_metrics  = metric.map{|x| "#{x}~#{x}"}
		nice_metrics = metric.map{|x| "#{x} - #{x}"}

		backends = []
		metric.each do |m|
			backends << "{type: 'Flatfile', alias: '#{m}', settings: { file_name: 'public/flatfile_1s.csv', metric: '#{m}'}}"
		end

		add_config "backends: [#{backends.join(",")}]"
		test_config metric[0]
	
		visit "/?metric=#{url_metrics[0]}"

		# Relative time is default
		expect(page.body).to include "icon-calendar"
		click_icon "calendar"
		expect(current_url).to include "&time=absolute"


		click_icon "rocket"
		expect(current_url).to include "&time=relative"


		# Relative Time
		click_stop_dropdown
		fill_in "time_number", with: "20"
		click_on "min"

		expect(current_url).to include "&stop=20min"

		click_stop_dropdown
		click_on "now"

		expect(current_url).not_to include "&stop="

		# Absolute Time
		click_icon "calendar"

		now = Time.now().to_i - 12*60*60

		now = Time.now().to_i

		time_check now            # Now
		time_check now - 12*60*60 # 12 hours ago (AM/PM Test)
	end
end

def time_check now
	start = now - 5400 
	stop = now - 600

	nice_start = epoch_to_local_date(start)
	nice_stop = epoch_to_local_date(stop)

	fill_in "time_start_time", with: nice_start
	fill_in "time_stop_time", with: nice_stop

	expect(page).to have_field("time_start_time", with: nice_start)

	click_on "Go"
		
	expect(current_url).to include "&time=absolute"
	expect(current_url).to include "&start=#{start}"
	expect(current_url).to include "&stop=#{stop}"
end


def epoch_to_local_date d
	Time.at(d).strftime("%d/%m/%Y %H:%M:%S")

end

def click_icon icon
	# Using the font-awesome class "icon-<variable>", find that <i>
	# element, and then walk up to the parent (`//..`), which is a button,
	# and click it

	first(:xpath, "//i[@class='icon-#{icon}']//..").click
end

def click_stop_dropdown
	all("a").select{|a| a.text.include? "stop: "}.first.click
end
