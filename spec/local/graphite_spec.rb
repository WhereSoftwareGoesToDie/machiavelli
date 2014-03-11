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

end
