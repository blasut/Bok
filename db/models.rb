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
  property :email, String, :required => true, :unique_index => true
  property :password, String, :required => true
  
  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  has n, :payments


  def self.register(params)
    # Check if the user exists, if not then create
    user = User.first_or_create(:email => params[:email],
               :password => params[:password])
    if user.save
      user
    else
      nil
    end
    #binding.pry
  end

end

class Payment
  include DataMapper::Resource

  property :id, Serial
  property :title, String, :required => true
  property :date, Date, :required => true
  property :sum, Integer, :required => true
  property :vat, Integer
  property :payment_type, Integer, :required => true
  property :ver_id, Integer  
  
  #Timespamps
  property :created_at, DateTime                           
  property :updated_at, DateTime  

  belongs_to :user

   

end

DataMapper.finalize.auto_upgrade!
