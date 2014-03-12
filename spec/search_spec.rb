require 'spec_helper'
require './generate_flatfile'
describe "Search", :js => true do


	it "searches valid metrics" do
		metric = ["thing_one", "thing_two", "the_other_one"]
		search = "thing"
		filtered = metric.select{|x| x.include? search}.map{|x| "Flatfile:#{x}"}

		backends = []
		metric.each do |m|
			backends << "{type: 'flatfile', settings: { file_name: 'public/flatfile_1s.csv', metric: '#{m}'}}"
		end
		
		add_config "backends: [#{backends.join(",")}]"
		test_config "Flatfile"

		fill_in "search_filter", with: "#{search}\n"


		# Check listings of li on the sidenav
		find("#graphed_metrics").all("li span").each do |x|
			expect(filtered).to include x.text
		end

		find("#available_metrics").all("li span").each do |x|
			expect(filtered).not_to include x.text
		end


		# Check Generated URL
		url_params = current_url.split("?").last.split("&").flatten.map{|x| { x.split("=").first.to_sym =>  x.split("=").last}}
		
		url_params.each do |x|
			expect(filtered).to include x[:metric]
		end

        end

end
