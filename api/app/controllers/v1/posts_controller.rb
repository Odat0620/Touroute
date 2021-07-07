class V1::PostsController < ApplicationController
  before_action :set_post, only: [:show]
  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    render json: @post
  end

  def create
    return if !User.find(post_params[:user_id])

    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
  end

  def destroy
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :text, :user_id, route: {})
    end
end
