require 'spec_helper'
require 'open-uri'
describe "Graphite", :js => true do

	type = "Graphite"
	name = "carbon.agents.graphite-a.cache.queues"
	graphite_host = ENV["TEST_GRAPHITE_HOST"]
	raise StandardError, "Missing environment variable ENV['TEST_GRAPHITE_HOST']" unless graphite_host
	metric = "#{type}~#{name}" 

	begin
                URI.parse(graphite_host).read
        rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
                raise StandardError, "\n\nYou can't test the Graphite endpoint at #{graphite_host} unless it's live, dummy. \n\n#{e}\n\n"
        end

	before :each do 
		add_config type_config(type, {url: graphite_host}) 
		test_config type
	end

        context "refresh metrics" do
                include_examples "refresh metrics", type
        end

        context "graphs" do
                it_behaves_like "a graph", metric
        end

	it "returns valid graphite errors if provoked" do
		expect_json_error "/metric/?metric=#{metric}&start=-1337"
	end
end

describe "broken graphite" do
	it "doesn't work with an unconnectable graphite instance" do
		add_config type_config('Graphite', { url: 'http://idontwork.nope.org'})
		expect_page_error "/refresh"
	end
end
