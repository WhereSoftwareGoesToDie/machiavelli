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

