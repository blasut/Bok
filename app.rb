require 'sinatra/base'
require_relative 'db/models'

class MyApp < Sinatra::Base
  # App code
  enable :sessions

  def root
    @logged_in = session[:logged_in]
    @time = Time.now.strftime("%Y/%m/%d") 
    erb :layout 
  end

  get '/' do
    root
  end

  get  %r{/app(/.*)?} do
    root
  end

  post '/payments' do
    u = User.get(session[:current_user_id])
    p = u.payments.create(params)
     
    if p.saved?
      "true"
    else
      "false"
    end
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

  # start the server if the ruby file is executed the ruby server directly
  run! if app_file == $0 
end
