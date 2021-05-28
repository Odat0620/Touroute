class Api::V1::UserController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :image, :profile)
  end

end
