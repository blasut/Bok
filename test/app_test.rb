require_relative './test_helper'

class RoutingTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    MyApp
  end

  def setup
    @attr = {:email => "test@test.com",
                        :password => "hej123"}
    @user = User.first_or_create(@attr)

    @payment_attr = {
      :title => "Title",
      :sum => 123,
      :vat => 25,
      :date => Date.today
    }
  end
  
  def login
    post '/login', @attr
  end

  def test_that_root_works
    get '/'
    assert last_response.ok?
  end

  def test_that_login_works
    login
    assert last_response.body.include?('true_login')
  end

  def test_logging_in_with_wrong_credentials
    post '/login', @attr.merge(:password => "123hej")
    assert last_response.body.include?('false_login')
  end

  def test_that_you_can_register_an_account
    old_user_count = User.count
    post '/register', @attr.merge(:email => "test@example.com")
    assert last_response.body.include?('true')
    assert User.count, old_user_count + 1
  end

  def test_adding_a_payment_with_proper_attributes
    login
    payment_attr = {
      :title => "Title",
      :sum => 123,
      :vat => 25,
      :date => Date.today
    }
    post '/payments', payment_attr
    assert_equal "true", last_response.body
  end

end
