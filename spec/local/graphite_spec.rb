require 'spec_helper'
describe "Graphite", :js => true do

	type = "Graphite"
	name = "carbon.agents.graphite-a.cache.queues"
	graphite_host = "192.168.122.219"
	metric = "#{type}:#{name}" 

	before :each do 
		add_config "backends: [{ type: '#{type}', settings: {url: 'http://#{graphite_host}'}}]"
		test_config type
	end

        context "refresh metrics" do
                include_examples "refresh metrics", type
        end

        context "standard" do
                it_behaves_like "a graph", "standard", metric
        end

        context "stacked" do
                it_behaves_like "a graph", "stacked", metric
        end

        context "horizon" do
                it_behaves_like "a graph", "horizon", metric
        end

	it "returns valid graphite errors if provoked" do
		visit "/metrics/?metric=#{metric}&start=-1337"
		json = JSON.parse(page.text)
		expect(json).to include "error"
		expect(json["error"]).to include "Graphite Exception raised"
	end
end

describe "broken graphite" do
	it "doesn't work with an unconnectable graphite instance" do
		add_config "backends: [{ type: 'graphite', settings: { url: 'http://idontwork.nope.org'}}]"
		visit "/refresh"
		expect(page).to have_css "div.alert-danger"
		expect(page).to have_content "Error retrieving Graphite metrics"
	end
end
