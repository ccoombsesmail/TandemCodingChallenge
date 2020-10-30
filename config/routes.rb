Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :scores, only: [:create, :index]
  end

  root to: 'static_pages#root'
end
