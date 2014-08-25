require 'spec_helper'
require 'open-uri'

def enverr 
	raise StandardError, "No SIESTE environment variables specificied.\n" \
	     "Use TEST_SIESTE_STRING in the form HREF1~ORIGIN1[~METRIC1]|HREF2~ORIGIN2[~METRIC2]|...," \
	     "or one TEST_SIESTE_HOST and one TEST_SIESTE_ORIGIN"
end

describe "Sieste", :js => true do

	enverr unless ENV["TEST_SIESTE_STRING"] || ENV["TEST_SIESTE_HOST"]

	sieste_string = ENV["TEST_SIESTE_STRING"]
	sieste_string ||= ENV["TEST_SIESTE_HOST"] +"~"+ ENV["TEST_SIESTE_ORIGIN"]

	enverr unless sieste_string

	sieste = sieste_string.split("|").map{|a| a.split("~")}

	sieste.each do |d|
	
		sieste_host = d[0]
		origin = d[1]
		metric = d[2] if d.length == 3
		begin
			URI.parse(sieste_host).read
		rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
			raise StandardError, "\n\nYou can't test the Sieste endpoint at #{sieste_host} unless it's live, dummy. \n\n#{e}\n\n"
		end

		unless metric 
			# No metric supplied? Use Dynamic
			source = URI.parse(sieste_host+"/simple/search?&origin=#{origin}")	
			metric = JSON.parse(source.read).first
			raise StandardError, "Sieste source #{source} offers no metrics" unless metric
		end

		metric.gsub!("~", ":")
		type = "Vaultaire"
		metric = "#{type}~#{metric}" 

		context "Host #{sieste_host} with origin #{origin}" do
			before :each do 
				add_config sieste_config({host: sieste_host, origin: origin})
				test_config type
			end

			context "refresh metrics" do
				include_examples "refresh metrics", type
			end

			context "graphs" do
				it_behaves_like "a graph", metric
			end
			
			it "returns valid errors if provoked" do
			 	expect_json_error "/metric/?metric=#{metric}&start=-1337"
			end
		end
	end
end

describe "broken sieste" do
	it "doesn't work with an unconnectable sieste instance" do
		add_config sieste_config({ host: 'http://idontwork.nope.org', origin: 'POTATO'})
		expect_json_error "/source"
	end
end
def name; "Vaultaire"; end
def sieste_config settings
	make_config name, name, name, "Nagios",settings
end
