require 'spec_helper'
require 'open-uri'

describe "Sieste", :js => true do

	settings = YAML.load(File.read("spec/sieste_settings.yml"))

	origins = settings["origins"]

	origins.each do |o|
	
		settings = o.last
		store_settings = settings["store_settings"]
		sieste_host = store_settings["host"]
		origin = store_settings["origin"]
		title = settings["title"]

		type = o.first

		begin
			URI.parse(sieste_host).read
		rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
			raise StandardError, "\n\nYou can't test the Sieste endpoint at #{sieste_host} unless it's live, dummy. \n\n#{e}\n\n"
		end

		source = URI.parse(sieste_host+"/simple/search?&origin=#{origin}")	
		metric = JSON.parse(source.read).first
		raise StandardError, "Sieste source #{source} offers no metrics" unless metric

		metric.gsub!("~", ":")

		help = Object.new.extend(Helpers) # .. reasons
		addr = help.keysplit(metric)["address"]

		metric = "#{type}~#{addr}" 

		context "Host #{sieste_host} with origin #{origin}" do
			before :each do 
				config = wrap_config o.first, o.last
				add_config config
				test_config type
			end

			context "refresh metrics" do
				include_examples "refresh metrics", origin, "Vaultaire"
			end

			context "graphs" do
				it_behaves_like "a graph", metric, title
			end
			
#			it "returns valid errors if provoked" do
#			 	expect_json_error "/metric/?metric=#{metric}&start=-1337"
#			end
		end
	end
end

describe "broken sieste" do
	it "doesn't work with an unconnectable sieste instance" do
		add_config type_config("Vaultaire", { host: 'http://idontwork.nope.org', origin: 'POTATO'})
		expect_json_error "/search"
	end
end
