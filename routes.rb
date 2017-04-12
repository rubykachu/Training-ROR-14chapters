Rails.application.routes.draw do
  get 'users/index' => 'persons#list'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :index, :create, :update, :delete] do
  	member do
  		get :posts, :recent_posts
  		post :posts
  	end
  	
  	collection do 
  		get :follow_users
  	end

  end

  namespace :admin do
  	get :admin_users, :posts
	end

end
