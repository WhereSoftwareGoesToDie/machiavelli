# Require any module we have defined in the library
Dir.glob("lib{,/*/**}/*.rb").each do |f| 
	require File.join(Rails.root, f)
end
