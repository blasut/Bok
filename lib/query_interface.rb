class QueryInterface
  attr_reader :query, :parts

  def initialize(query)
    @query = query.split(" ")  
  end


end
