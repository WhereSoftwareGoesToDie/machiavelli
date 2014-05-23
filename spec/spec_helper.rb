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

Capybara.default_wait_time = 2
Capybara.server_port = 31337

AJAX_WAIT_TIME = 30

Capybara.javascript_driver = :webkit unless ENV["BROWSER"] == "firefox"

RSpec.configure do |config|
	config.include Capybara::DSL
	config.mock_with :rspec
	config.fail_fast = true
#	config.order = "random"
end

shared_examples 'a graph' do |metric|
	["10min","1h","3h","1d","1w","2w"].each do |t|
		time_css_button metric, "standard", t, ["#multi_slider","#chart_0",".x_tick"]
		time_css_button metric, "stacked",  t, [".rickshaw_graph","#chart_container",".y_axis"]
		time_css_button metric, "horizon",  t, [".horizon","#horizon_graph",".axis"]
	end
end


def time_css_button metric, type, time, css
	it "and should generate valid css for #{metric}, type #{type} for time #{time}" do
		visit "/?metric=#{metric}&graph=#{type}&start=#{time}"  
		wait_for_ajax type, metric, time
		
		expect(page).not_to have_css "div.alert-danger"
		expect(page).to have_content metric.split("~").first # .join(" - ") 

		m = metric.split(/[,:~]/)
		if m.include? "hostname"
			h = m[m.index("hostname")+1]
			expect(page).to have_content h
		end

		css.each do |c|
			expect(page).to have_css "div#{c}"
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

		expect(page).not_to have_css "div.alert-danger"
		visit "/source/"
                expect(page).to have_content type

                metrics = r.keys metric_key
		if type != "Descartes" then
			expect(metrics.length).to be > 0 
		end
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
	expect(page).not_to have_css "div.alert-danger"
	visit "/source/"
	expect(page).to have_content type
end

def wait_for_ajax *args

        wait_time =  AJAX_WAIT_TIME

	unless ENV["TRAVIS"] then
		counter = 0
		while page.evaluate_script("$.active").to_i > 0
			counter += 0.1
			sleep(0.1)
			if counter >= wait_time then
				raise "AJAX request took longer than #{wait_time} seconds. Args used: #{args}"
			end
		end
        end
end
