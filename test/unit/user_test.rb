require_relative '../test_helper'

class UserTest < MiniTest::Unit::TestCase
  #include Rack::Test::Methods

  def app
    MyApp
  end

  def setup
    @attributes = {
      :email => "example@example.com", 
      :password => "hej123"
    }
  end

  def test_that_user_exists
    user = User.new 
  end

  def test_that_user_can_be_created
    user = User.create!(@attributes)
  end


end
