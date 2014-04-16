require 'spec_helper'
require 'open-uri'
describe "Descartes", :js => true do

	descartes_host = ENV["TEST_DESCARTES_HOST"]
	raise StandardError, "Missing environment variable ENV['TEST_DESCARTES_HOST']" unless descartes_host
	origin = ENV["TEST_DESCARTES_ORIGIN"]
	raise StandardError, "Missing environment variable ENV['TEST_DESCARTES_ORIGIN']" unless origin

	begin
                URI.parse(descartes_host).read
        rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
                raise StandardError, "\n\nYou can't test the Descartes endpoint at #{descartes_host} unless it's live, dummy. \n\n#{e}\n\n"
        end

	# Since origin is dynamic, should just use one of the sources we can
	# see, as opposed to hard coding it here
	source = URI.parse(descartes_host+"/simple/search?&origin=#{origin}")	
	name = JSON.parse(source.read).first.gsub("~", ":")
	type = "Descartes"
	metric = "#{type}~#{name}" 

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

describe "broken descartes" do
	it "doesn't work with an unconnectable descartes instance" do
		add_config "backends: [{ type: 'descartes', settings: { url: 'http://idontwork.nope.org', origin: 'POTATO'}}]"
		expect{visit "/source"}.to raise_error
	end
end
