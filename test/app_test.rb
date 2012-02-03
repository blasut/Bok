require_relative './test_helper'

class RoutingTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    MyApp
  end

  def test_that_root_works
    get '/'
    assert last_response.ok?
  end

end
