# Require any module we have defined in the library
Dir[File.dirname(__FILE__) + '/lib/**/*.rb'].each do |f| 
	require File.join(Rails.root, f)
end
