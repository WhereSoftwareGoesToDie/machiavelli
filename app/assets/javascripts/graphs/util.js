
function renderWaiting(element) { 
	document.getElementById(element).innerHTML = "<i class='icon-spinner icon-spin'>"
}

function unrenderWaiting() {
	$(".icon-spinner").hide()
}

function renderError(element, error, detail) { 
	error_alert = "<div class='alert alert-danger'>"+error
	if (detail) { error_alert += "<br/>"+detail }
	error_alert += "</div>"
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
function stopAll() {
        stopUpdates()
	stopButtonClick()
	unrenderWaiting()
}

function metric_sort() {


        $("#graphed_metrics").sortable({
                stop: function(event, ui) { 
                        var metrics = [], params = []
                        $(".sortable").each(function(i,el){
                                metrics.push("metric="+$(el).text().trim())
                        })
                        $.each(location.search.split("&"), function(i, d) {
                                if(d.indexOf("metric") == -1) { params.push(d) }
                                } )
                        new_url = location.origin + location.pathname +"?"+ params.join("&").replace("?","") +"&"+metrics.join("&")
                        window.location.href= new_url
                }
        })
}
