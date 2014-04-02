Machiavelli::Application.routes.draw do
  root 'graphs#index'

  post "graph_filter_submit" => "graphs#graph_filter_submit", as: "graph_filter_submit"
  post "modal_filter_submit" => "graphs#modal_filter_submit", as: "modal_filter_submit"

  get "refresh" => "graphs#refresh", as: "refresh"

  get "metric" => "metrics#get", as: "get_metric"
  get "source" => "metrics#list", as: "list_metric" 
end
