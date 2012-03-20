require_relative '../test_helper'

class AppTest < MiniTest::Unit::TestCase
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
      :date => Date.today,
      :payment_type => "ingoing"
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
    skip
    post '/login', @attr.merge(:password => "123hej")
    assert_equal "false", last_response.body
  end

  def test_that_you_can_register_an_account
    old_user_count = User.count
    post '/login', @attr.merge(:email => "test@example.com")
    assert_equal 'true_login', last_response.body
    assert old_user_count + 1, User.count 
  end

  def test_that_it_fails_when_email_already_exist
    skip
    post '/register', @attr.merge(:email => "test@example2.com")

    old_user_count = User.count
    post '/register', @attr.merge(:email => "test@example2.com")
    assert_equal 'false', last_response.body
    assert User.count, old_user_count
  end

  def test_adding_a_inpayment_with_proper_attributes
    skip
    login
    post '/payments', @payment_attr.merge(:payment_type => "ingoing")
    assert_equal "true", last_response.body
  end

  def test_adding_a_outpayment_with_proper_attributes
    login
    post '/payments', @payment_attr.merge(:payment_type => "outgoing")
    assert_equal "true", last_response.body
  end

  def test_adding_a_salarypayment_with_proper_attributes
    login
    post '/payments', @payment_attr.merge(:payment_type => "salary")
    assert_equal "true", last_response.body
  end

  def test_adding_a_payment_with_inproper_attributes
    login
    post '/payments', @payment_attr.merge(:payment_type => "kowadkoawdkoawkoddwa")
    assert_equal "false", last_response.body
  end

end
