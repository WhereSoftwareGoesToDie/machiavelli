Clizia.Utils = {
	showURL: function(element, url) { 
		show = "<span class='data_source'><a href='"+
			url+
			"' target=_blank><i title='Open external data source' "+
			"class='icon-external-link'></i></a></span>";
		document.getElementById(element).innerHTML = show;
	},
	removeURL: function(element, url) {
		rm = "<span class='remove_metric'><a href='"+
			url+
			"'><i title='Remove graph' class='icon-remove'></i></a></span>";
		document.getElementById(element).innerHTML = rm;
	},
	zoomtoselected: function() { 
		$(window).on('hashchange', function() {
			hash = window.location.hash.slice(1).split(",");
			start = parseInt(hash[0]);
			stop = parseInt(hash[1]);
			if (start === 0) { start = gon.start; }
			if (stop === 0) { stop = gon.stop; }

			if (stop - start < 600) { stop = start + 600; } //prevent zooms that are too small 

			url = gon.base;

			url += "&start=" + start;
			url +=  "&stop=" + stop;

			html =  "<a href='"+url+"' data-toggle='tooltip_z' " ;
			html += "data-original-title='Magnify search to selected'><i class='icon-zoom-in no_link'>";
			html += "</i></a>";
			$("#zoomtoselected").html(html);
			$("[data-toggle='tooltip_z']").tooltip({ placement: "bottom", container: "body", delay: { show: 500} });
		});

	},
	state: function(args) { 
		if (args.state) { 
			if (state === "waiting") { 
				console.log("waiting")
			} else if (state === "error") { 
				console.log("error")
			} else if (state === "complete") { 
				console.log("complete")
			} 
		} else { 
			throw "No state"
		}
	} 

}

