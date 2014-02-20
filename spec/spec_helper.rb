require 'capybara/rspec'
require 'capybara/webkit'
require 'capybara/dsl'
require 'rspec'

Capybara.app_host = ENV['APP_HOST'] || raise("Need an APP_HOST to point at")
Capybara.run_server = false

Capybara.default_wait_time = 10  
LONG_WAIT_TIME = 60
 
unless ENV['BROWSER'] == "firefox" then
	Capybara.default_driver = :webkit 
	Capybara.javascript_driver = :webkit
end

RSpec.configure do |config|
        config.include Capybara::DSL
	config.fail_fast = true
end
