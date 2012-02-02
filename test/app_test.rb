require_relative './test_helper'

class MyAppTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_that_minitest_works
    assert_equal true, true
  end

  def test_that_root_works
    get "/"
    assert last_response.ok?
  end


end
