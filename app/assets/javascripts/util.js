function fitSlider() {
	if (typeof slider != "undefined" ) { slider.configure({width : new_width}); slider.render();}
}
// Oh dear...
function general_removechart(metric,newurl,length) { 

	if (length === 0) { 
		window.location.replace(window.location.origin)
	}
	//Remove listing from cache of select2 listings (allows researching)
	if (filter_metrics_select) { 
		var news2 = $.grep($("#filter_metrics_select").select2("data"), function(d) { return d.id != metric})
		$("#filter_metrics_select").select2("data",news2)
	}

	//Remove li metric listing
	$('*[data-metric="'+metric+'"]').parent().parent().remove()

	//Remove metric from any other generated links on page (oh boy)
	$.each($('a[href*="'+metric+'"]'), function(i,d) {
		d.href = cleanURL(d.href,"metric="+metric)
	})

	//Finally, update location url
	window.history.pushState({style:"removechart"},document.title,newurl)

}

// On back button popstate, reload the page. Uses history alterations, but actually invokes them
$(window).bind('popstate', function(event){
	if (!(event.originalEvent.state === null)) {
		if (event.originalEvent.state.style === "removechart") {
			window.location = location.href
		}
	}
})

function cleanURL(url,rm_string) { 
	url = url.replace(rm_string,"")
	url = url.replace("&&","&")
	url = url.replace("?&","?")
	return url
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

function metricURL(feed,start,stop,step) { return feed+"&start="+start+"&stop="+stop+"&step="+step }
