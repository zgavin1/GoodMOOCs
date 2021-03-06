class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    @current_user.reset_session_token!
    self.session[:session_token] = @current_user.session_token
  end

  def require_user!
   redirect_to new_session_url if current_user.nil?
  end

  def sign_out!
   current_user.try(:reset_token!)
   session[:session_token] = nil
 end
end
