require 'spec_helper'
require './generate_flatfile'
describe "Search", :js => true do

	it "searches valid metrics" do
		metric = ["thing_one", "thing_two", "the_other_one"]
		search = "thing"
		url_metrics  = metric.select{|x| x.include? search}.map{|x| "#{x}~#{x}"}
		nice_metrics = metric.select{|x| x.include? search}.map{|x| "#{x} - #{x}"}

		backends = []
		metric.each do |m|
			backends << "{type: 'Flatfile', alias: '#{m}', settings: { file_name: 'public/flatfile_1s.csv', metric: '#{m}'}}"
		end

		add_config "backends: [#{backends.join(",")}]"
		test_config metric[0]
	
		visit "/"

		add_metric metric[0], search

		# Check listings of li on the sidenav
		graphed = find("#graphed_metrics").all("li span").map{|c| c.text}
		expect(graphed[0]).to eq nice_metrics[0]
		expect(graphed).not_to include nice_metrics[1]
		expect(graphed).not_to include nice_metrics[2]

		# Check Generated URL
		url_params = current_url.split("?").last.split("&").flatten.map{|x| { x.split("=").first.to_sym =>  x.split("=").last}}
		url_met = url_params.map{|x| x[:metric]}
	
		expect(url_met[0]).to eq url_metrics[0]
		expect(url_met).not_to include url_metrics[1]
		expect(url_met).not_to include url_metrics[2]

		# Check headers
		headers = all("h4").map{|c| c.text}
		expect(headers[0]).to eq nice_metrics[0]
		expect(headers).not_to include nice_metrics[1]
		expect(headers).not_to include nice_metrics[2]

		# Check is a chart
		expect(page).to have_css "#chart_0" # standard chart

		# ANOTHER!
		add_metric metric[1], search
		
		# Check listings of li on the sidenav
		graphed = find("#graphed_metrics").all("li span").map{|c| c.text}
		expect(graphed[0]).to eq nice_metrics[0]
		expect(graphed[1]).to eq nice_metrics[1]
		expect(graphed).not_to include nice_metrics[2]

		# Check Generated URL
		url_params = current_url.split("?").last.split("&").flatten.map{|x| { x.split("=").first.to_sym =>  x.split("=").last}}
		url_met = url_params.map{|x| x[:metric]}
	
		expect(url_met[0]).to eq url_metrics[0]
		expect(url_met[1]).to eq url_metrics[1]
		expect(url_met).not_to include url_metrics[2]

		# Check headers
		headers = all("h4").map{|c| c.text}
		expect(headers[0]).to eq nice_metrics[0]
		expect(headers[1]).to eq nice_metrics[1]
		expect(headers).not_to include nice_metrics[2]

	end
end

def add_metric m, search=m
	# Invoke Modal
	click_on 'Find metrics'

	# Fill in select2
	fill_in "s2id_autogen1", with: search

	# Click all search results contain search string	
	all(".select2-result").each do |x|
		expect(x.find("div").text).to include search
	end

	# Select the searched for option and enter
	find(:xpath, "//li/div[contains(.,'#{m}')]").click
	click_on "Filter"

end

