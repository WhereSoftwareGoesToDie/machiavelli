function rickshawFitToWindow(graph) { 
	if (window.innerWidth < 768) { r = 160 } else { r = 440 }
	new_width = window.innerWidth - r;
	graph.configure({ width: new_width});
	graph.render();
	$(".slider").width(new_width-20)
}

function dynamicWidth(graph) { 
	rickshawFitToWindow(graph); // do it naow
	$(window).on('resize', function(){ rickshawFitToWindow(graph) });
} 
function renderWaiting(element) { 
	document.getElementById(element).innerHTML = "<i class='icon-spinner icon-spin'>"
}

function unrenderWaiting(element) {
	if (element) { $("#"+element).find(".icon-spinner").hide() } 
	else { $(".icon-spinner").hide() }
}

function renderError(element, error, detail) {
	error_alert = "<div class='alert alert-danger'>" + error

	if (detail) { 
		error_alert +=  "<a class='detail_toggle alert-link' href='javascript:void(0);'> (details)</a>"
			+"<div class='detail' style='display:none'>"
			+ detail
			+"</div>"
	} 
	error_alert += "</div>"
	document.getElementById(element).innerHTML = error_alert

	$('.detail_toggle').click(function() { $(this).parent().find(".detail").toggle()})
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
                                metrics.push("metric="+$(el).find("span.metric")[0].dataset.metric)
                        })
                        $.each(location.search.split("&"), function(i, d) {
                                if(d.indexOf("metric") == -1) { params.push(d) }
                                } )
                        new_url = location.origin + location.pathname +"?"+ params.join("&").replace("?","") +"&"+metrics.join("&")
                        window.location.href= new_url
                }
        })
}
