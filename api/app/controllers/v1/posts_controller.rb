class V1::PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy]
  def index
    @posts = Post.includes(:user, :liked_users, :comments).all

    render json: @posts.as_json(include: [
      {user:     {only: :name}},
      {comments: {only: :id.length}},
      {likes:    {only: :id.length}}
    ])
  end

  def show
    @post = Post.includes(:user, :liked_users, {comments: :user}).find(params[:id])

    render json: @post.as_json(include: [
      {user:     {only: :name } },
      {comments: {include: {user: {only: [:id, :name]}}}},
      {likes:    {include: {user: {only: [:id]}}}}
      ])

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
