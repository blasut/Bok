require 'sinatra/base'

class MyApp < Sinatra::Base
  # App code
  get '/' do
    "Hello World"
  end


  # start the server if the ruby file is executed the ruby server directly
  run! if app_file == $0 
end
