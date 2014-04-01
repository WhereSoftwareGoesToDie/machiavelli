function rickshawFitToWindow(graph) { 
	if (window.innerWidth < 768) { r = 180 } else { r = 460 }
	new_width = window.innerWidth - r;
	graph.configure({ width: new_width});
	graph.render();
	if ($("#y_axis_right")) { 
		$("#y_axis_right").attr("style","left: "+(new_width+60)+"px")
	}
	if ($("#legend-dual")) { 
		$("#legend-dual").attr("style","width: "+(new_width+60)+"px")
	}
	fitSlider();
} 
function fitSlider() {
	if (typeof slider != "undefined" ) { slider.configure({width : new_width}); slider.render()} 
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
		error_alert +=  " <a class='detail_toggle alert-link' href='javascript:void(0);'>(details)</a>"
			+"<div class='detail' style='display:none'>"
			+ detail
			+"</div>"
	} 
	error_alert += "</div>"
	document.getElementById(element).innerHTML = error_alert


	$('.detail_toggle').click(function() { $(this).parent().find(".detail").toggle(100) })
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
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function clean (arr, deleteValue) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == deleteValue) { 
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};
