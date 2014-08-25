require 'spec_helper'
require './generate_flatfile'
describe "Time", :js => true do

	context "searches valid times" do
		
		before :each do
			metric = "datastream"
			add_config type_config("Flatfile", { file_name: 'public/flatfile_15s.csv', metric: metric})

			test_config metric
			@base_url = "?metric=#{metric}~#{metric}"
			@chart_title = "#{metric} - #{metric}"
		end

		it "in relative formats" do
			check_page @base_url
			check_page @base_url + "&start=2h"
			check_page @base_url + "&stop=2h"
			check_page @base_url + "&stop=0h"
			check_page @base_url + "&start=2h&stop=1h"
			check_page @base_url + "&start=1h&stop=50min"

			check_page @base_url + "&start=2h&stop=3h", false
			check_page @base_url + "&start=1h&stop=1h", false
			check_page @base_url + "&start=1h&stop=55min", false
			check_page @base_url + "&start=0h&stop=55min", false
			check_page @base_url + "&start=0h&stop=0h", false
		end

		it "in absolute formats" do
			now = Time.now().to_i
			start = now - 60*60
			stop = now

			check_page @base_url + "&start=#{start}"
			check_page @base_url + "&stop=#{stop}"
			check_page @base_url + "&start=#{start}&stop=#{stop}"
			check_page @base_url + "&start=#{start}&stop=#{start + 10 * 60}"

			check_page @base_url + "&start=#{stop}&stop=#{start}", false
			check_page @base_url + "&start=#{start}&stop=#{start}", false
			check_page @base_url + "&start=#{start}&stop=#{start + 5 * 60}", false
			check_page @base_url + "&start=#{now}&stop=#{now}", false
		
		end
		it "in mixed formats" do
			now = Time.now().to_i
			start = now - 60*60
			stop = now

			check_page @base_url + "&start=#{start}&stop=30min"
			check_page @base_url + "&start=3h&stop=#{stop - 60}"

			check_page @base_url + "&start=#{now}&stop=0h", false
			check_page @base_url + "&start=#{now}&stop=1h", false
			check_page @base_url + "&start=0h&stop=#{now}", false
		end
		
	end
end

def check_page url, expect_success=true
	visit url

	success = "#chart_0"
	failure = "div.alert-danger"

	expect(page.body.length).to be > 0

	if expect_success
		expect(page).to have_content @chart_title
		expect(page).to have_css success
		expect(page).not_to have_css failure
	else
		expect(page).not_to have_css success
		expect(page).to have_css failure
	end
end
