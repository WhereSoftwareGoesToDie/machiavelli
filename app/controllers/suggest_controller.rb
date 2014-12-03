class SuggestController < ApplicationController
	
	include Layouts::ApplicationLayoutHelper
	include Helpers

	def get
		origin = params[:origin]
		
		settings = origin_settings(origin).last
		source = init_source settings.source, origin, settings
		
		suggestion = source.suggest params

		if suggestion.is_a? Hash
			render json: suggestion	
		else 
			redirect_to suggestion
		end
	end
end
