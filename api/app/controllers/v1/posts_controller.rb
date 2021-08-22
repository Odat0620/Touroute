class V1::PostsController < ApplicationController
  before_action :set_post, only: [:update, :destroy]
  def index
    @posts = Post.includes(:user, :liked_users, :comments).all

    render json: @posts.as_json(include: [
      {user:     {only: [:name, :avatar]}},
      {comments: {only: :id.length}},
      {likes:    {only: :user_id}}
    ] )
  end

  def show
    @post = Post.includes(:user, :liked_users, {comments: :user}).find(params[:id])

    puts @post
    render json: @post.as_json(include: [
      {user:     {only: [:name, :uid, :avatar] } },
      {comments: {include: {user: {only: [:id, :name, :avatar]}}}},
      {likes:    {only: :user_id}}
      ])

  end

  def create
    return if !User.find(post_params[:user_id])

    route = JSON.parse(post_params[:route])
    data = {title:   post_params[:title],
            text:    post_params[:text],
            user_id: post_params[:user_id],
            image:   post_params[:image],
            route:   route}

    @post = Post.new(data)
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
      params.permit(:title, :text, :user_id,  :image, :route)
    end
end
