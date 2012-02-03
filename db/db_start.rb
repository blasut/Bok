require 'data_mapper'

DataMapper::setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/db/app.db")  

class User
  include DataMapper::Resource

  property :id, Serial
  property :email, String
  property :password, BCryptHash
  
  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  has n, :payments
end

class Payment
  include DataMapper::Resource

  property :id, Serial
  property :date, Date
  property :sum, Integer
  property :vat, Integer
  property :payout_type, Boolean
  property :ver_id, Serial

  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  belongs_to :user

end

DataMapper.finalize.auto_upgrade!
