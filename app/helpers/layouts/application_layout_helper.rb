require 'cgi'
require 'uri'
require 'git-version-bump'


module Layouts
	module ApplicationLayoutHelper
		UI_DEFAULTS = {	
			start: "3h",
			stop: "now",
			points: 600,
			graph: "standard",
			time: "relative",
			render: "line",
			stack: "off"
		}
		
		def ui_default s
			UI_DEFAULTS[s]
		end
		
		def get_param s
			p = que_qs(s).first
			p = ui_default(s) if p.nil?
			p
		end

		def ui_message msg
			case msg
			when :no_graphs_selected; "No graphs selected. You should <a href='#filter_metrics' role='button' data-toggle='modal' data-target='#filter_metrics'>search</a> for one."
			when :no_backends; "No backends configured. Check your config/settings/{ENV}.yml file."
			else "UI MESSAGE VARIABLE NOT FOUND: #{msg}"
			end
		end

		def version
			begin
				v = "#{GVB.major_version}.#{GVB.minor_version}.#{GVB.patch_version}"
			rescue
				v = File.read(".gvb_version") if File.exists?(".gvb_version")
			end
			link_to v, "https://github.com/anchor/machiavelli/releases/tag/v#{v}", target: "blank" if v
		end

		def flash_class(level)
		    case level
			when :notice  then "alert alert-info"
			when :success then "alert alert-success"
			when :error   then "alert alert-danger"
			when :warning then "alert alert-warning"
		    end
		end

		def render_sidenav
			partial = "partial/sidenav/metric_search"
			render(partial: partial)
		end

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

		def dropdown inner, args={}
			a = []
			prompt = (args && args[:prompt]) ? args[:prompt] + "  " : ""
			a << '<a type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+prompt+'<span class="caret">'\
			     '</span><span class="sr-only">Toggle Dropdown</span></a>'

			a << inner

			a.flatten
		end

		def navbar_dropdown param, buttons, args={}
			p = que_qs(param).first || UI_DEFAULTS[param]
			active, list = buttons.partition{|b| b == p}
	
			b = []

			b << '<ul class="dropdown-menu">'
			list.each {|l|
				b << "<li><a href='#{chg_qs(param,l)}'>#{l}</a></li>"
			}
			
			b << '</ul>'
			a = active.first

			label = (args[:label]) ? "#{param.to_s}:  #{a}  " : a 
			dropdown(b, {prompt: label}).flatten

		end

	# Backend Helpers
		def style_metric style, metric
			(init_backend metric).style_metric style, metric
		end

		# Backend intialization 
		# No Name? -> Generic
		# Name, no settings? Search for settings in config
		# Name, and settings? Use settings and name, as given

		def init_backend name=nil, settings=nil
			return Backend::GenericBackend.new if name.nil?

			unless settings
				name = name.split(SEP).first if name.include? SEP
				
				backend = Settings.backends.map{|h| h.to_hash}.select{|a| (a[:alias] || a[:type]).casecmp(name) == 0}.first
				raise StandardError, "backend #{name} doesn't exist" if backend.nil?
				name = backend[:type]
				settings = backend[:settings].to_hash.merge({alias: backend[:alias] || backend[:type]})
			end
			return "Backend::#{name.titleize}".constantize.new settings
		end

		def backends 
			list = []
			Settings.backends.each {|b|
				list << (b.alias || b.type)
			}
			list
		end

		def refresh_errors method=:show, error=nil
			one = "#"; two = "$"; key = "Machiavelli:RefreshErrors"
			if method == :save
				init_backend.redis_conn.set key, error.map{|a| a.join(one)}.join(two)
			elsif method == :remove
				init_backend.redis_conn.del key
			else
				e = init_backend.redis_conn.get key 
				return [[]] if e.nil?
				e.split(two).map{|a| a.split(one)}
			end
		end


	# Query string manipulation functions
		def chk_qs k,v,p={}; alter_qs :chk, k,v,p; end
		def que_qs k,  p={}; alter_qs :que, k, false, p; end
		def chg_qs k,v,p={}; alter_qs :chg, k,v,p; end
		def add_qs k,v,p={}; alter_qs :add, k,v,p; end
		def rem_qs k,v,p={}; alter_qs :rem, k,v,p; end
		def obl_qs k,  p={}; alter_qs :obl, k, false, p; end

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

		def hash_query hash
			x = []
			hash.each {|l,m| Array(m).each {|a| x << "#{l}=#{a}"}}
			"?#{x.join("&")}"
		end

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
		def is_epoch s #is integer.
			s.to_i.to_s == s
		end

		def nicetime_split s
			s.split(/(\d+)/).reject{|c| c.empty?}
		end

		def is_nicetime s
			return false if is_epoch(s) #fast fail
			a,b = nicetime_split s
			return true if a.to_i.to_s == a and b.is_a? String
		end

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
