require 'spec_helper'

describe "Generic backend", :js => true do

	it "fails majestically" do
		add_config ""
		visit "/refresh"
		expect(page).to have_css "div.alert-danger"
		expect(page).to have_content "No backends configured"
	end
end
