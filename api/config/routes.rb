Rails.application.routes.draw do
  namespace :v1 do
    resources :users do
      get :fetch_user_data, on: :collection
    end
    resources :relationships, only: [:create, :destroy]
    resources :posts do
      resources :comments, only: [:create, :destroy]
      resources :likes, only: [:create, :destroy]
    end
  end
end
