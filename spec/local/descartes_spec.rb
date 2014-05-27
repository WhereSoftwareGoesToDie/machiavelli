require 'spec_helper'
require 'open-uri'
describe "Descartes", :js => true do


	descartes_string = ENV["TEST_DESCARTES_STRING"]
	descartes_string ||= ENV["TEST_DESCARTES_HOST"] +","+ ENV["TEST_DESCARTES_ORIGIN"]

	raise StandardError, "No DESCARTES environment variables specificied.\n"\
			     "Use TEST_DESCARTES_STRING in the form HREF1,ORIGIN1[,METRIC1]|HREF2,ORIGIN2[,METRIC2]|...,"\
			     "or one TEST_DESCARTES_HOST and one TEST_DESCARTES_ORIGIN" unless descartes_string

	descartes = descartes_string.split("|").map{|a| a.split("~")}

	descartes.each do |d|
	
		descartes_host = d[0]
		origin = d[1]
		metric = d[2] if d.length == 3

		begin
			URI.parse(descartes_host).read
		rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
			raise StandardError, "\n\nYou can't test the Descartes endpoint at #{descartes_host} unless it's live, dummy. \n\n#{e}\n\n"
		end

		unless metric 
	
			# No metric supplied? Use Dynamic
			source = URI.parse(descartes_host+"/simple/search?&origin=#{origin}")	
			metric = JSON.parse(source.read).first
			raise StandardError, "Descartes source #{source} offers no metrics" unless metric
		end

		metric.gsub!("~", ":")
		type = "Descartes"
		metric = "#{type}~#{metric}" 


		context "Host #{descartes_host} with origin #{origin}" do

			before :each do 
				add_config "backends: [{ type: '#{type}', settings: {url: '#{descartes_host}', origin: '#{origin}'}}]\nautoplay: false "
				test_config type
			end

			context "refresh metrics" do
				include_examples "refresh metrics", type
			end

			context "graphs" do
				it_behaves_like "a graph", metric
			end
			
			it "returns valid errors if provoked" do
				visit "/metric/?metric=#{metric}&start=-1337"
				json = JSON.parse(page.text)
				expect(json).to include "error"
				expect(json["error"]).to include "Descartes Exception raised"
			end
		end
	end
end

describe "broken descartes" do
	it "doesn't work with an unconnectable descartes instance" do
		add_config "backends: [{ type: 'descartes', settings: { url: 'http://idontwork.nope.org', origin: 'POTATO'}}]"
		expect{visit "/source"}.to raise_error
	end
end
