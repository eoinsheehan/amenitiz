require "capybara/rails"
require "capybara/rspec"

Capybara.server = :puma, {Silent: true}
Capybara.default_driver = :selenium_chrome_headless
Capybara.javascript_driver = :selenium_chrome_headless
