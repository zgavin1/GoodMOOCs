Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'

  namespace :api, defaults: {format: :json} do
    resources :courses
    resources :reviews
    resource :session, only: [:create, :destroy, :show]
    resources :users, except: [:edit]
    get "search", to: "utils#search"
  end
end
