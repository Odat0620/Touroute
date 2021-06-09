Rails.application.routes.draw do
  namespace :v1 do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'v1/auth/registrations',
      sessions: 'v1/auth/sessions'
    }
    get '/logged_in', to: 'logged_in#logged_in'
    resources :users
  end
end
