require 'spec_helper'
require 'redis'

describe "Basic Machiavelli Functionality", :js => true do

	it "has a front page with buttons" do
		visit "/"
		expect(page).to have_link "Machiavelli"
		expect(page).to have_link "Find metrics"

	end

	it "has a metrics API that errors if no metric supplied" do
		visit "/metric/"
		json = JSON.parse(page.text)
		expect(json).to include "error"
		expect(json["error"]).to include "must provide a metric"
	end
end


