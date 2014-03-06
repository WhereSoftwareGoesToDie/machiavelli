require 'spec_helper'
require 'redis'

describe "Machiavelli", :js => true do

	TYPE = "Flatfile"
	METRIC = TYPE+":Metric"
	CHART = METRIC.tr(":.","_")+"_chart"

	it "has a front page with buttons" do
		visit "/"

		expect(page).to have_link "Machiavelli"

		graphs = ["standard","stacked","horizon"]
		graphs.each {|g| expect(page).to have_content g }

		time_scales = ["10min","1h","3h","1d","1w","2w"]
		time_scales.each {|g| expect(page).to have_content g }
	end

        it "can refresh metrics" do	
		r = Redis.new()
		
		metric_key = "Machiavelli.Backend.Metrics"

		r.del metric_key

		visit "/"		
		expect(page).to have_link "Machiavelli"

		metrics = r.smembers metric_key
		expect(metrics).to eq []
		
		visit current_path
	
		expect(page).not_to have_content TYPE
		
		click_on "refresh"

		expect(page).to have_content TYPE
		metrics = r.smembers metric_key
		expect(metrics.length).to be > 0 
	end

	it "has working buttons" do
		visit "/"
		click_on "10m" #time button
		expect(current_url).to include "start=10min"

		click_on "stacked" #graph button
		expect(current_url).to include "graph=stacked"

	end

	it "has standard graphs" do
		visit "/?metric=#{METRIC}"
	
		# Check there's a chart rendered on the page
		expect(page).to have_content METRIC
		expect(page).to have_css "div#multi_slider"
		expect(page).to have_css "div#chart_0"
		expect(page).to have_css "div.x_tick"
	end

	it "has horizon graphs" do
		visit "/?metric=#{METRIC}&graph=horizon"
	
		# Check there's a chart rendered on the page
		expect(page).to have_content METRIC
		expect(page).to have_css "div.horizon"
		expect(page).to have_css "div#horizon_graph"
		expect(page).to have_css "div.axis"
	end

	it "has stacked graphs" do
		visit "/?metric=#{METRIC}&graph=stacked"
	
		# Check there's a chart rendered on the page
		expect(page).to have_content METRIC
		expect(page).to have_css "div.rickshaw_graph"
		expect(page).to have_css "div#chart_container"
		expect(page).to have_css "div#axis0_stub"
	end

end

