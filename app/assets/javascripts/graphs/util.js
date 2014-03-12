
function renderWaiting(element) { 
	document.getElementById(element).innerHTML = "<i class='icon-spinner icon-spin'>"
}

function unrenderWaiting() {
	$(".icon-spinner").hide()
}

function renderError(element, error, method) { 
	error_alert = "<div class='alert alert-danger'>"+error+"</div>"
	document.getElementById(element).innerHTML = error_alert
}

function metricURL(base, start, stop, step){ 
	return base+"&start="+start+"&stop="+stop+"&step="+step		
}

function stopButtonClick() { 
        stopUpdates()
	$("#autoplay_stop").hide()
	$("#autoplay_play").show()
} 

