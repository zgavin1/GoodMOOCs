Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :courses
    resources :reviews
    resource :session, only: [:create, :destroy, :show]
    resources :users, except: [:edit]
  end
end
