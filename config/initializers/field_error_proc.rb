ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
	unless html_tag =~ /^<label/
		%{<div class="field_with_errors"><label
		%for="#{instance.send(:tag_id)}" class="message">#{instance.error_message.first}</label>#{html_tag}</div>}.html_safe
	else
		%{<div class="field_with_errors" class="error_label">#{html_tag}</div>}.html_safe
	end
end

