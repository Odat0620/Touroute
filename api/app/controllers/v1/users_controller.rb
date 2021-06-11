class V1::UsersController < ApplicationController
  before_action :set_user, only: [:destory]

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    return if @user.email != params[:email]
    @user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :profile)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
