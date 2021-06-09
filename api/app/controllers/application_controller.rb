class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
  include AbstractController::Helpers


  skip_before_action :verify_authenticity_token, raise: false
  helper_method :current_user, :user_signed_in?

  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end

	# before_action :split_tokens
  # prepend_after_action :join_tokens

	# private
	# 	def split_tokens
	# 		return if request.headers['X-Access-Token'].nil?

  #     token = JSON.parse(Base64.decode64(CGI.unescape(request.headers['X-Access-Token'])))
  #     request.headers['access-token'] = token['access-token']
  #     request.headers['client'] = token['client']
  #     request.headers['uid'] = token['uid']
	# 	end

	# 	def join_tokens
  #     return if response.headers['access-token'].nil?

  #     auth_json = {
  #       'access-token' => response.headers['access-token'],
  #       'client' => response.headers['client'],
  #       'uid' => response.headers['uid'],
  #     }
  #     response.headers.delete_if{|key| auth_json.include? key}
  #     response.headers['X-Access-Token'] = CGI.escape(Base64.encode64(JSON.dump(auth_json)))
  #   end
end
