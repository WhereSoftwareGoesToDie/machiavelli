require 'spec_helper'
require './generate_flatfile'

describe "Flatfiles backend", :js => true do

        type = "Flatfile"
	name = "Metric"
	metric = "#{type}~#{name}"
	
	before :each do
		add_config "backends: [{ type: '#{type}', settings: { file_name: 'public/flatfile_15s.csv', metric: '#{name}'}}]"
		test_config type
	end

	context "refresh metrics" do
		include_examples "refresh metrics", type
	end
	
	context "graphs" do
		it_behaves_like "a graph", metric
	end

end

describe "Broken Filefiles Backend", :js => true do	
	
	
	it "test fallback functionality" do

		bad_backend = "Flatfile~Potato"
		file = 'this_does_not_exist/nope.csv'
		add_config "backends: [{ type: 'flatfile', settings: { file_name: #{file}, metric: 'potato'}}]"
		visit "/metric/?metric=#{bad_backend}"
		json = JSON.parse(page.text)
		expect(json).to include "error"
		expect(json["error"]).to eq "File #{file} does not exist"

		visit "/refresh"
		expect(page).to have_css "div.alert-danger"
	end
end
