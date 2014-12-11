/* Clizia  - A Comedy written by Machiavelli */

//It's funny, because it's javascript

var Clizia = {};

Array.prototype.max = function() { return Math.max.apply(null, this); };
Array.prototype.min = function() { return Math.min.apply(null, this); };

/* Proper validation of an array requires a lot of checks */
var is_array = function (value) {
        return value &&
                typeof value === 'object' &&
                typeof value.length === 'number' &&
                typeof value.splice === 'function' &&
                !(value.propertyIsEnumerable('length'));
};


Clizia.Graph = function(args) {
        var that = {};

        that.init = function(args) {
		if (!args) throw "Clizia.Graph requires at least some settings. You have provided none."

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

		function rmv_wait() { graph.find(".waiting").remove() }

		if (args.state) {
			var graph = $("#"+that.chart)
			if (args.state === "waiting") {
				graph.append("<div class='waiting'><i class='icon-spin'></i></div>")
			} else if (args.state === "error") {
				rmv_wait()

				error = args.error;
				removeURL = args.removeURL || ""
				showURL = args.showURL || ""
				detail = args.detail || ""

				error = stripHTML(error);
				error_alert = "<div class='alert alert-danger'>" + error;

				if (showURL) {
					error_alert +=  ". <a class='alert-link' href='"+showURL+"' target='_blank'>Check source</a>";
				}

				if (removeURL) {
					error_alert +=  ". <a class='alert-link' href='"+removeURL+"'>Remove graph</a>.";
				}

				if (detail) {
					error_alert +=  "<a class='detail_toggle alert-link' href='javascript:void(0);'>(details)</a>" +
						"<div class='detail' style='display:none'>" +
						detail +
						"</div>";
				}
				error_alert += "</div>";
				graph.append(error_alert)

				stopButtonClick() 

				graph.addClass("error")
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

	that.metric_failed = function() {
		if (typeof nanobar === "object") {
			nanobar.complete()
		}
	}

	that.init(args);
	return that;
}

