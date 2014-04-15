require 'cgi'
require 'uri'

module Layouts
	module ApplicationLayoutHelper
		UI_DEFAULTS = {	
			start: "3h",
			graph: "standard"
		}
		
		def ui_message msg
			case msg
			when :no_graphs_selected; "Select a metric from the list to graph"
			when :no_backends; "No backends configured. Check your config/settings/{ENV}.yml file."
			else "UI MESSAGE VARIABLE NOT FOUND: #{msg}"
			end
		end

		def version
			config = "config/version"
			if Rails.env.development?
				v = %x[git describe --tags --always].strip()
				File.open(config, "w") do |file|
					file.write(v)
				end

				link_to v, "https://github.com/anchor/machiavelli/commit/#{v[-7..-1]}", target: "blank"
			else 
				v = File.read(config)
				t = v.split("-").first
				link_to t, "https://github.com/anchor/machiavelli/tree/#{t}", target: "blank"
			end
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
			partial = "partial/sidenav/modal_filter"
			render(partial: partial)
		end
		
		def navbar_buttons param, buttons
			a = []
			buttons.each do |b|
				html = "<a type='button' class='btn btn-default "
				p = chk_qs(param,b) 

				html += "active" if (p || p.nil? && UI_DEFAULTS[param] == b)
				html += "' href='"+ chg_qs(param, b) +"'>"+b+"</a>"
				a << html
			end
			a
		end


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

		def to_epoch s
			return "" if s.nil?
			time_scale = (case s.tr("0-9","")
				when "min"; "minutes"
				when "h"; "hours"
				when "d"; "days"
				when "w"; "weeks"
				end )
			eval("#{s.tr("a-z","")}.#{time_scale}.ago.to_i")
		end
	end
end
