require_relative '../test_helper_lite'
require_relative '../../lib/query_interface' 

# Examples:
#
# Bevaka utbetalningar som innehåller "mat"
# Visa senaste utbetalningar där summan är högre än 5000
# Visa alla
# Visa utbetalningar där summan är mellan 1000 och 5000

class QueryInterfaceTest < MiniTest::Unit::TestCase

  def it
    QueryInterface.new "Visa alla"
  end

  def test_that_it_accepts_strings
    q = QueryInterface.new "Visa alla"
  end

  def test_that_it_returns_the_query_when_asked
    assert_equal "Visa alla", it.query 
  end

end
