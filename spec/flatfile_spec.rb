require 'spec_helper'
require './generate_flatfile'

describe "Flatfiles backend", :js => true do

        type = "Flatfile"
	name = "Metric"
	metric = "#{type}~#{name}"
	
	before :each do
		add_config flatfile_config({file_name: 'public/flatfile_15s.csv', metric: name})
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

		add_config flatfile_config({file_name: file, metric: bad_backend})

		expect_json_error  "/metric/?metric=#{bad_backend}"
		expect_page_error  "/refresh"
	end
end

def flatfile_config settings
	return make_config "Flatfile", "Flatfile", "Flatfile", "Source", settings
end
