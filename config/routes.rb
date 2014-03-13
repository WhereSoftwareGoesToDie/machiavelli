Machiavelli::Application.routes.draw do
  root 'graphs#index'

  post "graph_filter_submit" => "graphs#graph_filter_submit", as: "graph_filter_submit"
  post "modal_filter_submit" => "graphs#modal_filter_submit", as: "modal_filter_submit"

  get "refresh" => "graphs#refresh", as: "refresh"

  get "metrics" => "metrics#get", as: "get_metric"
end
