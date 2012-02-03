require_relative '../test_helper_lite'
require_relative '../../lib/query_interface' 

class QueryInterfaceTest < MiniTest::Unit::TestCase
  def QueryInterface 
    @qi = QueryInterface.new 
  end

  def test_it_works
    assert_equal true, false
  end
end
