class V1::UsersController < ApplicationController
  include FirebaseAuthConcern
  before_action :set_auth_user, only: [:create, :update, :destory, :fetch_user_id_and_name]

  # ユーザーのidとnameを取得するメソッド
  def fetch_user_id_and_name
    # IDトークンの検証を走らせ、そのデコードの後のデータを元に該当ユーザーのレコードを取得
    get_user(@auth_user)

    # user.id と nameのみ返却するように新たにオブジェクトを作成
    user = {
      id: @user[:id],
      name: @user[:name],
      email: @user[:email]
    }

    render json: user
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    user = User.find(params[:id])

    user_without_uid = {
      id: user.id,
      name: user.name,
      profile: user.profile
    }

    render json: user_without_uid
  end

  def create
    create_user(@auth_user)
  end

  def destroy
    return if @user.email != params[:email]
    @user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:uid, :name, :email, :profile)
  end

  def set_auth_user
    @auth_user = authenticate_token_by_firebase
  end

  def get_user(auth_user)
    render json: auth_user, status: :unauthorized and return unless auth_user[:data]
    uid = auth_user[:data][:uid]
    @user = User.find_by(uid: uid)
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
