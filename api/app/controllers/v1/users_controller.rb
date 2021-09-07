class V1::UsersController < ApplicationController
  include FirebaseAuthConcern
  before_action :set_auth_user, only: [:create, :fetch_user_data]
  before_action :set_user, only: [:update, :destroy]

  # ユーザーデータを取得するメソッド
  def fetch_user_data
    # dbにユーザーが存在しなければ処理を終了
    return unless User.find_by(uid: @auth_user[:data][:uid])

    # IDトークンの検証を走らせ、そのデコードの後のデータを元に該当ユーザーのレコードを取得
    get_user(@auth_user)

    render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    user = User.includes({posts: [:comments, :liked_users]},
                         {liked_posts: [:user, :comments, :liked_users]},
                         :following,
                         :followers).find(params[:id])

    render json: user.as_json(include: [
        {posts: {include: [{comments: {only: :id.length}},
                           {likes:    {only: :user_id}}],
                except:   [:text, :route]}},
        {liked_posts: {include: [user:    {only: [:id, :name, :avatar]},
                                comments: {only: :id.length},
                                likes:    {only: :user_id}],
                        except: [:text, :route]}},
        {following:   {except: [:uid, :email, :updated_at]}},
        {followers:   {except: [:uid, :email, :updated_at]}}
    ], except: [:uid] )
  end

  def create
    create_user(@auth_user)
  end

  def update
    return if @user.uid != user_params[:uid]

    if @user.update(user_params.except(:uid, :email))
      render json: @user, status: :ok
    else
      render json: @user, status: :unprocessable_entity
    end
  end

  def destroy
    return if @user.uid != user_params[:uid]

    if @user.destroy
      render status: :ok
    end
  end

  private
  def user_params
    params.permit(:id, :uid, :name, :email, :profile, :avatar, :location)
  end

  def set_auth_user
    @auth_user = authenticate_token_by_firebase
  end

  def get_user(auth_user)
    render json: auth_user, status: :unauthorized and return unless auth_user[:data]
    uid = auth_user[:data][:uid]
    @user = User.find_by(uid: uid)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def create_user(auth_user)
    render json: auth_user, status: :unauthorized and return unless auth_user[:data]

    uid = auth_user[:data][:uid]
    render json: { message: "すでに登録されています" } and return if User.find_by(uid: uid)

    user = User.new(uid: uid, name: params[:name], email: params[:email])
    if user.save
      render json: { message: "アカウントを作成しました。" }
    else
      render json: user.errors.messages, status: :unprocessable_entity
    end
  end

end
