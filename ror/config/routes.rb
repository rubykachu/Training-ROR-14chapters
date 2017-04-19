Rails.application.routes.draw do
  root 'static_pages#home'

  get 'static_pages/home'

  get 'static_pages/help'

  get 'static_pages/contact'

  get 'static_pages/about'

  get '/list',      to: 'categories#list'
  get '/help',      to: 'categories#help', as: '/helf'
  get '/home',      to: 'categories#home'
  get '/signup',    to: 'users#new'
  post '/signup',   to: 'users#create'
  get '/login',     to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :account_activations, only: :edit
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]


  # namespace "admin" do
  #   resources :posts, :comments
  # end
  # nested resource, collection, member
  # resources :user do 
  #   resources :posts
  # end
end
