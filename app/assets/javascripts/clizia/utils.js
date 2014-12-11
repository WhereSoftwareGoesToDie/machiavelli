var nanobar;

/**
A nanobar.js object
@param args.count - the expected number of events to be returned before the page is "complete"
*/
Clizia.Nanobar = function(args) {
	if (typeof Nanobar !== "function") {
	       	throw "Clizia.Nanobar requires Nanobar.js";
	}
	var that = {};
	var complete = 0;
	that.init = function(args) {
		if (!args.count) {
			throw "Cannot create progress without a count of expected items";
		}
		that.count = args.count;
		that.nanobar = new Nanobar({bg: "#356895" ,id:"#progress"})
	};

	that.inc = function() {
		complete = complete + 1;
		var len = (complete / that.count) * 100;
		if (len < 100) {
			that.nanobar.go(len);
		}
		else {
			that.nanobar.go(100);
		}
	};

	// Force the completion of the nanobar progress (e.g. unrecoverable error)
	that.complete = function() {
		that.nanobar.go(100);
	}

	that.init(args);

	return that;
};

var clizia_utils_unique_id_seed = 0;
Clizia.Utils = {
	showURL: function(element, url) {
		var show = "<span class='data_source'><a href='"+
			url+
			"' target=_blank><i title='Open external data source' "+
			"class='icon-external-link'></i></a></span>";
		document.getElementById(element).innerHTML = show;
	},
	removeURL: function(element, url) {
		var rm = "<span class='remove_metric'><a href='"+
			url+
			"'><i title='Remove graph' class='icon-remove'></i></a></span>";
		document.getElementById(element).innerHTML = rm;
	},
	ProgressBar: function(a) {
		nanobar = Clizia.Nanobar({count: a});
	},

	uniq_id: function(a) {
		//unique, not a GUID, but unique enough
		if (typeof a === "undefined") {
			div_name = "id_"
		} else {
			div_name = a + "_"
		}
		return div_name + (++clizia_utils_unique_id_seed)
	}

};
