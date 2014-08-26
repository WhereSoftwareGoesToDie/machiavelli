require 'cgi'
require 'uri'
require 'git-version-bump'

# A whole heap of application helpers
module Layouts
	module ApplicationLayoutHelper

		include Helpers

		# Defaults for our UI
		UI_DEFAULTS = {	
			start: "3h",
			stop: "now",
			points: 600,
			graph: "standard",
			time: "relative",
			render: "line",
			stack: "off",
			clock: "utc"
		}
		
		# Method helper for defaults to the UI
		def ui_default s
			UI_DEFAULTS[s]
		end
		
		# Get the parameter from the HREF params, or use our default		
		def get_param s
			p = que_qs(s).first
			p = ui_default(s) if p.nil?
			p
		end

		# UI Error/informational messages
		def ui_message msg
			case msg
			when :no_graphs_selected; "No graphs selected. You should <a href='#filter_metrics' role='button' data-toggle='modal' data-target='#filter_metrics'>search</a> for one."
			when :no_backends; "No backends configured. Check your config/settings/{ENV}.yml file."
			else "UI MESSAGE VARIABLE NOT FOUND: #{msg}"
			end
		end

		# Read from the git tags, via git-version-bump, or from the .gvb_version file, for our version
		def version
			begin
				v = "#{GVB.major_version}.#{GVB.minor_version}.#{GVB.patch_version}"
			rescue
				v = File.read(".gvb_version") if File.exists?(".gvb_version")
			end
			link_to v, "https://github.com/anchor/machiavelli/releases/tag/v#{v}", target: "blank" if v
		end

		# Flash message styling based on the error level
		def flash_class(level)
		    case level
			when :notice  then "alert alert-info"
			when :success then "alert alert-success"
			when :error   then "alert alert-danger"
			when :warning then "alert alert-warning"
		    end
		end


		# Generator for Navbar Buttons
		def navbar_buttons param, buttons, args={}
			a = []
			buttons.each do |b|
				html = "<a type='button' class='btn btn-default "
				p = chk_qs(param,b) 
				html += "active" if (p || p.nil? && UI_DEFAULTS[param] == b) || args[:active]
				html += "' href='"+ chg_qs(param, b) +"'>"+b+"</a>"
				a << html
			end
			a
		end
		
		# Generator for generic Dropdowns
		def dropdown inner, args={}
			a = []
			prompt = (args && args[:prompt]) ? args[:prompt] + "  " : ""
			a << '<a type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+prompt+'<span class="caret">'\
			     '</span><span class="sr-only">Toggle Dropdown</span></a>'

			a << inner

			a.flatten
		end

		# Generator for Navbar Dropdowns
		def navbar_dropdown param, buttons, args={}
			p = que_qs(param).first || UI_DEFAULTS[param]
			active, list = buttons.partition{|b| b == p}

			b = []

			b << '<ul class="dropdown-menu" style="min-width: 0px; left: 0px">'
			buttons.each {|l|
				c = l == p ? "class='active'" : ""
				b << "<li #{c}><a href='#{chg_qs(param,l)}'>#{l}</a></li>"
			}

			b << '</ul>'
			a = active.first

			prompt_value = args[:prompt_value] || a

			label = (args[:label]) ? "#{param.to_s}:  #{prompt_value}  " : prompt_value
			dropdown(b, {prompt: label}).flatten

		end

		# Alter the Refresh error listing in redis
		def refresh_errors method=:show, error=nil
			one = "#"; two = "$"; key = "Machiavelli:RefreshErrors"
			if method == :save
				redis_conn.set key, error.map{|a| a.join(one)}.join(two)
			elsif method == :remove
				redis_conn.del key
			else
				e = redis_conn.get key 
				return [[]] if e.nil?
				e.split(two).map{|a| a.split(one)}
			end
		end


		# Query string manipulation functions
		
		# `Check` the key matches the value provided
		def chk_qs k,v,p={}; alter_qs :chk, k,v,p; end

		# `Query` the key
		def que_qs k,  p={}; alter_qs :que, k, false, p; end

		# `Change` the key &
		def chg_qs k,v,p={}; alter_qs :chg, k,v,p; end

		# `Add` the key & value
		def add_qs k,v,p={}; alter_qs :add, k,v,p; end

		# `Remove` the key and value
		def rem_qs k,v,p={}; alter_qs :rem, k,v,p; end

		# Completely `obliterate` the key and value
		def obl_qs k,  p={}; alter_qs :obl, k, false, p; end

		# From the provided query string, or part of the rails `request`, return a hah of of the query string
		# Required due to overloading of single-value parameters (`string[]=`)
		def query_hash p={}
			url = case 
				when p[:url] == :referer 
					request.referer
				when p[:url].is_a?(String)
					p[:url]
				else 
					request.url
				end

			query = URI::parse(url).query
			query.gsub!("metric=","metric[]=") if query
			query.gsub!("right=","right[]=") if query

			Rack::Utils.parse_nested_query(query) || {} 
		end

		# Convert a hash into a query string
		def hash_query hash
			x = []
			hash.each {|l,m| Array(m).each {|a| x << "#{l}=#{a}"}}
			"?#{x.join("&")}"
		end

		# Alter Query String using the flags from the *_qs methods
		def alter_qs method, k, v, p={}
			k = k.to_s
			hash = query_hash p
			case method
				when :chk
					return (hash[k] ? (hash[k] == v ? true : false) : nil)
				when :que #ry
					return Array(hash[k]) || []
				when :add
					if v.is_a? Array 
						hash[k] ? hash[k] += v : hash[k] = v
					else
						hash[k] ? hash[k] << v : hash[k] = v
					end
				when :chg 
					hash[k] = v
				when :rem #ove
					x = Array(hash[k])
					x.delete(v)
					x.empty? ? hash.delete(k) : hash[k] = x
				when :obl #iterate
					hash.delete(k)
			end
			
			hash_query hash
		end

		# Time manipulation functions
		
		# True if the parameter is an integer (not a good epoch check, but the best we can get)
		def is_epoch s 
			s.to_i.to_s == s
		end

		# Split a string into numerics and non numeric characters for later parsing
		def nicetime_split s
			s.split(/(\d+)/).reject{|c| c.empty?}
		end

		# True if the parameter is a "nice-time" (e.g. 3h, 12d)
		def is_nicetime s
			return false if is_epoch(s) #fast fail
			a,b = nicetime_split s
			return true if a.to_i.to_s == a and b.is_a? String
		end

		# Convert a "nice time" into it's absolute seconds since epoch time.
		def to_epoch s
			return "" if s.nil?
			return s.to_i if is_epoch(s)
			s = "0h" if s == "now"
			mult, time = nicetime_split s

			time_scale = (case time
				when "min"; "minutes"
				when "h"; "hours"
				when "d"; "days"
				when "w"; "weeks"
				end )
			eval("#{mult}.#{time_scale}.ago.to_i")
		end
	end
end
