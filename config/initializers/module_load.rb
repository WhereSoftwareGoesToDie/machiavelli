# Require any module we have defined in the library

# Recusive call to ensure all child directories, real and symlinked, are traversed.
def all_files_under(*paths)
  paths.flatten!
  paths.map! { |p| Pathname.new(p) }
  files = paths.select { |p| p.file? }
  (paths - files).each do |dir|
    files << all_files_under(dir.children)
  end
  files.flatten
end

all_files_under("lib").each do |f|
	require File.join(Rails.root, f.to_s)
end

