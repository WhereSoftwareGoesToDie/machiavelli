Machiavelli::Application.routes.draw do
  root 'graphs#index'

  post "graph_filter_submit" => "graphs#graph_filter_submit", as: "graph_filter_submit"
  post "filter_metrics" => "graphs#filter_metrics", as: "filter_metrics"

  get "refresh" => "graphs#refresh", as: "refresh"

  get "metrics/:metric" => "metrics#get", as: "get_metric"
end
