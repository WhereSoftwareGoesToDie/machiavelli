var errorMessage = { 
	'noData': "No data returned from endpoint",
	'endpointError': "Error retrieving data from endpoint",
}; 

function initProgress() { 
	nanobar = new Nanobar({bg: "#356895" ,id:"#progress"})
	if (typeof complete === 'undefined') { _complete = 0 }
} 
function updateProgress() {
	if (typeof complete === 'undefined') { _complete += 1; c = _complete} else { c = complete}  
	a = (c / gon.metrics.length ) * 100
	if (a < 100) { nanobar.go(a) }
	if (a == 100) { doneProgress() }
}
function doneProgress() { 
	nanobar.go(100)
} 
function fitSlider() {
	if (typeof slider != "undefined" ) { slider.configure({width : new_width}); slider.render();}
}

function renderWaiting(element) { 
	document.getElementById(element).innerHTML = "<i class='icon-spinner icon-spin'>";
}

function unrenderWaiting(element) {
	if (element) { $("#"+element).find(".icon-spinner").hide(); }
	else { $(".icon-spinner").hide(); }
}

function stripHTML(e) { 
	return e.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,"");
 }


function renderError(element, error, detail, url) {
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
	document.getElementById(element).innerHTML = error_alert;

	
	$("#"+element+" .detail_toggle").click(function() {
		$(this).parent().find(".detail").toggle(100);
	});
}

function metricURL(base, start, stop, step){ 
	return base+"&start="+start+"&stop="+stop+"&step="+step;
}

function stopButtonClick() { 
        stopUpdates();
	enablePlay();
} 
function stopAll() {
        stopUpdates();
	stopButtonClick();
	//unrenderWaiting();
}
function enableStop() { 
	$("#autoplay_stop_link").removeClass("disabled")
	$("#autoplay_play_link").addClass("disabled")
} 
function enablePlay() { 
	$("#autoplay_stop_link").addClass("disabled")
	$("#autoplay_play_link").removeClass("disabled")
} 

function metric_sort() {
        $("#graphed_metrics").sortable({
                stop: function(event, ui) { 
                        var metrics = [], params = [];
                        $(".sortable").each(function(i,el){
                                metrics.push("metric="+$(el).find("span.metric")[0].dataset.metric);
                        });
			$.each(location.search.split("&"), function(i, d) {
				if(d.indexOf("metric") == -1) { params.push(d); }
			});
                        new_url = location.origin + location.pathname +"?"+ params.join("&").replace("?","") +"&"+metrics.join("&");
                        window.location.href= new_url;
                }
        });
}
