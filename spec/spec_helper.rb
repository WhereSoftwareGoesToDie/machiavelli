require 'simplecov'
SimpleCov.start 'rails'

if ENV["TRAVIS"] then
	require 'coveralls'
	Coveralls.wear!
end

require 'rubygems'

ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'capybara/rspec'
require 'capybara/rails'
require 'capybara/webkit'
require 'binding_of_caller'
require 'redis'


TEMP_YML = "temp_settings.yml"
REDIS_METRIC_KEY = "Machiavelli.Metrics"

Capybara.javascript_driver = :webkit unless ENV["BROWSER"] == "firefox"
Capybara.server_port = 31337
RSpec.configure do |config|
	config.include Capybara::DSL
	config.mock_with :rspec
#	config.fail_fast = true
#	config.order = "random"
end

shared_examples 'a graph' do |type, metric|
	it "should present a valid #{type} graph for #{metric}" do
		visit "/?metric=#{metric}"
		click_on type
		nice_metric = metric.split("~").join(" - ")
		
		expect(page).to have_content nice_metric
		
		if type == "standard" then
			css = ["#multi_slider","#chart_0",".x_tick"]
		elsif type == "stacked" then
			css = [".rickshaw_graph","#chart_container",".legend-indent",".y_axis"]
		elsif type == "horizon" then
		 	css = [".horizon","#horizon_graph",".axis"]
		end

		expect(page).not_to have_css "div#alert-danger"

		["10min","1h","3h","1d","1w","2w"].each do |time|
			click_on time
			wait_for_ajax
			css.each do |c|
				expect(page).to have_css "div#{c}"
			end
		end

		
	end
end

shared_examples 'refresh metrics' do |type|
	it "can refresh metrics of type #{type}" do
		r = Redis.new()

		metric_key = REDIS_METRIC_KEY+"*"

		keys = r.keys metric_key
		keys.each { |k| r.del k }

                visit "/"
                expect(page).to have_link "Machiavelli"

                metrics = r.keys metric_key
                expect(metrics).to eq []

                visit current_path

                expect(page).not_to have_content type

		visit "/refresh"

		expect(page).not_to have_css "div#alert-danger"
		visit "/source/"
                expect(page).to have_content type

                metrics = r.keys metric_key
                expect(metrics.length).to be > 0 
	end
end


def add_config config 
	File.open(TEMP_YML, "w") do |f|
		f.puts config
	end
	Settings.reload_from_files(TEMP_YML)
	visit "/refresh"
end

def test_config type
	expect(page).not_to have_css "div#alert-danger"
	visit "/source/"
	expect(page).to have_content type
end

def wait_for_ajax

        wait_time = 20
        counter = 0

	while page.evaluate_script("$.active").to_i > 0
                counter += 0.1
                sleep(0.1)
                if counter >= wait_time then
                        raise "AJAX request took longer than #{wait_time} seconds."
                end
        end
end
