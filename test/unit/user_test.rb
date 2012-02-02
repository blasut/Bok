require_relative '../test_helper'

class User

end

class UserTest < MiniTest::Unit::TestCase
  #include Rack::Test::Methods

  def app
    MyApp
  end

  def test_that_user_exists
    @user = User.new 
  end

end
