require 'rubygems'

ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'capybara/rspec'
require 'capybara/rails'
require 'capybara/webkit'
require 'binding_of_caller'

require './generate_flatfile'

Capybara.javascript_driver = :webkit

RSpec.configure do |config|
	config.include Capybara::DSL
	config.mock_with :rspec
	config.order = "random"
end
