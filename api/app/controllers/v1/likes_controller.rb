class V1::LikesController < ApplicationController
  before_action :set_user

  def create
    return if !User.find(like_params[:user_id])

    like = @user.likes.build(post_id: params[:post_id])
    if like.save
      render status: :created
    end
  end

  def destroy
    like = Like.find_by(post_id: params[:post_id], user_id: @user.id)

    return if like.user_id != params[:user_id]

    if like.destroy
      render status: :ok
    end
  end

  private
    def set_user
      @user = User.find(params[:user_id])
    end

    def like_params
      params.require(:like).permit(:user_id, :post_id)
    end
end
