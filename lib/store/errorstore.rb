class Store::Errorstore < Store::Store
        def get_metric _,_,_,_
                raise Store::Error, "Invalid origin: '#{@origin_id}' not defined in settings"
        end   
        def get_metric_url _,_,_,_
                ""
        end     
        def get_metric_list
                []
        end
end
