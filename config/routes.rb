Rails.application.routes.draw do
  namespace :admin do
    resources :products
  end
  get "*path", to: "react#show", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # Defines the root path route ("/")
  root "react#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check
  post "/checkout", to: "checkout#create"

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", :as => :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", :as => :pwa_manifest
end
