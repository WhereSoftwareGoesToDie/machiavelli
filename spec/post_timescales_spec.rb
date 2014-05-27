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
		click_dropdown
		fill_in "time_number", with: "20"
		click_on "min"

		expect(current_url).to include "&stop=20min"

		click_dropdown
		click_on "now"

		expect(current_url).not_to include "&stop="

		# Absolute Time
		click_icon "calendar"

		now = Time.now().to_i
		start = now - 5400 
		stop = now - 600
		
		fill_in "time_start_time", with: epoch_to_local_date(start)
		fill_in "time_stop_time", with: epoch_to_local_date(stop)

		click_on "Go"
			
		expect(current_url).to include "&time=absolute"
		expect(current_url).to include "&start=#{start}"
		expect(current_url).to include "&stop=#{stop}"

	end
end

def epoch_to_local_date d
	Time.at(d).strftime("%d/%m/%Y %H:%M:%S %p")

end

def click_icon icon
	# Using the font-awesome class "icon-<variable>", find that <i>
	# element, and then walk up to the parent (`//..`), which is a button,
	# and click it

	first(:xpath, "//i[@class='icon-#{icon}']//..").click
end

def click_dropdown
	first(:xpath, "//span[@class='caret']//..").click
end
