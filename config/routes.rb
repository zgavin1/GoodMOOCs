Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'
  get 'auth/google', to: 'sessions#omniauth2_google'

  namespace :api, defaults: {format: :json} do
    resources :courses
    resources :reviews
    resource :session, only: [:create, :destroy, :show]
    resources :users, except: [:edit]
    get "search", to: "utils#search"
  end
end
