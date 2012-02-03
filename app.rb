require 'sinatra/base'
require_relative 'db/models'

class MyApp < Sinatra::Base
  # App code
  enable :sessions

  get '/' do
    @logged_in = session[:logged_in]
    t = Time.now
    @time = t.strftime("%Y/%m/%d") 
    erb :layout 
  end

  post '/login' do
    user = User.first(:email => params[:email],
                 :password => params[:password])

    unless user.nil?
      session[:logged_in] = true
      session[:current_user_id] = user.id
      "true_login"
    else
      "false_login"
    end
  end

  get '/logout' do
    session[:logged_in] = false
    redirect '/'
  end

  post '/register' do
    # Check if the user exists, then add
    if User.register params
      "true"
    else
      "false"
    end
  end

  post '/payments' do
    puts params
    unless params[:title].empty? || 
            params[:sum].empty? ||
            params[:vat].empty? ||
            params[:date].empty?
      puts "INTE TOM!" 
      u = User.get(session[:current_user_id])
      p = u.payments.create(params)
    else
      puts "TOM!"
    end
  end

  # start the server if the ruby file is executed the ruby server directly
  run! if app_file == $0 
end
