Rails.application.routes.draw do
  namespace :v1 do
    resources :users do
      get :fetch_user_id_and_name, on: :collection
    end
  end
end
