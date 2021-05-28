class V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  private
  def resource_params
    params.require(:session).permit(:email, :password, :password_confirmation)
  end
end