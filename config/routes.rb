Machiavelli::Application.routes.draw do
  root 'graphs#index'

  post "submit" => "graphs#submit", as: "submit"
  post "stop_time" => "graphs#stop_time", as: "stop_time"
  post "absolute_time" => "graphs#absolute_time", as: "absolute_time"

  get "refresh" => "graphs#refresh", as: "refresh"

  get "metric" => "metrics#get", as: "get_metric"
  get "search" => "metrics#list", as: "list_metric"

  get "files" => "metrics#files", as: "list_files"
  get "files/:site" => "metrics#files", as: "list_files2"
end
