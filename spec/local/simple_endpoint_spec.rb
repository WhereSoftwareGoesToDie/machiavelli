require 'spec_helper'
require 'open-uri'

describe "Simple backend", :js => true do

        type = "Simple"
	name = "Clizia"
	host = "http://localhost:4567"
	metric = "#{type}~#{name}"
	
	begin 
		URI.parse(host).read
	rescue Errno::ECONNREFUSED,Errno::EHOSTUNREACH => e
		raise StandardError, "\n\nYou can't test the Sinatra endpoint at #{host} unless it's live, dummy. \n\n#{e}\n\n"
	end

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

