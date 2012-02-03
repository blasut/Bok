require 'sinatra/base'
require_relative 'db/models'

class MyApp < Sinatra::Base
  # App code
  get '/' do
    erb :layout 
  end


  # start the server if the ruby file is executed the ruby server directly
  run! if app_file == $0 
end
