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
	},
	ProgressBar: function(a) { 
		nanobar = Clizia.Nanobar({count: a})
	}


}
var nanobar; 
Clizia.Nanobar = function(args) { 
	var that = {}
	var complete = 0; 
	that.init = function(args) { 
		if (!args.count) { throw "Cannot create progress without a count of expected items" }
		that.count = args.count
		that.nanobar = new Nanobar({bg: "#356895" ,id:"#progress"})
	} 

	that.inc = function() { 
		complete = complete + 1; 
		len = (complete / that.count) * 100
		if (len < 100) { that.nanobar.go(len) } 
		else { that.nanobar.go(100) } 
	} 
	that.init(args)
	return that; 
} 

