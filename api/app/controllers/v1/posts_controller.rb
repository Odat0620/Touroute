class V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    render json: @post.as_json(include: { user: { only: :name } })
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
    return if @post.user_id != post_params[:user_id]

    if @post.update(post_params)
      render json: @post, status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    return if @post.user_id != params[:user_id]

    @post.destroy
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :text, :user_id, route: {})
    end
end
