module ApplicationHelper
	include Layouts::ApplicationLayoutHelper
	module BootstrapExtension
		FORM_CONTROL_CLASS = "form-control"
		BUTTON_CLASS = "btn btn-default"
	
		# Override the class value for whatever object type to include bootstrap values by default.
		# original definitions: https://github.com/rails/rails/blob/master/actionview/lib/action_view/helpers	
		def add_class_option class_name, add_class=FORM_CONTROL_CLASS
			if class_name.nil?
                                # Add 'form-control' as the only class if no class was provided
                                class_name = add_class
                        else
                                # Add ' form-control' to the class if it doesn't already exist
                                class_name << " #{add_class}" if " #{class_name} ".index(" #{add_class} ").nil?
                        end
			class_name
		end
=begin
		# Form objects to override
		def password_field(object_name, method, options = {})
			options[:class] = add_class_option options[:class]
			super #Call super to do the real work
		end

		def text_area(object_name, method, options = {})
			options[:class] = add_class_option options[:class]
			super #Call super to do the real work
		end
=end
		def text_field(object_name, method, options = {})
			options[:class] = add_class_option options[:class]
			super #Call super to do the real work
		end
	end

	# Add the modified method to ApplicationHelper
	include BootstrapExtension
end
