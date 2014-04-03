require 'spec_helper'
require 'redis'

describe "Basic Machiavelli Functionality", :js => true do

	it "has a front page with buttons" do
		visit "/"

		expect(page).to have_link "Machiavelli"

		graphs = ["standard","stacked","horizon"]
		graphs.each {|g| expect(page).to have_content g }

		time_scales = ["10min","1h","3h","1d","1w","2w"]
		time_scales.each {|g| expect(page).to have_content g }
	end

	it "has working buttons" do
		visit "/"
		click_on "10m" #time button
		expect(current_url).to include "start=10min"

		click_on "stacked" #graph button
		expect(current_url).to include "graph=stacked"

	end

	it "has a metrics API that errors if no metric supplied" do
		visit "/metric/"
		json = JSON.parse(page.text)
		expect(json).to include "error"
		expect(json["error"]).to include "must provide a metric"
	end
end


