require 'sinatra/base'
require_relative 'db/models'

class MyApp < Sinatra::Base
  # App code
  get '/' do
    erb :layout 
  end

  post '/login' do

  end

  post '/register' do

  end

  post '/payments' do
    puts params
    unless params[:title].empty? || 
            params[:sum].empty? ||
            params[:vat].empty? ||
            params[:date].empty?
      puts "INTE TOM!" 
      p = Payment.new
      p.attributes = params

      puts p.valid?

      p.save
    else
      puts "TOM!"
    end
  end

  # start the server if the ruby file is executed the ruby server directly
  run! if app_file == $0 
end
