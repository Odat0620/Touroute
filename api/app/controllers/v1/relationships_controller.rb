class V1::RelationshipsController < ApplicationController
  before_action :set_users

  def create
    following = @current_user.follow(@other_user)
    render status: :created
  end

  def destroy
    @current_user.unfollow(@other_user)
    render status: :ok
  end


  private
    def set_users
      @current_user = User.find_by(uid: params[:uid])
      @other_user = User.find(params[:other_user_id])
    end
end
