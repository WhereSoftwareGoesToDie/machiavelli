var errorMessage = { 
	'noData': "No data returned from endpoint",
	'endpointError': "Error retrieving data from endpoint",
}; 
function formatData(d) { 
	return Rickshaw.Fixtures.Number.formatKMBT_round(parseFloat(d),0,0,4);
} 
function zoomtoselected() { 
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

} 
function rickshawFitToWindow(graph) { 
	if (window.innerWidth < 768) { r = 180; } else { r = 460; }
	new_width = window.innerWidth - r;
	graph.configure({ width: new_width});
	graph.render();
	if ($("#y_axis_right")) { 
		$("#y_axis_right").attr("style","left: "+(new_width+60)+"px");
	}
	if ($("#legend-dual")) { 
		$("#legend-dual").attr("style","width: "+(new_width)+"px");
	}
	fitSlider();
} 
function fitSlider() {
	if (typeof slider != "undefined" ) { slider.configure({width : new_width, height: 30}); slider.render();}
}

function dynamicWidth(graph) { 
	rickshawFitToWindow(graph); // do it naow
	$(window).on('resize', function(){ rickshawFitToWindow(graph); });
} 
function renderWaiting(element) { 
	document.getElementById(element).innerHTML = "<i class='icon-spinner icon-spin'>";
}

function unrenderWaiting(element) {
	if (element) { $("#"+element).find(".icon-spinner").hide(); }
	else { $(".icon-spinner").hide(); }
}
function showURL(element, url) { 
	show = "<span class='data_source'><a href='"+url+"' target=_blank><i title='Open external data source' class='icon-external-link'></i></a></span>";
	document.getElementById(element).innerHTML = show;
} 
function removeURL(element, url) {
	rm = "<span class='remove_metric'><a href='"+url+"' target=_blank><i title='Remove grpah' class='icon-remove'></i></a></span>";
	document.getElementById(element).innerHTML = rm;
}


function stripHTML(e) { return e.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,""); }
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
function clean (arr, deleteValue) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == deleteValue) { 
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}
