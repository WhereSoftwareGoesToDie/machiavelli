Clizia.Graph = function(args) {
        var that = {};

        that.init = function(args) {
                if (!args.chart) throw "Clizia.Graph needs a chart";
                that.chart = args.chart;

                if (!args.metric) throw "Clizia.Graph needs a metric"
                that.metric = args.metric;
        }

        that.render = function(args) { throw "Cannot invoke parent Clizia.Graph.render() directly." }
        that.update = function(args) { throw "Cannot invoke parent Clizia.Graph.update() directly." }


	next_color = function() {  
		if (typeof clizia_palette === "undefined") {
			clizia_palette = new Rickshaw.Color.Palette({scheme: "munin"})
		}
		return clizia_palette.color()
	} 

	that.state = function(args) {          
		if (typeof args === "String" ) { args = {state: args} }

		function rmv_wait() { chart.find(".waiting").remove() }

		if (args.state) { 
			chart = $("#"+that.chart)
			if (args.state === "waiting") { 
				chart.append("<div class='waiting'><i class='icon-spin'></i></div>")
			} else if (args.state === "error") {
				rmv_wait()

				error = args.error;
				url = args.removeURL || ""
				detail = args.detail || ""
			
				error = stripHTML(error);
				error_alert = "<div class='alert alert-danger'>" + error;

				if (url) { 
					error_alert +=  ". <a class='alert-link' href='"+url+"'>Remove graph</a>.";
				}

				if (detail) {
					error_alert +=  "<a class='detail_toggle alert-link' href='javascript:void(0);'>(details)</a>" +
						"<div class='detail' style='display:none'>" +
						detail +
						"</div>";
				}
				error_alert += "</div>";
				chart.append(error_alert)

				chart.addClass("error")
			} else if (args.state === "complete") { 
				rmv_wait()
			} 
		} else { 
			throw "No state"
		}
	}	
	function stripHTML(e) {  return e.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,""); }

	that.metric_complete = function() {
		if (typeof nanobar === "object") {
			nanobar.inc()
		} 
	} 

	that.init(args);
	return that;
}

