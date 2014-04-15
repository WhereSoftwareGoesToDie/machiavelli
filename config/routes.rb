Machiavelli::Application.routes.draw do
  root 'graphs#index'

  post "submit" => "graphs#submit", as: "submit"

  get "refresh" => "graphs#refresh", as: "refresh"

  get "metric" => "metrics#get", as: "get_metric"
  get "source" => "metrics#list", as: "list_metric" 
end
