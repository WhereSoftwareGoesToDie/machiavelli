Clizia.Graph.Rickshaw = function (args) { 
	if (typeof Rickshaw !== "object") throw "Clizia.Graph.Rickshaw requires Rickshaw.Graph"

	var that = Clizia.Graph(args)

	var defaults = { width: 700, height: 200, padding: 1 , clock: "utc"}

	that.init = function(args) { 
		//TODO arg handler? args key then error if 404 then assignment?
		container = $("#"+that.chart)
		container.addClass("chart_container")

		that.yaxis = Clizia.Utils.uniq_id("y_axis")
		container.append("<div id='"+that.yaxis+"' class='y_axis'></div>")

		that.graph = Clizia.Utils.uniq_id("graph")
		that.graph_id = that.graph
		container.append("<div id='"+that.graph+"' class='chart'></div>")

		that.y2axis = args.y2axis

		if (args.slider) { 
			that.slider = args.slider 
			$("#"+that.slider.element).addClass("slider")
		} 
		else { that.noSlider = true }
		

		if (args.dynamic) { that.dynamic = args.dynamic }
		if (args.showurl) { that.showurl = args.showurl}
		if (args.removeurl) { that.removeurl = args.removeurl}
		if (args.zeromin) { that.zeromin = args.zeromin }

		if (is_array(that.metric)) { 

			that.color = args.color || []
			for (n = 0; n < that.metric.length; n++ ) {
				m = that.metric[n]
				m.metadata = m.metadata || {}
				if (!m.feed && !m.data) {
					throw "Metric '"+m.id+"' has no data or feed!"
				}

				// Expect metric and color to either be Object, String; or [Object], [String]
				m.color = m.metadata.color || that.color[n] || next_color(); 
			}

		} else {
			that.metric.metadata = that.metric.metadata || {}

			if (!that.metric.feed && !that.metric.data) { throw "Metric "+that.metric.id+" has no data or feed!" }
			that.metric.color = that.metric.metadata.color || args.color || next_color();
		} 
		

		//TODO nicer defaults, like above, but optional?
		that.width = args.width || defaults.width;
		that.height = args.height || defaults.height;
		that.padding = args.padding || defaults.padding;
		that.clock = args.clock || defaults.clock;
		that.base = args.base || "??";

		that.state({state: "waiting"})
	} 

	that.invalidData = function(data) { 
		if (data.error) { return true } 
		if (data.length === 0) { return true } 
		return false
	} 

	that.extents = function(data) { 
		min = Number.MAX_VALUE; 
		min = $.map(data, function(d){return d.y}).min() 
		if (that.zeromin) { min = 0 } 

		max = Number.MIN_VALUE;
		max = $.map(data, function(d){return d.y}).max()
		
		if (min == Number.MAX_VALUE) { 
			min=0; 
			max=0;
		}
		return [min, max]
	} 

	that.update = function(args) {  
				
		if (is_array(args.metric)) { 
			$.each(args.metric, function(n, m) { 
				if (m.data) {  
					that.graph.series[n].data = m.data
				} else { 
					newfeed = m.feed
					$.getJSON(newfeed, function(data) { 
						if (that.invalidData(data)) { 
							throw "Invalid Data, cannot render update" 
						}
						that.graph.series[n].data = data
					})
				}	
			})
			if (typeof that.update_overlay == "function") { that.update_overlay() }
			that.graph.render();
		} else {
			if (args.metric.data) {
				that.graph.series[0].data = args.metric.data
				that.graph.render();
				if (typeof that.update_overlay == "function") { that.update_overlay() }
			} else { 
				newfeed = args.metric.feed
				$.getJSON(newfeed, function(data) {
					if (that.invalidData(data)) { throw "Invalid Data, cannot render update" }
					that.graph.series[0].data = data
					that.graph.render();
					if (typeof that.update_overlay == "function") { that.update_overlay() }
				 })
			}
		}
	}

	that.format = function(d) {
		return Rickshaw.Fixtures.Number.formatKMBT_round(parseFloat(d),0,0,4);
	}

	that.timeFixture = function() {
		if (that.clock == "utc") { 
			return new Rickshaw.Fixtures.Time.Precise()
		} else { 
			return new Rickshaw.Fixtures.Time.Precise.Local() 
		}
	}
	that.d3_time = function(x) {
		f_string = "%Y-%m-%d %H:%M:%S %Z"
		date = new Date(x*1000)
		if (that.clock == "utc") {
			d = d3.time.format.utc(f_string)
		} else {
			d = d3.time.format(f_string)
		}
		return d(date)
	}

	that.fitToWindow = function() { 
		if (window.innerWidth < 768) { r = 180; } else { r = 460; }
		new_width = window.innerWidth - r;
		that.graph.configure({ width: new_width});
		that.graph.render();
		if (that.y2axis) { 
			$("#"+that.y2axis).attr("style","left: "+(new_width+60)+"px");
		}
		if (that.legend) { 
			$("#"+that.legend).attr("style","width: "+(new_width)+"px");
		}
	} 

	that.dynamicWidth = function() {
		if (that.dynamic) { 
			that.fitToWindow()
			$(window).on('resize', function(){ that.fitToWindow(); })
		}
	} 

	that.zoomtoselected = function(_base, _start, _stop) { 
		$(window).on('hashchange', function() {
			hash = window.location.hash.slice(1).split(",");
			start = parseInt(hash[0]);
			stop = parseInt(hash[1]);
			if (start === 0) { start = _start; }
			if (stop === 0) { stop = _stop; }

			if (stop - start < 600) { stop = start + 600; } //prevent zooms that are too small 

			url = _base;

			url += "&start=" + start;
			url +=  "&stop=" + stop;

			html =  "<a href='"+url+"' data-toggle='tooltip_z' " ;
			html += "data-original-title='Magnify search to selected'><i class='icon-zoom-in no_link'>";
			html += "</i></a>";
			$("#zoomtoselected").html(html);
			$("[data-toggle='tooltip_z']").tooltip({ placement: "bottom", container: "body", delay: { show: 500} });
		});

	},

	that.init(args) 
	return that;	
} 

