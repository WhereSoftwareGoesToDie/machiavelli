require 'spec_helper'

describe "Simple backend", :js => true do

        type = "Simple"
	name = "Clizia"
	host = "http://localhost:4567"
	metric = "#{type}~#{name}"
	
	before :each do
		add_config "backends: [{ type: '#{type}', settings: { url: '#{host}'}}]"
		test_config type
	end

	context "refresh metrics" do
		include_examples "refresh metrics", type
	end
	
	context "standard graphs" do
		it_behaves_like "a graph", "standard", metric
	end
	
	context "stacked graphs" do
		it_behaves_like "a graph", "stacked", metric
        end
	
	context "horizon graphs" do
		it_behaves_like "a graph", "horizon", metric
        end

end

