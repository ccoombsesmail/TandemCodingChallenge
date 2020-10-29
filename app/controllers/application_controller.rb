class ApplicationController < ActionController::Base

  protect_from_forgery unless: -> { request.format.json? }
  helper_method :current_user, :logged_in?, :demo_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def demo_user
    @demo_user = User.find_by(username: 'DemoUser')
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_logged_in
    render json: ['Must Be Logged In'] unless logged_in?
  end
end
