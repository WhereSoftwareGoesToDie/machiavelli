require 'spec_helper'
require 'open-uri'

def enverr 
	raise StandardError, "No VAULTAIRE environment variables specificied.\n" \
	     "Use TEST_VAULTAIRE_STRING in the form HREF1~ORIGIN1[~METRIC1]|HREF2~ORIGIN2[~METRIC2]|...," \
	     "or one TEST_VAULTAIRE_HOST and one TEST_VAULTAIRE_ORIGIN"
end

describe "Vaultaire", :js => true do

	enverr unless ENV["TEST_VAULTAIRE_STRING"] || ENV["TEST_VAULTAIRE_HOST"]

	vaultaire_string = ENV["TEST_VAULTAIRE_STRING"]
	vaultaire_string ||= ENV["TEST_VAULTAIRE_HOST"] +"~"+ ENV["TEST_VAULTAIRE_ORIGIN"]

	enverr unless vaultaire_string

	vaultaire = vaultaire_string.split("|").map{|a| a.split("~")}

	vaultaire.each do |d|
	
		vaultaire_host = d[0]
		origin = d[1]
		metric = d[2] if d.length == 3
		begin
			URI.parse(vaultaire_host).read
		rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
			raise StandardError, "\n\nYou can't test the Vaultaire endpoint at #{vaultaire_host} unless it's live, dummy. \n\n#{e}\n\n"
		end

		unless metric 
			# No metric supplied? Use Dynamic
			source = URI.parse(vaultaire_host+"/simple/search?&origin=#{origin}")	
			metric = JSON.parse(source.read).first
			raise StandardError, "Vaultaire source #{source} offers no metrics" unless metric
		end

		metric.gsub!("~", ":")
		type = "Vaultaire"
		metric = "#{type}~#{metric}" 

		context "Host #{vaultaire_host} with origin #{origin}" do
			before :each do 
				add_config "backends: [{ type: '#{type}', settings: {url: '#{vaultaire_host}', origin: '#{origin}'}}]\nautoplay: false "
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

describe "broken vaultaire" do
	it "doesn't work with an unconnectable vaultaire instance" do
		add_config "backends: [{ type: 'vaultaire', settings: { url: 'http://idontwork.nope.org', origin: 'POTATO'}}]"
		expect_json_error "/source"
	end
end
