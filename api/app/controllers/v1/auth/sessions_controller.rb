class V1::Auth::SessionsController < DeviseTokenAuth::SessionsController

  def index
    if current_user
      render json: { is_login: true, data: current_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end

  private
  def resource_params
    params.require(:session).permit(:email, :password, :password_confirmation)
  end
end