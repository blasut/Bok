require 'data_mapper'
require 'dm-validations'

if ENV['RACK_ENV'] == "test"
  db_name = "test"
else
  db_name = "app"
end


DataMapper::setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/db/#{db_name}.db")  

class User
  include DataMapper::Resource

  property :id, Serial
  property :email, String, :unique_index => true
  property :password, String
  
  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  has n, :payments

end

class Payment
  include DataMapper::Resource

  property :id, Serial
  property :title, String
  property :date, Date
  property :sum, Integer
  property :vat, Integer
  property :payout_type, Boolean
  property :ver_id, Integer

  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  belongs_to :user

end

DataMapper.finalize.auto_upgrade!
