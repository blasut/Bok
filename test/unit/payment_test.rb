require_relative '../test_helper'

class PaymentTest < MiniTest::Unit::TestCase
  #include Rack::Test::Methods

  def app
    MyApp
  end

  def setup
    @user = User.first_or_create(
      :email => "example@payment.com", 
      :password => "hej123"
    )
    @attr = {
      :title => "Title",
      :sum => 123,
      :vat => 25,
      :date => Date.today,
      :payment_type => 0
    }
  end

  def test_that_payment_exist
    p = @user.payments.create(@attr)
    assert p.title, "Title"
  end

  def test_that_payment_requires_title
    p = @user.payments.create(@attr.merge(:title => ""))
    assert_equal false, p.saved?
  end

  def test_that_payment_requires_sum
    p = @user.payments.create(@attr.merge(:sum => nil))
    assert_equal false, p.saved?
  end

  def test_that_payment_vat_is_optional
    p = @user.payments.create(@attr.merge(:vat => nil))
    assert_equal true, p.saved?
  end

  def test_that_payment_requires_date
    p = @user.payments.create(@attr.merge(:date => nil))
    assert_equal false, p.saved?
  end

  def test_that_payment_requires_payment_type
    p = @user.payments.create(@attr.merge(:payment_type => nil))
    assert_equal false, p.saved?
  end

end
