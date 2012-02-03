require_relative '../test_helper'

class UserTest < MiniTest::Unit::TestCase
  #include Rack::Test::Methods

  def app
    MyApp
  end

  def setup
    @attributes = {
      :email => "test@example.com", 
      :password => "hej123"
    }
  end

  def test_that_user_exists
    user = User.new 
  end

  def test_that_user_can_register
    user = User.create!(@attributes)
  end

  def test_that_user_can_login
    user = User.create!(@attributes)
    User.get(@attributes) 
  end

end
