class V1::CommentsController < ApplicationController
  def create
    return if !User.find(comment_params[:user_id])

    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    return if @comment.user_id != params[:comment][:user_id]

    @comment.destroy
  end

  private
    def comment_params
      params.permit(:text, :post_id, :user_id)
    end
end
