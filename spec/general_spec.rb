require 'spec_helper'
require 'redis'

describe "Basic Machiavelli Functionality", :js => true do

	it "has a front page with buttons" do
		visit "/"
		expect(page).to have_link "Machiavelli"
		expect(page).to have_link "Search"

	end

	it "has a metrics API that errors if no metric supplied" do
		expect_json_error "/metric/"
	end
end


