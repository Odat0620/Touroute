class V1::LoggedInController < ApplicationController

  def logged_in
    if current_v1_user
      render json: { is_login: true, data: current_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
