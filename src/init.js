jQuery(document).ready(function($){
	
/*-------------------------------------------------------------------------

	1.	Plugin Init
	2.	Helper Functions
	3.	Shortcode Stuff
	4.	Header + Search
	5.	Page Specific
	6.  Scroll to top
	7.	Cross Browser Fixes


-------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------*/
/*	1.	Plugin Init
/*-------------------------------------------------------------------------*/

/***************** Pretty Photo ******************/
	
	function prettyPhotoInit(){
		
		//add galleries to portfolios
		$('.portfolio-items').each(function(){
			var $unique_id = Math.floor(Math.random()*10000);
			$(this).find('.pretty_photo').attr('rel','prettyPhoto['+$unique_id+'_gal]').removeClass('pretty_photo');
		});
		
		$("a[data-rel='prettyPhoto[product-gallery]'], a[data-rel='prettyPhoto']").each(function(){
			$(this).attr('rel',$(this).attr('data-rel'));
			$(this).removeAttr('data-rel');
		});
		
		//standard wp galleries
		if($('body').hasClass('nectar-auto-lightbox')){
			$('.gallery').each(function(){
				if($(this).find('.gallery-icon a[rel^="prettyPhoto"]').length == 0) {
					var $unique_id = Math.floor(Math.random()*10000);
					$(this).find('.gallery-item .gallery-icon a[href*=".jpg"], .gallery-item .gallery-icon a[href*=".png"], .gallery-item .gallery-icon a[href*=".gif"], .gallery-item .gallery-icon a[href*=".jpeg"]').attr('rel','prettyPhoto['+$unique_id+'_gal]').removeClass('pretty_photo');
				}
			});
		}
		
		
		//convert class usage into rel
		$('a.pp').removeClass('pp').attr('rel','prettyPhoto');
		
		$("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'dark_rounded',
			allow_resize: true,
			default_width: 690,
			opacity: 0.85, 
			animation_speed: 'normal',
			deeplinking: false,
			default_height: 388,
			social_tools: '',
			markup: '<div class="pp_pic_holder"> \
						   <div class="ppt">&nbsp;</div> \
							<div class="pp_details"> \
								<div class="pp_nav"> \
								    <a href="#" class="pp_arrow_previous"> <i class="icon-salient-left-arrow-thin icon-default-style"></i> </a> \
									<a href="#" class="pp_arrow_next"> <i class="icon-salient-right-arrow-thin icon-default-style"></i> </a> \
									<p class="currentTextHolder">0/0</p> \
								</div> \
								<a class="pp_close" href="#"><span class="icon-salient-x icon-default-style"></span></a> \
							</div> \
							<div class="pp_content_container"> \
								<div class="pp_left"> \
								<div class="pp_right"> \
									<div class="pp_content"> \
										<div class="pp_fade"> \
											<div class="pp_hoverContainer"> \
											</div> \
											<div id="pp_full_res"></div> \
										</div> \
									</div> \
								</div> \
								</div> \
							</div> \
						</div> \
						<div class="pp_loaderIcon"></div> \
						<div class="pp_overlay"></div>'
		});
		
	}

	prettyPhotoInit();

	
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);


	
/***************** Smooth Scrolling ******************/

	function niceScrollInit(){
		$("html").niceScroll({
			scrollspeed: 60,
			mousescrollstep: 40,
			cursorwidth: 15,
			cursorborder: 0,
			cursorcolor: '#303030',
			cursorborderradius: 6,
			autohidemode: false,
			horizrailenabled: false
		});
		
		
		if($('#boxed').length == 0){
			$('body, body #header-outer, body #header-secondary-outer, body #search-outer').css('padding-right','16px');
		} else if($('body[data-ext-responsive="true"]').length == 0 ) {
			$('body').css('padding-right','16px');
		}
		
		$('html').addClass('no-overflow-y');
	}

	var $smoothActive = $('body').attr('data-smooth-scrolling'); 
	var $smoothCache = ( $smoothActive == 1 ) ? true : false;
	
	if( $smoothActive == 1 && $(window).width() > 690 && $('body').outerHeight(true) > $(window).height() && Modernizr.csstransforms3d && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){ niceScrollInit(); } else {
		$('body').attr('data-smooth-scrolling','0');
	}
	







/***************** Sliders ******************/

	//gallery
	$('.flex-gallery').each(function(){
		
		var $that = $(this);
		
		imagesLoaded($(this),function(instance){
		
			 $that.flexslider({
		        animation: 'fade',
		        smoothHeight: false, 
		        animationSpeed: 500,
		        useCSS: false, 
		        touch: true
		    });
			
			////gallery slider add arrows
			$('.flex-gallery .flex-direction-nav li a.flex-next').html('<i class="icon-angle-right"></i>');
			$('.flex-gallery .flex-direction-nav li a.flex-prev').html('<i class="icon-angle-left"></i>');
		
		});
		
	});
	
	
	
/***************** Home Slider ******************/

	var sliderAdvanceSpeed = parseInt($('#featured').attr('data-advance-speed'));
	var sliderAnimationSpeed = parseInt($('#featured').attr('data-animation-speed'));
	var sliderAutoplay = parseInt($('#featured').attr('data-autoplay'));
	
	if( isNaN(sliderAdvanceSpeed) ) { sliderAdvanceSpeed = 5500;}
	if( isNaN(sliderAnimationSpeed) ) { sliderAnimationSpeed = 800;}
	
	var $yPos;
	

	var img_urls=[];
	$('[style*="background"]').each(function() {
	    var style = $(this).attr('style');
	    var pattern = /background.*?url\('(.*?)'\)/g
	    var match = pattern.exec(style);
	    if (match) {        
	        img_urls.push(match[1]);
	    }
	});
	
	var imgArray = [];
	
	for(i=0;i<img_urls.length;i++){
		imgArray[i] = new Image();
		imgArray[i].src = img_urls[i];
	}
	 
	
	//home slider height
	var sliderHeight = parseInt($('#featured').attr('data-slider-height'));
	if( isNaN(sliderHeight) ) { sliderHeight = 650 } else { sliderHeight = sliderHeight -12 }; 
	
	////min height if video
	if( $('#featured .video').length > 0 && sliderHeight < 500) sliderHeight = 500;
	
	function customSliderHeight(){
		if(!$('body').hasClass('mobile')){
			$('#featured').attr('style', 'height: '+sliderHeight+'px !important');
			$('#featured article').css('height',sliderHeight+headerPadding2-23+'px')
		}
		else {
			$('#featured').attr('style', 'height: '+sliderHeight+'px');
		}
	}
	
	customSliderHeight();
	
	
	//home slider bg color
	if( $('#featured').length > 0 ){
		var sliderBackgroundColor = $('#featured').attr('data-bg-color');
		if( sliderBackgroundColor.length == 0 ) sliderBackgroundColor = '#000000'; 
		
		$('#featured article').css('background-color',sliderBackgroundColor);
	}
	

	
	//take into account header height when calculating the controls and info positioning 
	var logoHeight = parseInt($('#header-outer').attr('data-logo-height'));
	var headerPadding = parseInt($('#header-outer').attr('data-padding'));
	var headerPadding2 = parseInt($('#header-outer').attr('data-padding'));
	var extraDef = 10;
	var headerResize = ($('body').hasClass('pp-video-function')) ? '1' : $('#header-outer').attr('data-header-resize');
	var headerResizeOffExtra = 0;
	var extraHeight = ($('#wpadminbar').length > 0) ? $('#wpadminbar').height() : 0; //admin bar
	var usingLogoImage = true;
    var mediaElement = ($('.wp-video-shortcode').length > 0) ? 36 : 0;
    var secondaryHeader = ($('#header-outer').attr('data-using-secondary') == '1') ? 32 : 0 ;
    
	if( isNaN(logoHeight) ) { usingLogoImage = false; logoHeight = 30;}
	if( isNaN(headerPadding) ) { headerPadding = 28; headerPadding2 = 28;}
	if( headerResize.length == 0 ) { extraDef = 0; headerResizeOffExtra = headerPadding2; }
    if( $('header#top #logo img').length == 0 ) { logoHeight = 30; }
    
	var $captionPos = (((sliderHeight-70)/2 - $('div.slider-nav span.left span.white').height()/2) + headerPadding2 - headerResizeOffExtra) - 75;
	var $controlsPos = (((sliderHeight-70)/2 - $('div.slider-nav span.left span.white').height()/2) + logoHeight + headerPadding*2 + extraHeight + secondaryHeader) -10;
	
	var $scrollTop = 0;
	var $videoHeight; 
	
	
	function homeSliderInit(){
		$('#featured').orbit({
         	 animation: 'fade',
         	 advanceSpeed: sliderAdvanceSpeed,
         	 animationSpeed: sliderAnimationSpeed, 
         	 timer: sliderAutoplay
    	 });
    	 
    	 customSliderHeight();
		 sliderAfterSetup();
		 
		  //test for slider arrows
	 	 if(!$('body').hasClass('mobile')){
			$('.orbit-wrapper #featured article').css('top', ((- $scrollTop / 5)+logoHeight+headerPadding2+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader)  + 'px');
			$('.orbit-wrapper div.slider-nav span.right, .orbit-wrapper div.slider-nav span.left').html('<span class="white"></span><span class="shadow"></span>');
		 } else {
			$('.orbit-wrapper div.slider-nav span.right').html('<i class="icon-angle-right"></i>');
			$('.orbit-wrapper div.slider-nav span.left').html('<i class="icon-angle-left"></i>');
		 }
	}
	
	//home slider init
	if($('#featured').length > 0 && $().orbit) {
		 
		 var $firstBg = $('#featured').find('.slide:first-child > article').attr('style');

	     var pattern = /url\(["']?([^'")]+)['"]?\)/;
	     var match = pattern.exec($firstBg);
 
	     if (match && match[1].indexOf('.') !== -1) {       
	        var slideImg = new Image();
			slideImg.onload = function(){ 
				homeSliderInit();
			}
			slideImg.src = match[1];
		 } else {
		 	homeSliderInit();
		 }
    	 
    	$('#featured article .post-title h2 span').show();
    		 
    	////add hover effect to slider nav
    	$('.slider-nav > span').append('<span class="white"></span><span class="shadow"></span>');	
    	
    	////swipe for home slider
    	if($('body').hasClass('mobile')){
	    	$('#featured h2, #featured .video').swipe({
	    		swipeRight : function(e) {
					$('.slider-nav .left').trigger('click');
					e.stopImmediatePropagation();
					return false;
				 },
				 swipeLeft : function(e) {
					$('.slider-nav .right').trigger('click');
					e.stopImmediatePropagation();
					return false;
				 }    
	    	})
    	}
   
	
	}
	
	
	
	
	//inital load
	function sliderAfterSetup(){
		//webkit video fix
		$('#featured .mejs-container').css('width',$('#featured .video').width());
		$('#featured .mejs-container').css('height',$('#featured .video').width()/1.7777);
		//$(window).trigger('resize');
		
		$('body:not(.mobile) .orbit-wrapper #featured .orbit-slide:not(".has-video") article .container').css('top', $captionPos +"px");
		$('body:not(.mobile) .orbit-wrapper #featured .orbit-slide.has-video article .container').css('top', $videoHeight +"px");
		$('body:not(.mobile) .orbit-wrapper .slider-nav > span').css('top', $controlsPos +"px");	
		$('body:not(.mobile) .orbit-wrapper #featured .slide article').css({'top': ((- $scrollTop / 5)+logoHeight+headerPadding2+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader)  + 'px' });
		
		//height fix for when resize on scroll if off
		if(!$('body').hasClass('mobile') && headerResize.length == 0){
			$('#featured article').css('height',sliderHeight-32+'px')
		}
		
		$(window).trigger('resize');
	}
	
	
	function videoSlidePos(){
		$('#featured > div').has('.video').each(function(){
			if( $(window).width() > 1300 ) {
				$('#featured .orbit-slide.has-video .video, #featured .orbit-slide.has-video h2').css('top','0');
				$('#featured .orbit-slide.has-video .post-title > a').css('top','10px');

				$videoHeight = ((sliderHeight-28)/2) - ((410-mediaElement)/2) + headerPadding2 - headerResizeOffExtra;
			}
			
			else if( $(window).width() > 1000 && $(window).width() < 1081 ){
				$('#featured .orbit-slide.has-video .video, #featured .orbit-slide.has-video h2').css('top','0');
				$('#featured .orbit-slide.has-video .post-title > a').css('top','10px');
				
				$videoHeight = ((sliderHeight-28)/2) - ((290-mediaElement)/2) + headerPadding2 - headerResizeOffExtra;
			}
			
			else {
				$videoHeight = ((sliderHeight-28)/2) - ((336-mediaElement)/2) +headerPadding2 - headerResizeOffExtra;
			}
	
		});
	}
	
	videoSlidePos();
	
	//dynamic controls and info positioning
	function controlsAndInfoPos(){
		$scrollTop = $(window).scrollTop();
		
		$('body:not(.mobile) .orbit-wrapper #featured .orbit-slide:not(".has-video") article .container').css({ 
			'opacity' : 1-($scrollTop/(sliderHeight-130)),
			'top' : ($scrollTop*-0.2) + $captionPos +"px"
		});
		
		//video slides
		$('body:not(.mobile) .orbit-wrapper #featured .orbit-slide.has-video article .container').css({ 
			'opacity' : 1-($scrollTop/(sliderHeight-130)),
			'top' : ($scrollTop*-0.2) + $videoHeight +"px"
		});
		
		if($('#boxed').length == 0){
			$('body:not(.mobile) .orbit-wrapper .slider-nav > span').css({ 
				'opacity' : 1-($scrollTop/(sliderHeight-130)),
				'top' : ($scrollTop*-0.4) + $controlsPos +"px"
			});
		}
		
	}
	
	controlsInit();
	function controlsInit(){

		if($('#boxed').length > 0) {
			if(1-$scrollTop/(sliderHeight-$controlsPos-20) >= 0){
				$(window).unbind('scroll',hideControls);
				$(window).bind('scroll',showControls);
			} else {
				$(window).unbind('scroll',showControls);
				$(window).bind('scroll',hideControls);
			}
		} else {
			$(window).unbind('scroll',showControls);
			$(window).unbind('scroll',hideControls);
		}
	
	}
	
	function showControls(){

		if(1-$scrollTop/(sliderHeight-$controlsPos-20) >= 0){
			$('body:not(.mobile) .orbit-wrapper .slider-nav > span.left').stop(true,true).animate({ 'left' : '0px'},450,'easeOutCubic');
			if($('body').attr('data-smooth-scrolling')=='1'){
				$('body:not(.mobile) .orbit-wrapper .slider-nav > span.right').stop(true,true).animate({ 'right' : '15px'},450,'easeOutCubic');
			} else {
				$('body:not(.mobile) .orbit-wrapper .slider-nav > span.right').stop(true,true).animate({ 'right' : '0px'},450,'easeOutCubic');
			}
			$(window).unbind('scroll',showControls);
			$(window).bind('scroll',hideControls);
		}
	}
	
	function hideControls(){
		
		if(1-$scrollTop/(sliderHeight-$controlsPos-20) < 0){
			$('body:not(.mobile) .orbit-wrapper .slider-nav > span.left').stop(true,true).animate({ 'left' : '-80px'},450,'easeOutCubic');
			$('body:not(.mobile) .orbit-wrapper .slider-nav > span.right').stop(true,true).animate({ 'right' : '-80px'},450,'easeOutCubic');
			$(window).unbind('scroll',hideControls);
			$(window).bind('scroll',showControls);
		}
		
	}
	
	if( $('#featured').length > 0){
	
		$(window).scroll(function(){
		    
		    //hide video to not mess up parallax section
		    $('#featured .mejs-mediaelement, #featured .iframe-embed').each(function(){
		    
		    	if( $(this).parents('.container').css('opacity') <= 0){
			    	$(this).css('visibility','hidden').hide();
			    } else {
			    	$(this).css('visibility','visible').show();
			    }
		    });
		    
		    if(!$('body').hasClass('mobile')){
		    	
		    	controlsAndInfoPos();
				$('body:not(.mobile) .orbit-wrapper #featured .slide:not(:transparent) article').css({'top': ((- $scrollTop / 5)+logoHeight+headerPadding2+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader)  + 'px' });	
			
			}
		});
		
		
		//disable parallax for mobile
		$(window).resize(function(){
			if(!$('body').hasClass('mobile')){
				$('.orbit-wrapper #featured article').css('top', ((- $scrollTop / 5)+logoHeight+headerPadding2+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader)  + 'px');
				$('.orbit-wrapper div.slider-nav span.right, .orbit-wrapper div.slider-nav span.left').html('<span class="white"></span><span class="shadow"></span>');
			} else {
				$('.orbit-wrapper div.slider-nav span.right').html('<i class="icon-angle-right"></i>');
				$('.orbit-wrapper div.slider-nav span.left').html('<i class="icon-angle-left"></i>');
			}

			videoSlidePos();
			controlsAndInfoPos();
			customSliderHeight();
			
			//height fix for when resize on scroll if off
			if(!$('body').hasClass('mobile') && headerResize.length == 0){
				$('#featured article').css('height',sliderHeight-32+'px')
			}
			
		});
		
	}

    
    //webkit self-hosted video fix
    $('.jp-video-container .jp-play, jp-video-container .jp-seek-bar').click(function(){
    	$(this).parents('.jp-video-container').prev('.jp-jplayer').find('video').show().css('display','block');
    	$(this).parents('.jp-video-container').prev('.jp-jplayer').find('.jp-jplayer > img').hide();
    });
    
    //mobile video more info
    $('#featured .span_12 a.more-info').click(function(){
    	if( !$(this).find('.btv').is(":visible")){
    		$(this).parent().parent().find('h2, > a').css('opacity',1);
    		$(this).parent().parent().find('.video').stop().animate({'top':'-400px'},800,'easeOutCubic');
	    	$(this).parent().parent().find('h2').stop().animate({'top':'-400px'},800,'easeOutCubic');
	    	$(this).parent().parent().find('> a').stop().animate({'top':'-380px'},800,'easeOutCubic');
	    	$(this).find('.btv').show();
	    	$(this).find('.mi').hide();
    	}
    	else {
    		$(this).parent().parent().find('.video').stop().animate({'top':'0px'},800,'easeOutCubic');
	    	$(this).parent().parent().find('h2').stop().animate({'top':'0px'},800,'easeOutCubic');
	    	$(this).parent().parent().find('> a').stop().animate({'top':'0px'},800,'easeOutCubic');
	    	$(this).find('.mi').show();
	    	$(this).find('.btv').hide();
    	}
    	
    	return false;
    });

/***************** Superfish ******************/

	function initSF(){

		$(".sf-menu").superfish({
			 delay: 700,
			 speed: 'fast',
			 speedOut:      'fast',             
			 animation:   {opacity:'show'}
		}); 

	}
	
	var $navLeave;
	
	/*$('header#top nav > ul > li').hover(function(){
		if(!$(this).hasClass('megamenu')){
			
		}
	});*/

	
	function addOrRemoveSF(){
		
		if( window.innerWidth < 1000 && $('body').attr('data-responsive') == '1'){
			$('body').addClass('mobile');
			$('header#top nav').hide();
		}
		
		else {
			$('body').removeClass('mobile');
			$('header#top nav').show();
			$('#mobile-menu').hide();
			
			//recalc height of dropdown arrow
			$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
		}
	}
	
	addOrRemoveSF();
	initSF();
	
	$(window).resize(addOrRemoveSF);

	
	function SFArrows(){

		//set height of dropdown arrow
		$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
	}
	
	SFArrows();
	

	


/***************** Caroufredsel ******************/
	
	function standardCarouselInit() {
		$('.carousel:not(".clients")').each(function(){
	    	var $that = $(this); 
	    	var maxCols = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 'auto' : 3 ;
	    	var scrollNum = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 'auto' : '' ;
	    	var colWidth = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true') ? 500 : 353 ;
	    	var scrollSpeed, easing;
	    	var $autoplayBool = ($(this).attr('data-autorotate') == 'true') ? true : false;
	
			(parseInt($(this).attr('data-scroll-speed'))) ? scrollSpeed = parseInt($(this).attr('data-scroll-speed')) : scrollSpeed = 700;
			($(this).attr('data-easing').length > 0) ? easing = $(this).attr('data-easing') : easing = 'linear';
			
			
			var $element = $that;
			if($that.find('img').length == 0) $element = $('body');
			
			imagesLoaded($element,function(instance){
	
				
		    	$that.carouFredSel({
		    		circular: true,
		    		responsive: true,
			        items       : {
						width : colWidth,
				        visible     : {
				            min         : 1,
				            max         : maxCols
				        }
				    },
				    swipe       : {
				        onTouch     : true,
				        onMouse         : true,
				        options      : {
				        	excludedElements: "button, input, select, textarea, .noSwipe",
				        	tap: function(event, target){ if($(target).attr('href') && !$(target).is('[rel^="prettyPhoto"]')) window.open($(target).attr('href'), '_self'); }
				        },
				        onBefore : function(){
				    		//hover effect fix
				    		$that.find('.work-item').trigger('mouseleave');
				    		$that.find('.work-item .work-info a').trigger('mouseup');
				    	}
				    },
				    scroll: {
				    	items			: scrollNum,
				    	easing          : easing,
			            duration        : scrollSpeed
				    },
			        prev    : {
				        button  : function() {
				           return $that.parents('.carousel-wrap').find('.carousel-prev');
				        }
			    	},
				    next    : {
			       		button  : function() {
				           return $that.parents('.carousel-wrap').find('.carousel-next');
				        }
				    },
				    auto    : {
				    	play: $autoplayBool
				    }
			    }).animate({'opacity': 1},1300);
			    
			    $that.parents('.carousel-wrap').wrap('<div class="carousel-outer">');
			    
			    carouselHeightCalcs();
			    
			    //reinit panr
			    if(!$('body').hasClass('mobile') && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
					$(".portfolio-items.carousel .work-item.style-3 img").panr({
						scaleDuration: .28,
					}); 
				
				}
				
			    
		     });//images loaded
		     	     
	    });//each
    }
    standardCarouselInit();
    
    //fullwidth carousel swipe link fix
    var $mousePosStart = 0;
    var $mousePosEnd = 0;
    $('.carousel-wrap[data-full-width="true"] .portfolio-items .col .work-item .work-info a').mousedown(function(e){
    	$mousePosStart = e.clientX;
    });
    
    $('.carousel-wrap[data-full-width="true"] .portfolio-items .col .work-item .work-info a').mouseup(function(e){
    	$mousePosEnd = e.clientX;
    });
    
    $('.carousel-wrap[data-full-width="true"] .portfolio-items .col .work-item .work-info a').click(function(e){
    	if(Math.abs($mousePosStart - $mousePosEnd) > 10)  return false;
    });
    
     
	function carouselHeightCalcs(){
		
		//recent work carousel
		$('.carousel.portfolio-items').each(function(){
			
			var bottomSpace = ($(this).parents('.carousel-wrap').attr('data-full-width') == 'true' && $(this).find('.style-2, .style-3, .style-4').length > 0) ? 0 : 28 ;
			
			var tallestMeta = 0;
			
			$(this).find('> li').each(function(){
				($(this).find('.work-meta').height() > tallestMeta) ? tallestMeta = $(this).find('.work-meta').height() : tallestMeta = tallestMeta;
			});	
    	 	
     		$(this).parents('.caroufredsel_wrapper').css({
     			'height' : ($(this).find('.work-item').outerHeight() + tallestMeta + bottomSpace -2) + 'px'
     		});
   	  	});
   	  	
   	  	//standard carousel
   	  	$('.carousel:not(".portfolio-items, .clients")').each(function(){
			
			var tallestColumn = 0;
			
			$(this).find('> li').each(function(){
				($(this).height() > tallestColumn) ? tallestColumn = $(this).height() : tallestColumn = tallestColumn;
			});	
    	 	
         	$(this).css('height',tallestColumn + 5);
         	$(this).parents('.caroufredsel_wrapper').css('height',tallestColumn + 5);
			
   	  	});
   	  	
	}
 
    $(window).load(piVertCenter);

	function clientsCarouselInit(){
	     $('.carousel.clients').each(function(){
	    	var $that = $(this);
	    	var columns; 
	    	var $autoRotate = (!$(this).hasClass('disable-autorotate')) ? true : false;
	    	(parseInt($(this).attr('data-max'))) ? columns = parseInt($(this).attr('data-max')) : columns = 5;
	    	if($(window).width() < 690 && $('body').attr('data-responsive') == '1') { columns = 2; $(this).addClass('phone') }
	    	
	    	var $element = $that;
			if($that.find('img').length == 0) $element = $('body');
			
			imagesLoaded($element,function(instance){
	    		
		    	$that.carouFredSel({
			    		circular: true,
			    		responsive: true, 
				        items       : {
							
							height : $that.find('> div:first').height(),
							width  : $that.find('> div:first').width(),
					        visible     : {
					            min         : 1,
					            max         : columns
					        }
					    },
					    swipe       : {
					        onTouch     : true,
					        onMouse         : true
					    },
					    scroll: {
					    	items           : 1,
					    	easing          : 'easeInOutCubic',
				            duration        : '800',
				            pauseOnHover    : true
					    },
					    auto    : {
					    	play            : $autoRotate,
					    	timeoutDuration : 2700
					    }
			    }).animate({'opacity': 1},1300);
			    
			    $that.parents('.carousel-wrap').wrap('<div class="carousel-outer">');
			     
			    //cients carousel height
		  		$(window).resize(function(){
		  			
		  			var tallestImage = 0;
		  			
			    	 $('.carousel.clients').each(function(){
			    	 	
			    	 	$(this).find('> div').each(function(){
							($(this).height() > tallestImage) ? tallestImage = $(this).height() : tallestImage = tallestImage;
						});	
			    	 	
			         	$(this).css('height',tallestImage);
			         	$(this).parent().css('height',tallestImage);
			         });
		   	    });  	
			    
			    $(window).trigger('resize');
			    
		    
		    });
	
	    });
    }
    clientsCarouselInit();
    
    //carousel grabbing class
    $('body').on('mousedown','.caroufredsel_wrapper, .carousel-wrap[data-full-width="true"] .portfolio-items .col .work-item .work-info a',function(){
    	$(this).addClass('active');
    });
    
    $('body').on('mouseup','.caroufredsel_wrapper, .carousel-wrap[data-full-width="true"] .portfolio-items .col .work-item .work-info a',function(){
    	$(this).removeClass('active');
    });
	    

	//fadein for clients / carousels
	$('.clients.fade-in-animation').each(function() {

		$(this).appear(function() {
			$(this).find('> div').each(function(i){
				$(this).delay(i*100).animate({'opacity':"1"},450);
			});
			
			var $that = $(this);
			
			//add the css transition class back in after the aniamtion is done
			setTimeout(function(){ $that.addClass('completed'); },($(this).find('> div').length*100) + 450);
		},{accX: 0, accY: -155},'easeInCubic');
	
	}); 
	
	
/*-------------------------------------------------------------------------*/
/*	2.	Helper Functions
/*-------------------------------------------------------------------------*/

	jQuery.fn.setCursorPosition = function(position){
	    if(this.lengh == 0) return this;
	    return $(this).setSelection(position, position);
	}
	
	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
	    if(this.lengh == 0) return this;
	    input = this[0];
	
	    if (input.createTextRange) {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveEnd('character', selectionEnd);
	        range.moveStart('character', selectionStart);
	        range.select();
	    } else if (input.setSelectionRange) {
	        input.focus();
	        input.setSelectionRange(selectionStart, selectionEnd);
	    }
	
	    return this;
	}
	
	

	$.extend($.expr[':'], {
	    transparent: function(elem, i, attr){
	      return( $(elem).css("opacity") === "0" );
	    }
	});
	
	
	//count
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
	
	
	
	
/*-------------------------------------------------------------------------*/
/*	3.	Shortcode Stuff
/*-------------------------------------------------------------------------*/


/***************** Milestone Counter ******************/

	$('.nectar-milestone').each(function() {
		//symbol
		if($(this).has('[data-symbol]')) {
			if($(this).attr('data-symbol-pos') == 'before') {
				$(this).find('.number').prepend($(this).attr('data-symbol'));
			} else {
				$(this).find('.number').append($(this).attr('data-symbol'));
			}
		}
	});
	
	if(!$('body').hasClass('mobile')) {
		
		$('.nectar-milestone').each(function() {
			//animation
			$(this).appear(function() {
				var $endNum = parseInt($(this).find('.number span').text());
				$(this).find('.number span').countTo({
					from: 0,
					to: $endNum,
					speed: 1500,
					refreshInterval: 30
				});
			},{accX: 0, accY: 0});
		}); 
	}
	
/***************** Tabbed ******************/

	$('body').on('click','.tabbed > ul li a',function(){
		var $id = $(this).parents('li').index()+1;
		
		if(!$(this).hasClass('active-tab') && !$(this).hasClass('loading')){
			$(this).parents('ul').find('a').removeClass('active-tab');
			$(this).addClass('active-tab');
			
			$(this).parents('.tabbed').find('> div:not(.clear)').css({'visibility':'hidden','position':'absolute','opacity':'0','left':'-9999px','display':'none'});
			$(this).parents('.tabbed').find('> div:nth-of-type('+$id+')').css({'visibility':'visible', 'position' : 'relative','left':'0','display':'block'}).stop().animate({'opacity':1});
			
			if($(this).parents('.tabbed').find('> div:nth-of-type('+$id+') .iframe-embed').length > 0) responsiveVideoIframes();
		}
		
		return false;
	});
	
	//make sure the tabs don't have a nectar slider - we'll init this after the sliders load in that case
	
	$('.tabbed').each(function(){
		if($(this).find('.swiper-container').length == 0 && $(this).find('.testimonial_slider').length == 0 && $(this).find('#portfolio').length == 0 && $(this).find('.wpb_gallery .portfolio-items').length == 0 && $(this).find('iframe').length == 0){
			$(this).find('> ul li:first-child a').click();
		}	
		if($(this).find('.testimonial_slider').length == 1 || $(this).find('#portfolio').length == 1 || $(this).find('.wpb_gallery .portfolio-items').length == 1 || $(this).find('iframe').length > 0 ){
			var $that = $(this);
			
			$(this).find('.wpb_tab').show().css({'opacity':0,'height':'1px'});
			$(this).find('> ul li a').addClass('loading');
			
			setTimeout(function(){ 
				$that.find('.wpb_tab').hide().css({'opacity':1,'height':'auto'}); 
				$that.find('> ul li a').removeClass('loading');
				$that.find('> ul li:first-child a').click(); 
			},900);
		}
	});

	
/***************** Toggle ******************/
	
	//toggles
	$('body').on('click','.toggle h3 a', function(){
		
		if(!$(this).parents('.toggles').hasClass('accordion')) { 
			$(this).parents('.toggle').find('> div').slideToggle(300);
			$(this).parents('.toggle').toggleClass('open');
			
			//switch icon
			if( $(this).parents('.toggle').hasClass('open') ){
				$(this).find('i').attr('class','icon-minus-sign');
			} else {
				$(this).find('i').attr('class','icon-plus-sign');
			}

			if($(this).parents('.toggle').find('> div .iframe-embed').length > 0 && $(this).parents('.toggle').find('> div .iframe-embed iframe').height() == '0') responsiveVideoIframes();
			
			return false;
		}
	});
	
	//accordion
	$('body').on('click','.accordion .toggle h3 a', function(){
		
		if($(this).parents('.toggle').hasClass('open')) return false;
		
		$(this).parents('.toggles').find('.toggle > div').slideUp(300);
		$(this).parents('.toggles').find('.toggle h3 a i').attr('class','icon-plus-sign');
		$(this).parents('.toggles').find('.toggle').removeClass('open');
		
		$(this).parents('.toggle').find('> div').slideDown(300);
		$(this).parents('.toggle').addClass('open');
		
		//switch icon
		if( $(this).parents('.toggle').hasClass('open') ){
			$(this).find('i').attr('class','icon-minus-sign');
		} else {
			$(this).find('i').attr('class','icon-plus-sign');
		}
		
		return false;
	});
	
	//accordion start open
	$('.accordion > .toggle').first().addClass('open').find('> div').show();
	$('.accordion > .toggle').first().find('a i').attr('class','icon-minus-sign');
	
	$('.toggles').each(function(){
		
		var $isAccordion = ($(this).hasClass('accordion')) ? true : false;
		
		$(this).find('.toggle').each(function(){
			if($(this).find('> div .testimonial_slider').length > 0 || $(this).find('> div iframe').length > 0) {
				var $that = $(this);
				$(this).find('> div').show().css({'opacity':0,'height':'1px', 'padding':'0'});
				
				testimonialHeightResize();
				
				setTimeout(function(){
					$that.find('> div').hide().css({'opacity':1,'height':'auto', 'padding':'10px 14px'}); 
					if($isAccordion == true && $that.index() == 0) $that.find('> div').slideDown(300);
				},900);
			} 
		});
	})


/***************** Button ******************/
	
	$.cssHooks.color = {
	    get: function(elem) {
	        if (elem.currentStyle)
	            var color = elem.currentStyle["color"];
	        else if (window.getComputedStyle)
	            var color = document.defaultView.getComputedStyle(elem,
	                null).getPropertyValue("color");
	        if (color.search("rgb") == -1)
	            return color;
	        else {
	            color = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	            function hex(x) {
	                return ("0" + parseInt(x).toString(16)).slice(-2);
	            }
	            if(color) {
	            	return "#" + hex(color[1]) + hex(color[2]) + hex(color[3]);
	            }
	        }
	    }
	}
	
	//color
	$('.nectar-button.see-through[data-color-override], .nectar-button.see-through-2[data-color-override]').each(function(){
		
		$(this).css('visibility','visible');
		
		//if($(this).attr('data-color-override') != 'false'){
			
			var $color = ($(this).attr('data-color-override') != 'false') ? $(this).attr('data-color-override') : '#ffffff';
			$(this).css('color',$color);
			$(this).find('i').css('color',$color);
			
			var colorInt = parseInt($color.substring(1),16);
			var $hoverColor = ($(this).has('[data-hover-color-override]')) ? $(this).attr('data-hover-color-override') : 'no-override';
			var $hoverTextColor = ($(this).has('[data-hover-text-color-override]')) ? $(this).attr('data-hover-text-color-override') : '#fff';
			
	   		var R = (colorInt & 0xFF0000) >> 16;
	    	var G = (colorInt & 0x00FF00) >> 8;
	   		var B = (colorInt & 0x0000FF) >> 0;
	   		
			$(this).css('border-color','rgba('+R+','+G+','+B+',0.75)');
			
			if($(this).hasClass('see-through')) {
				$(this).hover(function(){
					$(this).css('border-color','rgba('+R+','+G+','+B+',1)');
				},function(){
					$(this).css('border-color','rgba('+R+','+G+','+B+',0.75)');
				});
			} else {
				
				$(this).find('i').css('color', $hoverTextColor);
				
				if($hoverColor != 'no-override'){
					$(this).hover(function(){
						$(this).css({
							'border-color': $hoverColor,
							'background-color': $hoverColor,
							'color': $hoverTextColor
						});
					},function(){
						$(this).css({
							'border-color':'rgba('+R+','+G+','+B+',0.75)',
							'background-color': 'none',
							'color': $color
						});
					});
				
				} else {
					$(this).hover(function(){
						$(this).css({
							'border-color': $hoverColor,
							'color': $hoverTextColor
						});
					},function(){
						$(this).css({
							'border-color':'rgba('+R+','+G+','+B+',0.75)',
							'color':  $hoverTextColor
						});
					});
				
				}
		//	}
		
		}
	});
	
	$('.nectar-button:not(.see-through):not(.see-through-2)[data-color-override]').each(function(){
		
		$(this).css('visibility','visible');
		
		if($(this).attr('data-color-override') != 'false'){
			
			var $color = $(this).attr('data-color-override');
			$(this).removeClass('accent-color').removeClass('extra-color-1').removeClass('extra-color-2').removeClass('extra-color-3');
			$(this).css('background-color',$color);
			
		}
		
	});


/***************** Column Hover BG ******************/
	
$('.wpb_column[data-hover-bg^=#]').each(function(){

	var $originalBG = $(this).css('background-color');

	$(this).hover(function(){
		$(this).stop(true,true).css('background-color',$(this).attr('data-hover-bg'));
	},function(){
		$(this).stop(true,true).css('background-color',$originalBG);
	});
});

/***************** fancy ul ******************/
	function nectar_fancy_ul_init() {
		$('.nectar-fancy-ul').each(function(){
			
			if($(this).find('li i').length == 0) {
				
				var $icon = $(this).attr('data-list-icon');
				var $color = $(this).attr('data-color');
				var $animation = $(this).attr('data-animation');
				
				$(this).find('li').prepend('<i class="icon-default-style '+$icon+ ' ' + $color +'"></i> ');
				
				if($animation == 'true') {
					$(this).appear(function() {
					
						$(this).find('li').each(function(i){
							$(this).delay(i*250).animate({
								'opacity': '1',
								'left' : '0'
							},250,'easeOutCubic');
						});
						
					},{accX: 0, accY: -105},'easeInCubic');
				} 
				
			}
			
		});
	}
	nectar_fancy_ul_init();
	

/***************** PARALLAX SECTIONS ******************/


	var $window = $(window);
	var windowHeight = $window.height();
	
	$window.resize(function () {
		windowHeight = $window.height();
	});
	
	$.fn.parallaxScroll = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});
		
		$window.resize(function () {
			$this.each(function(){
		  	    firstTop = $this.offset().top;
			});
		});
		
		$window.load(function(){
			$this.each(function(){
		  	    firstTop = $this.offset().top;
			}); 
		});
	 
	
		getHeight = function(jqo) {
			return jqo.outerHeight(true);
		};
		 
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				
	
			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);
				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
				
			});
		}		
	
		$window.bind('scroll', update).resize(update);
		update();
	};



	
/***************** Full Width Section ******************/
	function fullWidthSections(){
		
		var $scrollBar = ($('#ascrail2000').length > 0 && window.innerWidth > 1000) ? -13 : 4;
			 
		if($('#boxed').length == 1){
			$justOutOfSight = ((parseInt($('.container-wrap').width()) - parseInt($('.main-content').width())) / 2) + 4;
		} else {
			
			//if the ext responsive mode is on - add the extra padding into the calcs
			var $extResponsivePadding = ($('body[data-ext-responsive="true"]').length > 0 && window.innerWidth >= 1000) ? 180 : 0;
			
			if($(window).width() <= parseInt($('.main-content').css('max-width'))) { 
				var $windowWidth = parseInt($('.main-content').css('max-width'));
				//no need for the scrollbar calcs with ext responsive on desktop views
				if($extResponsivePadding == 180) $windowWidth = $windowWidth - $scrollBar;
			} else { 
				var $windowWidth = $(window).width();
			}
			
			$justOutOfSight = Math.ceil( (($windowWidth + $extResponsivePadding + $scrollBar - parseInt($('.main-content').css('max-width'))) / 2) )
		}
		
		$('.full-width-section').each(function(){
			
			if(!$(this).parent().hasClass('span_9') && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner' && $(this).parent().attr('id') != 'portfolio-extra' &&
			!$(this).hasClass('non-fw')){

				$(this).css({
					'margin-left': - $justOutOfSight,
					'padding-left': $justOutOfSight,
					'padding-right': $justOutOfSight,
					'visibility': 'visible'
				});	
			}  else if($(this).parent().attr('id') == 'portfolio-extra' && $('#full_width_portfolio').length != 0) {
				$(this).css({
					'margin-left': - $justOutOfSight,
					'padding-left': $justOutOfSight,
					'padding-right': $justOutOfSight,
					'visibility': 'visible'
				});	
			}
			
			else {
				$(this).css({
					'margin-left': 0,
					'padding-left': 0,
					'padding-right': 0,
					'visibility': 'visible'
				});	
			}
			
		});
	
	
	    //full width content sections
	    $('.carousel-outer').has('.carousel-wrap[data-full-width="true"]').css('overflow','visible');
	    
	    $('.carousel-wrap[data-full-width="true"], .portfolio-items[data-col-num="elastic"], .full-width-content').each(function(){
			
			$extraSpace = ($(this).hasClass('carousel-wrap')) ? 1 : 4;
	    	$carouselWidth = ($('#boxed').length == 1) ? parseInt($('.main-content').width()) + parseInt($justOutOfSight*2) : $(window).width() +$extraSpace  + $scrollBar ;
	    	
	    	if($(this).parent().hasClass('default-style')) { 
	    		
	    		if($('#boxed').length != 0) {
	    			$carouselWidth = ($('#boxed').length == 1) ? parseInt($('.main-content').width()) + parseInt($justOutOfSight*2) : $(window).width() + $extraSpace + $scrollBar ;
				}
				else {
					$carouselWidth = ($('#boxed').length == 1) ? parseInt($('.main-content').width()) + parseInt($justOutOfSight*2) : $(window).width()  - ($(window).width()*.02) + $extraSpace + $scrollBar ;
					$windowWidth = ($(window).width() <= parseInt($('.main-content').width())) ? parseInt($('.main-content').width()) : $(window).width() - ($(window).width()*.02);
					$justOutOfSight = Math.ceil( (($windowWidth + $scrollBar - parseInt($('.main-content').width())) / 2) )
				}
			}
	    	
	    	if(!$(this).parents('.span_9').length > 0 && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner' && $(this).parent().attr('id') != 'portfolio-extra' 
	        && !$(this).find('.carousel-wrap[data-full-width="true"]').length > 0
	    	&& !$(this).find('#portfolio[data-col-num="elastic"]').length > 0){

				$(this).css({
					'margin-left': - $justOutOfSight,
					'width': $carouselWidth,
					'visibility': 'visible'
				});	
			}  else if($(this).parent().attr('id') == 'portfolio-extra' && $('#full_width_portfolio').length != 0) {
				$(this).css({
					'margin-left': - $justOutOfSight,
					'width': $carouselWidth,
					'visibility': 'visible'
				});	
			}
			
			else {
				$(this).css({
					'margin-left': 0,
					'visibility': 'visible'
				});	
			}
	    	
	    });

	}
	
	var $contentElementsNum = ($('#portfolio-extra').length == 0) ? $('.main-content > .row > *').length : $('.main-content > .row #portfolio-extra > *').length ;

	$('.full-width-section.parallax_section, .full-width-content.parallax_section').each(function(){
	   var $id = $(this).attr('id');
	   $('#'+$id + ".parallax_section").parallaxScroll("50%", 0.2);
	});
	
	
	//if fullwidth section is first or last, remove the margins so it fits flush against header/footer
	$('.full-width-section, .full-width-content, .row > .nectar-slider-wrap[data-full-width="true"], .wpb_wrapper > .nectar-slider-wrap[data-full-width="true"], .parallax_slider_outer, .portfolio-items[data-col-num="elastic"]').each(function(){
		
		if(!$(this).parent().hasClass('span_9') && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner'){
			
			if($(this).parents('.wpb_row').length > 0){ 
			
				if($(this).parents('#portfolio-extra').length > 0 && $('#full_width_portfolio').length == 0) return false;
				
				////first
				if($(this).parents('.wpb_row').index() == '0' && $('#page-header-bg').length != 0 || $(this).parents('.wpb_row').index() == '0' && $('.parallax_slider_outer').length != 0){
					//$(this).css('margin-top','-2.1em').addClass('first-section nder-page-header');
	
				} 
				else if($(this).parents('.wpb_row').index() == '0' && $('#page-header-bg').length == 0 && $('.page-header-no-bg').length == 0 
				         && $('.project-title').length == 0 && $(this).parents('.wpb_row').index() == '0' 
				         && $('.parallax_slider_outer').length == 0 && $('.project-title').length == 0 
				         && $('body[data-bg-header="true"]').length == 0 ){
				         	
					$(this).css('margin-top','-70px').addClass('first-section');
				} 
				
				//check if it's also last (i.e. the only fws)
				if($(this).parents('.wpb_row').index() == $contentElementsNum-1 && $('#respond').length == 0 ) { 
					if($(this).attr('id') != 'portfolio-filters-inline') {
						$('.container-wrap').css('padding-bottom','0px');
						$('#call-to-action .triangle').remove();
					}
				} 
			
			} else {
				
				if($(this).parents('#portfolio-extra').length > 0 && $('#full_width_portfolio').length == 0) return false;
				
				if( $(this).find('#portfolio-filters-inline').length == 0 && $(this).attr('id') != 'post-area' ) {
					
					////first
					if($(this).index() == '0' && $('#page-header-bg').length != 0 || $(this).index() == '0' && $('.parallax_slider_outer').length != 0){
						//$(this).css('margin-top','-2.1em').addClass('first-section nder-page-header');
		
					} 
					else if($(this).index() == '0' && $('#page-header-bg').length == 0 && $(this).index() == '0' && $('.page-header-no-bg').length == 0 && 
					        $(this).index() == '0' && $('.parallax_slider_outer').length == 0) {
					        	
						$(this).css('margin-top','-70px').addClass('first-section');
					} 
					
					//check if it's also last (i.e. the only fws)
					if($(this).index() == $contentElementsNum-1 && $('#respond').length == 0 ) { 
						$('.container-wrap').css('padding-bottom','0px');
						$('#call-to-action .triangle').remove();
					} 
				}
				
			}
		}
	});
	
	$('#portfolio-extra > .nectar-slider-wrap[data-full-width="true"], .portfolio-wrap').each(function(){
		//check if it's last 
		if($(this).index() == $contentElementsNum-1 && $('#commentform').length == 0 && $('#pagination').length == 0) { 
			$(this).css('margin-bottom','-40px');
			$('#call-to-action .triangle').remove();
		}
	});
	
	
	
	$('#portfolio-filters').each(function(){
		////first
		if($(this).index() == '0' && $('#page-header-bg').length != 0 || $(this).index() == '0' && $('.parallax_slider_outer').length != 0){
			$(this).css({'margin-top':'-2.1em'}).addClass('first-section nder-page-header');
		}  else if($(this).index() == '0' && $('#page-header-bg').length == 0 || $(this).index() == '0' && $('.parallax_slider_outer').length == 0){
			$(this).css({'margin-top':'0px'}).addClass('first-section');
		}
	});
	
	$('#portfolio-filters-inline').each(function(){
		////first
		if($(this).parents('.wpb_row').length > 0){ 
			
			if($(this).parents('.wpb_row').index() == '0' && $('#page-header-bg').length != 0 || $(this).parents('.wpb_row').index() == '0' && $('.parallax_slider_outer').length != 0){
				$(this).css({'margin-top':'-2.1em', 'padding-top' : '19px'}).addClass('first-section nder-page-header');
			}  else if($(this).parents('.wpb_row').index() == '0' && $('#page-header-bg').length == 0 || $(this).parents('.wpb_row').index() == '0' && $('.parallax_slider_outer').length == 0){
				$(this).css({'margin-top':'-70px', 'padding-top' : '50px'}).addClass('first-section');
			}
			
		} else {
			if($(this).index() == '0' && $('#page-header-bg').length != 0 || $(this).index() == '0' && $('.parallax_slider_outer').length != 0){
				$(this).css({'margin-top':'-2.1em', 'padding-top' : '19px'}).addClass('first-section nder-page-header');
			}  else if($(this).index() == '0' && $('#page-header-bg').length == 0 || $(this).index() == '0' && $('.parallax_slider_outer').length == 0){
				$(this).css({'margin-top':'-70px', 'padding-top' : '50px'}).addClass('first-section');
			}
		}
		
	});
	
	
	
	$('.parallax_slider_outer').each(function(){
		if(!$(this).parent().hasClass('span_9') && !$(this).parent().hasClass('span_3') && $(this).parent().attr('id') != 'sidebar-inner'){
			
			if($(this).parents('#portfolio-extra').length > 0 && $('#full_width_portfolio').length == 0) return false;
			////first
			if($(this).parent().index() == '0' && $('#page-header-bg').length != 0){
				$(this).addClass('first-section nder-page-header');

			} 
			else if($(this).parent().index() == '0' && $('#page-header-bg').length == 0){
				$(this).css('margin-top','-40px').addClass('first-section');
				if(!$('body').hasClass('single-post')) $('.container-wrap').css('padding-top', '0px');
			} 
			
			//check if it's also last (i.e. the only fws)
			if($(this).parent().index() == $contentElementsNum-1 && $('#post-area').length == 0) {
				$('#call-to-action .triangle').remove();
				$('.container-wrap').hide();
			}
		}
	});
	
	//if not using a fullwidth slider first, ajdust the top padding
	//if( $('.nectar-slider-wrap.first-section').length > 0 && $('.nectar-slider-wrap.first-section').attr('data-full-width') != 'true' || $('.nectar-slider-wrap.first-section').length > 0 && $('.nectar-slider-wrap.first-section').attr('data-full-width') != 'boxed-full-width' ) $('body').attr('data-bg-header','false');
	//if( $('.wpb_row.first-section:not(".full-width-content") .nectar-slider-wrap').length > 0 && $('.wpb_row.first-section:not(".full-width-content") .nectar-slider-wrap').attr('data-full-width') != 'true' || $('.wpb_row.first-section:not(".full-width-content") .nectar-slider-wrap').length > 0 && $('.wpb_row.first-section:not(".full-width-content") .nectar-slider-wrap').attr('data-full-width') != 'boxed-full-width' ) $('body').attr('data-bg-header','false');
	
	
	//set sizes
	fullWidthSections();
	
	
	//sizing for fullwidth sections that are image only
	
	////set inital sizes
	$('.full-width-section').each(function(){
		
		var $fwsHeight = $(this).outerHeight(true);
		
		//make sure it's empty and also not being used as a small dvider
		if($(this).find('.span_12 *').length == 0 && $.trim( $(this).find('.span_12').text() ).length == 0  && $fwsHeight > 40){
			$(this).addClass('bg-only');
			$(this).css({'height': $fwsHeight, 'padding-top': '0px', 'padding-bottom': '0px'});
			$(this).attr('data-image-height',$fwsHeight);
		}

	});
	
	function fullwidthImgOnlySizing(){
		
		$('.full-width-section.bg-only').each(function(){
			var $initialHeight = $(this).attr('data-image-height');
			
			if( window.innerWidth < 1000 && window.innerWidth > 690 ) {
				$(this).css('height', $initialHeight - $initialHeight*.60);
			} 
			
			else if( window.innerWidth <= 690 ) {
				$(this).css('height', $initialHeight - $initialHeight*.78);
			} 
			
			else if( window.innerWidth < 1300 && window.innerWidth >= 1000  ) {
				$(this).css('height', $initialHeight - $initialHeight*.33);
			} 
			
			else {
				$(this).css('height', $initialHeight);
			}
			
		});
		
	}
	
	fullwidthImgOnlySizing();
	
	
	
	//full width content column sizing
	function fullWidthContentColumns(){

		//standard carousel
   	  	$('.main-content > .row > .full-width-content, #portfolio-extra > .full-width-content').each(function(){
			
			//only set the height if more than one column
			if($(this).find('> .span_12 > .col').length > 1){
				
				var tallestColumn = 0;
				var $columnInnerHeight = 0;
				
				$(this).find('> .span_12 > .col').each(function(){
					
					var $padding = parseInt($(this).css('padding-top'));
					($(this).find('> .wpb_wrapper').height() + ($padding*2) > tallestColumn) ? tallestColumn = $(this).find('> .wpb_wrapper').height() + ($padding*2)  : tallestColumn = tallestColumn;
				});	
	    	 	
	    	 	$(this).find('> .span_12 > .col').each(function(){
	    	 		//columns with content
		    	 	if($(this).find('> .wpb_wrapper > *').length > 0){
		    	 		$(this).css('height',tallestColumn);
		    	 	} 
		    	 	//empty columns
		    	 	else {
		    	 		$(this).css('min-height',tallestColumn);
		    	 	}
	    	 	});
	         	
	         	//nested column height
	         	var $childRows = $(this).find('> .span_12 > .col .wpb_row').length;
	         	if(window.innerWidth > 1000) { 
	         		
	         		var $padding = parseInt($(this).find('> .span_12 > .col').css('padding-top'));
	         		
	         		//$(this).find('> .span_12 > .col .wpb_row .col').css('min-height',(tallestColumn-($padding*2))/$childRows + 'px'); 
	         	} else {
	         		$(this).find('> .span_12 > .col .wpb_row .col').css('min-height','0px'); 
	         	}
	         	
	         	
	         	//vertically center
	         	if($(this).hasClass('vertically-align-columns') && window.innerWidth > 1000){
	         		
	         		//parent columns
		         	$(this).find('> .span_12 > .col').each(function(){
						
						$columnInnerHeight = $(this).find('> .wpb_wrapper').height();
						var $marginCalc = ($(this).height()/2)-($columnInnerHeight/2);
						if($marginCalc <= 0) $marginCalc = 0;
						
						$(this).find('> .wpb_wrapper').css('margin-top',$marginCalc);
						$(this).find('> .wpb_wrapper').css('margin-bottom',$marginCalc);
						
					});	
	
					
				}
			
			}
			
   	  	});
		
	}
	
	fullWidthContentColumns();
	
	



$('.wpb_row:has(.nectar-parallax-scene)').each(function(){

	var $strength = parseInt($(this).find('.nectar-parallax-scene').attr('data-scene-strength'));

	$(this).find('.nectar-parallax-scene').parallax({
		scalarX: $strength,
  		scalarY: $strength
	});




});

	
/***************** Checkmarks ******************/

	$('ul.checks li').prepend('<i class="icon-ok-sign"></i>');
	

/***************** Image with Animation / Col Animation *******************/


	
function colAndImgAnimations(){
	$('img.img-with-animation').each(function() {
	
		$(this).appear(function() {

			if($(this).css('opacity') != '1') {
				
				if($(this).attr('data-animation') == 'fade-in-from-left'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'left' : '0px'
					},600,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-right'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'right' : '0px'
					},600,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'bottom' : '0px'
					},600,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in') {
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1
					},600,'easeOutSine');	
				} else if($(this).attr('data-animation') == 'grow-in') {
					var $that = $(this);
					setTimeout(function(){ 
						$that.transition({ scale: 1, 'opacity':1 },900,'cubic-bezier(0.15, 0.84, 0.35, 1.25)');
					},$that.attr('data-delay'));
				}
				
				else if($(this).attr('data-animation') == 'flip-in') {
					var $that = $(this);
					setTimeout(function(){ 
						$that.transition({  rotateY: 0, 'opacity':1 },1100);
					},$that.attr('data-delay'));
				}
				
			}
			
		},{accX: 0, accY: -105},'easeInCubic');
	
	});



	$('.col.has-animation, .wpb_column.has-animation').each(function() {
	    
		$(this).appear(function() {
			
			if($(this).css('opacity') != '1') {
			 	
				if($(this).attr('data-animation') == 'fade-in-from-left'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'left' : '0px'
					},800,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-right'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'right' : '0px'
					},800,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1,
						'bottom' : '0px'
					},800,'easeOutSine');
				} else if($(this).attr('data-animation') == 'fade-in') {
					$(this).delay($(this).attr('data-delay')).animate({
						'opacity' : 1
					},800,'easeOutSine');	
				} else if($(this).attr('data-animation') == 'grow-in') {
					var $that = $(this);
					setTimeout(function(){ 
						$that.transition({ scale: 1, 'opacity':1 },900,'cubic-bezier(0.15, 0.84, 0.35, 1.25)');
					},$that.attr('data-delay'));
				} else if($(this).attr('data-animation') == 'flip-in') {
					var $that = $(this);
					setTimeout(function(){ 
						$that.transition({  rotateY: 0, 'opacity':1 },1100);
					},$that.attr('data-delay'));
				}
			
			}
			
	
		},{accX: 0, accY: -105},'easeInCubic');
	
	}); 	
}
	
setTimeout(function(){ 
	colAndImgAnimations();
},100); 	


	
/***************** 4 Col Grid in iPad ******************/
	
	//add one-fourth class
	$('.col.span_3, .vc_span3').each(function(){
		var $currentDiv = $(this);
		var $nextDiv = $(this).next('div');
		if( $nextDiv.hasClass('span_3') && !$currentDiv.hasClass('one-fourths') || $nextDiv.hasClass('vc_span3') && !$currentDiv.hasClass('one-fourths') ) {
			$currentDiv.addClass('one-fourths clear-both');
			$nextDiv.addClass('one-fourths right-edge');
		}
	});
	
	/*$('.vc_span4').each(function(){
		if($(this).find('.team-member').length > 0 && $(this).parents('.full-width-content').length > 0) {
			var $currentDiv = $(this);
			var $nextDiv = $(this).next('div');
			if( !$currentDiv.hasClass('one-fourths')) {
				$currentDiv.addClass('one-fourths clear-both');
				$nextDiv.addClass('one-fourths right-edge');
			}
		}
	});*/
	
	//make empty second 1/2 half columsn display right on iPad
	$('.span_12 .col.span_6').each(function(){
		if($(this).next('div').hasClass('span_6') && $.trim( $(this).next('div').html() ).length == 0 ) {
			$(this).addClass('empty-second')
		}
	}); 
	
	
/***************** Bar Graph ******************/
	
	$('.nectar-progress-bar').each(function(i){
		
		$(this).appear(function(){
			
			var percent = $(this).find('span').attr('data-width');
			var $endNum = parseInt($(this).find('span strong i').text());
			var $that = $(this);
			
			$(this).find('span').animate({
				'width' : percent + '%'
			},1600, 'easeOutCirc',function(){
			});
			
			$(this).find('span strong').animate({
				'opacity' : 1
			},1350);
			
			
			$(this).find('span strong i').countTo({
				from: 0,
				to: $endNum,
				speed: 1100,
				refreshInterval: 30,
				onComplete: function(){
		
				}
			});	
			
			////100% progress bar 
				if(percent == '100'){
					$that.find('span strong').addClass('full');
				}
	
		});

	});
	



/***************** Pricing Tables ******************/


var $tallestCol;

function pricingTableHeight(){
	$('.pricing-table').each(function(){
		$tallestCol = 0;
		
		$(this).find('> div ul').each(function(){
			($(this).height() > $tallestCol) ? $tallestCol = $(this).height() : $tallestCol = $tallestCol;
		});	
		
		//safety net incase pricing tables height couldn't be determined
		if($tallestCol == 0) $tallestCol = 'auto';
		
		//set even height
		$(this).find('> div ul').css('height',$tallestCol);

	});
}

pricingTableHeight();

 
/***************** Testimonial Slider ******************/

//fadeIn
$('.testimonial_slider').animate({'opacity':'1'},800);

//testimonial slider controls
$('body').on('click','.testimonial_slider .controls li', function(){
	
	if($(this).find('span').hasClass('active')) return false;
	
	var $index = $(this).index();
	var currentHeight = $(this).parents('.testimonial_slider').find('.slides blockquote').eq($index).height();
	
	$(this).parents('.testimonial_slider').find('li span').removeClass('active');
	$(this).find('span').addClass('active');
	
	$(this).parents('.testimonial_slider').find('.slides blockquote').stop().css({'opacity':'0', 'left':'-25px', 'z-index': '1'});
	$(this).parents('.testimonial_slider').find('.slides blockquote').eq($index).stop(true,true).animate({'opacity':'1','left':'0'},550,'easeOutCubic').css('z-index','20');
	$(this).parents('.testimonial_slider:not(.disable-height-animation)').find('.slides').stop(true,true).animate({'height' : currentHeight + 20 + 'px' },450,'easeOutCubic');
	
});


var $tallestQuote;

//create controls
function createTestimonialControls() {
	$('.testimonial_slider').each(function(){
		
		if($(this).find('blockquote').length > 1 && $(this).find('.controls').length == 0) {
			$(this).append('<div class="controls"><ul></ul></div>');
			
			var slideNum = $(this).find('blockquote').length;
			var $that = $(this);
			
			for(var i=0;i<slideNum;i++) {
				$that.find('.controls ul').append('<li><span class="pagination-switch"></span></li>')
			}
			
			//activate first slide
			$(this).find('.controls ul li').first().click();
			
			//autorotate
			if($(this).attr('data-autorotate').length > 0) {
				slide_interval = (parseInt($(this).attr('data-autorotate')) < 100) ? 4000 : parseInt($(this).attr('data-autorotate'));
				var $that = $(this);
				var $rotate = setInterval(function(){ testimonialRotate($that) },slide_interval);
			}
			
			$(this).find('.controls li').click(function(e){
				if(typeof e.clientX != 'undefined') clearInterval($rotate);
			});
			
			////swipe for testimonials
			$(this).swipe({
			
				swipeLeft : function(e) {
					$(this).find('.controls ul li span.active').parent().next('li').find('span').trigger('click');
					e.stopImmediatePropagation();
					clearInterval($rotate);
					return false;
				 },
				 swipeRight : function(e) {
					$(this).find('.controls ul li span.active').parent().prev('li').find('span').trigger('click');
					e.stopImmediatePropagation();
					clearInterval($rotate);
					return false;
				 }    
			});
		} 
		//only one testimonial
		else if($(this).find('.controls').length == 0) {
			var currentHeight = $(this).find('.slides blockquote').height();
			$(this).find('.slides blockquote').stop().css({'opacity':'0', 'left':'-25px', 'z-index': '1'});
			$(this).find('.slides blockquote').stop(true,true).animate({'opacity':'1','left':'0'},550,'easeOutCubic').css('z-index','20');
			$(this).find('.slides').stop(true,true).animate({'height' : currentHeight + 20 + 'px' },450,'easeOutCubic');
		}
	});
}
createTestimonialControls();

function testimonialRotate(slider){
	
	var $testimonialLength = slider.find('li').length;
	var $currentTestimonial = slider.find('.pagination-switch.active').parent().index();
	
	//stop the rotation when toggles are closed
	if( slider.parents('.toggle').length > 0 && slider.parents('.toggle').hasClass('open') ) {

		if( $currentTestimonial+1 == $testimonialLength) {
			slider.find('ul li:first-child').click();
		} else {
			slider.find('.pagination-switch.active').parent().next('li').click();
		}
		
	} else {
		
		if( $currentTestimonial+1 == $testimonialLength) {
			slider.find('ul li:first-child').click();
		} else {
			slider.find('.pagination-switch.active').parent().next('li').click();
		}
	
	}

}

function testimonialHeightResize(){
	$('.testimonial_slider:not(.disable-height-animation)').each(function(){
		
		var $index = $(this).find('.controls ul li span.active').parent().index();
		var currentHeight = $(this).find('.slides blockquote').eq($index).height();
		$(this).find('.slides').stop(true,true).css({'height' : currentHeight + 20 + 'px' });
		
	});
}


function testimonialSliderHeight() {
		
	$('.testimonial_slider.disable-height-animation').each(function(){
		$tallestQuote = 0;
			
		$(this).find('blockquote').each(function(){
			($(this).height() > $tallestQuote) ? $tallestQuote = $(this).height() : $tallestQuote = $tallestQuote;
		});	
		
		//safety net incase height couldn't be determined
		if($tallestQuote == 0) $tallestQuote = 100;
		
		//set even height
		$(this).find('.slides').css('height',$tallestQuote+20+'px');
		
		//show the slider once height is set
		$(this).animate({'opacity':'1'});

	});

}

testimonialSliderHeight(); 



/***************** WP Media Embed / External Embed ******************/

//this isn't the for the video shortcode* This is to help any external iframe embed fit & resize correctly 
function responsiveVideoIframesInit(){
	$('iframe').each(function(){
		
		//make sure the iframe has a src (things like adsense don't)
		if(typeof $(this).attr('src') != 'undefined' && !$(this).parent().hasClass('iframe-embed') ){
			
			if( $(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || $(this).attr('src').toLowerCase().indexOf("vimeo") >= 0  || $(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0 || $(this).attr('src').toLowerCase().indexOf("kickstarter") >= 0 || $(this).attr('src').toLowerCase().indexOf("dailymotion") >= 0) {
				$(this).wrap('<div class="iframe-embed"/>');	
				
				$(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
	
				//add wmode=transparent to all youytube embeds to fix z-index issues in IE
				if($(this).attr('src').indexOf('wmode=transparent') == -1) {
					if($(this).attr('src').indexOf('?') == -1){
						$(this).attr('src',$(this).attr('src') + '?wmode=transparent');
					} else {
						$(this).attr('src',$(this).attr('src') + '&wmode=transparent');
					}
				}
			}
			 
		} else {
			//if($(this).parents('ins').length == 0){ 
			//	$(this).wrap('<div class="iframe-embed-standard"/>');	
			//}
		}
		
	});
}

function responsiveVideoIframes(){
	 $('iframe[data-aspectRatio]').each(function() {
	 	var newWidth = $(this).parent().width();
	 	 
		var $el = $(this);
		
		//in nectar slider
		if($(this).parents('.swiper-slide').length > 0) {
			if($(this).is(':visible')) $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
		} 
		//all others
		else {
			$el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
		}
		
		
	});
}

responsiveVideoIframesInit();
responsiveVideoIframes();
fullWidthContentColumns();


//unwrap post and protfolio videos
$('.video-wrap iframe').unwrap();
$('#sidebar iframe[src]').unwrap();

$('video:not(.slider-video)').attr('width','100%');
$('video:not(.slider-video)').attr('height','100%'); 

$('audio').attr('width','100%');
$('audio').attr('height','100%');

$('audio').css('visibility','visible');

if($('body').hasClass('mobile')){
	$('video').css('visibility','hidden');
} else {
	$('video').css('visibility','visible');
}

$(window).load(function(){
	$('video').css('visibility','visible');
	showLateIframes();
});

$(window).trigger('resize');

//webkit video back button fix 
$('iframe[src]').each(function(){
	$(this).attr('src',$(this).attr('src'));
	$(this).css({'opacity':'1', 'visibility':'visible'});
});

showLateIframes();

function showLateIframes(){
	$('iframe[src]').css('opacity','1');
	setTimeout(function(){ $('iframe[src]').css('opacity','1'); }, 100);
	setTimeout(function(){ $('iframe[src]').css('opacity','1'); }, 500);
	setTimeout(function(){ $('iframe[src]').css('opacity','1'); }, 1000);
	setTimeout(function(){ $('iframe[src]').css('opacity','1'); }, 1500);
	setTimeout(function(){ $('iframe[src]').css('opacity','1'); }, 2500);
}


/***************** Nectar Video BG ******************/

if($('.nectar-video-bg').length > 0) {
	
	$('.wpb_row:has(".nectar-video-wrap")').each(function(i){
		$(this).css('z-index',100 + i);
	});

	var min_w = 1200; // minimum video width allowed
	var vid_w_orig;  // original video dimensions
	var vid_h_orig;
	
    vid_w_orig = 1280;
    vid_h_orig = 720;
 
	function resizeVideoToCover() {
		$('.nectar-video-wrap').each(function(i){
			
			var $containerHeight = $(this).parents('.wpb_row').outerHeight();			
			var $containerWidth = $(this).parents('.wpb_row').outerWidth();

		    // set the video viewport to the window size
		    $(this).width($containerWidth);
		    $(this).height($containerHeight);
		
		    // use largest scale factor of horizontal/vertical
		    var scale_h = $containerWidth / vid_w_orig;
		    var scale_v = ($containerHeight - $containerHeight) / vid_h_orig; 
		    var scale = scale_h > scale_v ? scale_h : scale_v;
			
			//update minium width to never allow excess space
		    min_w = 1280/720 * ($containerHeight+40);
		    
		    // don't allow scaled width < minimum video width
		    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;}
		        
		    // now scale the video
		    $(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * vid_w_orig +20));
		    $(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * vid_h_orig +20));
		    
		    // and center it by scrolling the video viewport
		    $(this).scrollLeft(($(this).find('video').width() - $containerWidth) / 2);
		    $(this).scrollTop(($(this).find('video').height() - ($containerHeight)) / 2);
		    $(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - ($containerHeight)) / 2);

		});
	}
    
    //init
    setTimeout(function(){
    	resizeVideoToCover();
    	$('.video-color-overlay').each(function(){
    		$(this).css('background-color',$(this).attr('data-color'));
    	});
    	$('.nectar-video-wrap').animate({'opacity':'1'},800,'easeInOutExpo');
    	$('.video-color-overlay').animate({'opacity':'0.7'},800,'easeInOutExpo');
    	
    },400);

	if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
		$('.wpb_row .mobile-video-image').show();
		$('.nectar-video-wrap').remove();
	}
		
}


/*-------------------------------------------------------------------------*/
/*	4.	Header + Search
/*-------------------------------------------------------------------------*/	 



/***************** Page Headers ******************/

var pageHeaderHeight = parseInt($('#page-header-bg').attr('data-height'));
var pageHeaderHeightCopy = parseInt($('#page-header-bg').attr('data-height'));
var pageHeadingHeight;

//set the user defined height
if($('#header-outer[data-transparent-header="true"]').length > 0) {
	//if( pageHeaderHeight < $('#header-space').height() + 150) {
	//	pageHeaderHeight = $('#header-space').height() + 150;
	//	pageHeaderHeightCopy = $('#header-space').height() + 150;
	//}
}

$('#page-header-bg').css('height',pageHeaderHeight+'px').removeClass('not-loaded');
setTimeout(function(){ $('#page-header-bg').css('overflow','visible') },800);
	
function pageHeader(){
	
	
	if( window.innerWidth < 1000 && window.innerWidth > 690 && !$('body').hasClass('salient_non_responsive') ) {
		
		$('#page-header-bg').attr('data-height', pageHeaderHeightCopy/1.6).css('height',pageHeaderHeightCopy/1.6 +'px');
		
	} else if( window.innerWidth <= 690 && window.innerWidth > 480 && !$('body').hasClass('salient_non_responsive')) {
		
		$('#page-header-bg').attr('data-height', pageHeaderHeightCopy/2.1).css('height',pageHeaderHeightCopy/2.1 +'px');
		
	} else if( window.innerWidth <= 480 && !$('body').hasClass('salient_non_responsive')) {
		
		$('#page-header-bg').attr('data-height', pageHeaderHeightCopy/2.5).css('height',pageHeaderHeightCopy/2.5 +'px');
		
	} else {
		$('#page-header-bg').attr('data-height', pageHeaderHeightCopy).css('height',pageHeaderHeightCopy +'px');
		if($('#page-header-bg[data-parallax="1"]').length == 0) $('#page-header-wrap').css('height',pageHeaderHeightCopy +'px');
	}
	
	
	if(!$('body').hasClass('mobile')){
		
		//recalc
		pageHeaderHeight = parseInt($('#page-header-bg').attr('data-height'));
		$('#page-header-bg .container > .row').css('top',0);
		
		//center the heading
		pageHeadingHeight = $('#page-header-bg .col.span_6').height();
		
		if($('#header-outer[data-transparent-header="true"]').length > 0) {
			$('#page-header-bg:not("[data-parallax=1]") .col.span_6').css('top', ((pageHeaderHeight+$('#header-space').height())/2) - (pageHeadingHeight/2));
		} else {
			$('#page-header-bg:not("[data-parallax=1]") .col.span_6').css('top', (pageHeaderHeight/2) - (pageHeadingHeight/2) + 22);
		}
		
		
		//center portfolio filters
		$('#page-header-bg:not("[data-parallax=1]") #portfolio-filters').css('top', (pageHeaderHeight/2) + 2);	
		
		if($('#page-header-bg[data-parallax="1"] .span_6').css('opacity') > 0) {
			
			if($('#header-outer[data-transparent-header="true"]').length > 0) {
				//center the parallax heading
			    $('#page-header-bg[data-parallax="1"] .span_6').css({ 
					'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+60)),
					'top' : (((pageHeaderHeight+$('#header-space').height())/2) - (pageHeadingHeight/2)) +"px"
			    });
			    
			    //center parllax portfolio filters
			    $('#page-header-bg[data-parallax="1"] #portfolio-filters').css({ 
					'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+75)),
					'top' : ($scrollTop*-0.10) + ((pageHeaderHeight/2)) - 7 +"px"
			    });
		  } else {
		  		//center the parallax heading
			    $('#page-header-bg[data-parallax="1"] .span_6').css({ 
					'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+60)),
					'top' : ((pageHeaderHeight/2) - (pageHeadingHeight/2)) +10 +"px"
			    });
			    
			    //center parllax portfolio filters
			    $('#page-header-bg[data-parallax="1"] #portfolio-filters').css({ 
					'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+75)),
					'top' : ($scrollTop*-0.10) + ((pageHeaderHeight/2)) - 7 +"px"
			    });
		  }
	   }
	}
	
	else {
		//recalc
		pageHeaderHeight = parseInt($('#page-header-bg').attr('data-height'));
		
		//center the heading
		var pageHeadingHeight = $('#page-header-bg .container > .row').height();
		$('#page-header-bg .container > .row').css('top', (pageHeaderHeight/2) - (pageHeadingHeight/2) + 5);
		
	}


	$('#page-header-bg .container > .row').css('visibility','visible');
}

pageHeader();


if($('#header-outer').attr('data-header-resize') == '' || $('#header-outer').attr('data-header-resize') == '0'){
	$('#page-header-wrap').css('margin-top','0');
}

 
/***************** Parallax Page Headers ******************/
if($('#page-header-bg[data-parallax="1"]').length > 0) {

	//fadeIn
	function extractUrl(input) {
 		return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
	}
	
	var img = new Image();
	
	var imgX, imgY, aspectRatio;
	var diffX, diffY;
	var pageHeadingHeight = $('#page-header-bg .col.span_6').height();
	var pageHeaderHeight = parseInt($('#page-header-bg').attr('data-height'));
	var headerPadding2 = parseInt($('#header-outer').attr('data-padding'))*2;
	var wooCommerceHeader = ($('.demo_store').length > 0) ? 32 : 0 ;
	
	function pageHeaderInit(){
	 //transparent
	  if($('#header-outer[data-transparent-header="true"]').length > 0) {	
	     $('#page-header-bg[data-parallax="1"]').css({'top': extraHeight+wooCommerceHeader });
	  } else {
	  	 $('#page-header-bg[data-parallax="1"]').css({'top': (logoHeight+headerPadding+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader+wooCommerceHeader)  + 'px' });
	  }
	  
	  $('#page-header-bg[data-parallax="1"]').animate({ 'opacity' : 1},650,'easeInCubic');
	  
	  $('#page-header-wrap').css({'height' : pageHeaderHeight});
	  
	  //verify smooth scorlling
	  if( $smoothCache == true && $(window).width() > 690 && $('body').outerHeight(true) > $(window).height() && Modernizr.csstransforms3d && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){ niceScrollInit(); $(window).trigger('resize') } 
	  
	  /* $('#page-header-bg[data-parallax="1"] .span_6').css({ 
			'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+60))
			'top' : ((pageHeaderHeight/2) - (pageHeadingHeight/2)) +10 +"px"
	   });
	   
	   $('#page-header-bg[data-parallax="1"] #portfolio-filters').css({ 
			'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*2)+75)),
			'top' : ($scrollTop*-0.10) + ((pageHeaderHeight/2)) - 7 +"px"
	   }); */
	  
	}
	
	var $initialImgCheck = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));
	
	if ($initialImgCheck && $initialImgCheck.indexOf('.') !== -1) {    
		img.onload = function() {
		   pageHeaderInit(); 
		}
		
		img.src = extractUrl($('#page-header-bg[data-parallax="1"]').css('background-image'));
		
	} else {
		 pageHeaderInit();
	}
	
	
	
	var extraHeight = ($('#wpadminbar').length > 0) ? $('#wpadminbar').height() : 0; //admin bar
	
	$(window).scroll(function(){
		
		var $scrollTop = $(window).scrollTop();
		var pageHeadingHeight = $('#page-header-bg .col.span_6').height();
		
		
		if(!$('body').hasClass('mobile') && navigator.userAgent.match(/iPad/i) == null){
	
			//calc bg pos
			//$('#page-header-bg[data-parallax="1"]').css({'top': ((- $scrollTop / 5)+logoHeight+headerPadding+headerResizeOffExtra+extraHeight-extraDef+secondaryHeader)  + 'px' });
			$('#page-header-bg[data-parallax="1"]').transition({ y: $(window).scrollTop()*-.2 },0);	
			
			var multipler = ($('body').hasClass('single')) ? 1 : 2;
			$('#page-header-bg[data-parallax="1"] .span_6').css({ 
				'opacity' : 1-($scrollTop/(pageHeaderHeight-($('#page-header-bg .col.span_6').height()*multipler)+60))
			});
			
			$('#page-header-bg[data-parallax="1"] .span_6').stop(true,true).transition({ y: $(window).scrollTop()*-.14 },0);
			
			
			if($('#page-header-bg[data-parallax="1"] .span_6').css('opacity') == 0){
				$('#page-header-bg[data-parallax="1"] .span_6, #page-header-bg[data-parallax="1"] #portfolio-filters').hide();
			} else {
				$('#page-header-bg[data-parallax="1"] .span_6, #page-header-bg[data-parallax="1"] #portfolio-filters').show();
			}
			
			//hide elements to allow other parallax sections to work in webkit browsers
			if( ($scrollTop / (pageHeaderHeight + $('#header-space').height() + extraHeight)) > 1 ) {
				$('#page-header-bg').css('visibility','hidden').hide();
			}
			else {
			 	$('#page-header-bg').css('visibility','visible').show();
		    }
			
			
		}
		
	
	});
}





/***************** WooCommerce Cart *****************/
var timeout;
var productToAdd;

//notification
$('.woocommerce .product-wrap .add_to_cart_button').click(function(){
	productToAdd = $(this).parents('li').find('h3').text();
	$('#header-outer .cart-notification span.item-name').html(productToAdd);
});

//notification hover
$('#header-outer .cart-notification').hover(function(){
	$(this).fadeOut(400);
	$('#header-outer .widget_shopping_cart').stop(true,true).fadeIn(400);
	$('#header-outer .cart_list').stop(true,true).fadeIn(400);
	clearTimeout(timeout);
});

//cart dropdown
$('#header-outer div.cart-outer').hover(function(){
	$('#header-outer .widget_shopping_cart').stop(true,true).fadeIn(400);
	$('#header-outer .cart_list').stop(true,true).fadeIn(400);
	clearTimeout(timeout);
	$('#header-outer .cart-notification').fadeOut(300);
},function(e){
	setTimeout(function(){
		if(!$('.cart-outer').is(':hover')){
			$('#header-outer .widget_shopping_cart').stop(true,true).fadeOut(300);
			$('#header-outer .cart_list').stop(true,true).fadeOut(300);
		}
	},100);
});

$('body').bind('added_to_cart', shopping_cart_dropdown_show);
$('body').bind('added_to_cart', shopping_cart_dropdown);

function shopping_cart_dropdown() {
		
		if(!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length && $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0 ) {
			$('.cart-menu-wrap').addClass('has_products');
			$('header#top nav > ul, #search-outer #search #close a').addClass('product_added');
		}
}

function shopping_cart_dropdown_show(e) {
		
		clearTimeout(timeout);
		
		if(!$('.widget_shopping_cart .widget_shopping_cart_content .cart_list .empty').length && $('.widget_shopping_cart .widget_shopping_cart_content .cart_list').length > 0 && typeof e.type != 'undefined' ) {
			//before cart has slide in
			if(!$('#header-outer .cart-menu-wrap').hasClass('has_products')) {
				setTimeout(function(){ $('#header-outer .cart-notification').fadeIn(400); },400);
			}
			else if(!$('#header-outer .cart-notification').is(':visible')) {
				$('#header-outer .cart-notification').fadeIn(400);
			} else {
				$('#header-outer .cart-notification').show();
			}
			timeout = setTimeout(hideCart,2700);
		}
}

function hideCart() {
	$('#header-outer .cart-notification').stop(true,true).fadeOut();
}

setTimeout(shopping_cart_dropdown,550);
setTimeout(shopping_cart_dropdown,650);
setTimeout(shopping_cart_dropdown,950);
setTimeout(shopping_cart_dropdown,1650);



/***************** Search ******************/
	var $placeholder = $('#search input[type=text]').attr('data-placeholder');
	var logoHeight = parseInt($('#header-outer').attr('data-logo-height'));
	
	////search box event
	$('#search-btn').mousedown(function(){
		
		$(this).removeClass();
		
		$('#header-outer #search-outer').stop(true).fadeIn(600,'easeOutExpo');
		
		$('#search-outer > #search input[type="text"]').css({
			'top' : $('#search-outer').height()/2 - $('#search-outer > #search input[type="text"]').height()/2
		});
		
		$('#search input[type=text]').focus();
		
		if($('#search input[type=text]').attr('value') == $placeholder){
			$('#search input[type=text]').setCursorPosition(0);	
		}

		return false;
	});
	
	$('#search input[type=text]').keydown(function(){
		if($(this).attr('value') == $placeholder){
			$(this).attr('value', '');
		}
	});
	
	$('#search input[type=text]').keyup(function(){
		if($(this).attr('value') == ''){
			$(this).attr('value', $placeholder);
			$(this).setCursorPosition(0);
		}
	});
	
	
	////close search btn event
	$('#close').click(function(){
		
		closeSearch();
		return false;
	});

	//if user clicks away from the search close it
	$('#search-box input[type=text]').blur(function(e){
		closeSearch();
	});
	
	
	function closeSearch(){
		$('#header-outer #search-outer').stop(true).fadeOut(450,'easeOutExpo');
	}
	
	
	//mobile search
	$('#mobile-menu #mobile-search .container a#show-search').click(function(){
		$('#mobile-menu .container > ul').slideUp(500);
		return false;
	});
	
/***************** Nav ******************/
	
	var logoHeight = parseInt($('#header-outer').attr('data-logo-height'));
	var headerPadding = parseInt($('#header-outer').attr('data-padding'));
	var usingLogoImage = $('#header-outer').attr('data-using-logo');
	
	if( isNaN(headerPadding) || headerPadding.length == 0 ) { headerPadding = 28; }
	if( isNaN(logoHeight) || usingLogoImage.length == 0 ) { usingLogoImage = false; logoHeight = 30;}
	
	//inital calculations
	function headerInit() {
			
		$('#header-outer #logo img').css({
			'height' : logoHeight,				
		});	
		
		$('#header-outer').css({
			'padding-top' : headerPadding
		});	
		
		$('header#top nav > ul > li > a').css({
			'padding-bottom' : Math.ceil( ((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding),
			'padding-top' : Math.ceil( (logoHeight/2) - ($('header#top nav > ul > li > a').height()/2))
		});	
		
		$('#header-outer .cart-menu').css({  
			'padding-bottom' : Math.ceil(((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding),
			'padding-top' : Math.ceil(((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding)
		});	
			
		$('header#top nav > ul li#search-btn').css({
			'padding-bottom' : (logoHeight/2) - ($('header#top nav > ul li#search-btn a').height()/2),
			'padding-top' : (logoHeight/2) - ($('header#top nav > ul li#search-btn a').height()/2)
		});	
		
		
		$('header#top .sf-menu > li > ul, header#top .sf-menu > li.sfHover > ul').css({
			'top' : $('header#top nav > ul > li > a').outerHeight() 
		});	
		
		
		setTimeout(function(){ 
			$('#search-outer #search-box .ui-autocomplete').css({
				'top': parseInt($('#header-outer').outerHeight())+'px'
			}); 
		},1000);
		
		$('#search-outer #search-box .ui-autocomplete').css({
			'top': parseInt($('#header-outer').outerHeight())+'px'
		});
		
		//header space
		if($('#header-outer').attr('data-using-secondary') == '1'){
			$('#header-space').css('height', parseInt($('#header-outer').outerHeight()) + 34);
		} else {
			$('#header-space').css('height', $('#header-outer').outerHeight());
		}
		
		$('#header-outer .container, #header-outer .cart-menu').css('visibility','visible');
		
		
		$('#search-outer, #search .container').css({
			'height' : logoHeight + headerPadding*2
		});	
		
		$('#search-outer > #search input[type="text"]').css({
			'font-size'  : 43,
			'top' : ((logoHeight + headerPadding*2)/2) - $('#search-outer > #search input[type="text"]').height()/2
		});
		
		$('#search-outer > #search #close a').css({
			'top' : ((logoHeight + headerPadding*2)/2) - 8
		});	
		
		//if no image is being used
		//if(usingLogoImage == false) $('header#top #logo').addClass('no-image');
		
	}
	
	//one last check to make sure the header space is correct (only if the user hasn't scrolled yet)
	$(window).load(function(){
		if($(window).scrollTop() == 0 ) { 
			
			if($('#header-outer').attr('data-using-secondary') == '1'){
				$('#header-space').css('height', parseInt($('#header-outer').outerHeight()) + 34);
			} else {
				$('#header-space').css('height', $('#header-outer').outerHeight());
			}
			
		}
	});
	
	
	//is header resize on scroll enabled?
	var headerResize = $('#header-outer').attr('data-header-resize');
	if( headerResize == 1 ){
		
		headerInit();
		
		$(window).bind('scroll',smallNav);
	} else {
		headerInit();
		$(window).bind('scroll',opaqueCheck);
	}
	
	//if user starts in mobile but resizes to large, don't break the nav
	if($('body').hasClass('mobile')){
		$(window).resize(headerInit);
	}
		

	function smallNav(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();
		var shrinkNum = 6;
		
		if (logoHeight >= 40 && logoHeight < 60) shrinkNum = 8;
		else if (logoHeight >= 60 && logoHeight < 80) shrinkNum = 10;
		else if (logoHeight >= 80 ) shrinkNum = 14;
		
		if($offset > 0 && $windowWidth > 1000) {
			
			if($('#header-outer').attr('data-transparent-header') == 'true') $('#header-outer').removeClass('transparent');
			$('.ns-loading-cover').hide();
			
			$('#header-outer').addClass('small-nav');
			
			$('#header-outer #logo img').stop(true,true).animate({
				'height' : logoHeight - shrinkNum
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
				
			$('#header-outer').stop(true,true).animate({
				'padding-top' : headerPadding / 1.8
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('header#top nav > ul > li > a').stop(true,true).animate({
				'padding-bottom' :  (((logoHeight-shrinkNum)/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding / 1.8 ,
				'padding-top' :  ((logoHeight-shrinkNum)/2) - ($('header#top nav > ul > li > a').height()/2) 
			},{queue:false, duration:250, easing: 'easeOutCubic'});	 
			
			$('#header-outer .cart-menu').stop(true,true).animate({
				'padding-bottom' : Math.floor((((logoHeight-shrinkNum)/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding / 1.7),
				'padding-top' : Math.floor((((logoHeight-shrinkNum)/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding / 1.7)
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('header#top nav > ul li#search-btn').stop(true,true).animate({
				'padding-bottom' : Math.floor(((logoHeight-shrinkNum)/2) - ($('header#top nav > ul li#search-btn a').height()/2)),
				'padding-top' : Math.floor(((logoHeight-shrinkNum)/2) - ($('header#top nav > ul li#search-btn a').height()/2))
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('header#top .sf-menu > li > ul, header#top .sf-menu > li.sfHover > ul').stop(true,true).animate({
				'top' : Math.floor($('header#top nav > ul > li > a').height() + (((logoHeight-shrinkNum)/2) - ($('header#top nav > ul > li > a').height()/2))*2 + headerPadding / 1.8),
			},{queue:false, duration:250, easing: 'easeOutCubic'});		
			
			
			$('#search-outer #search-box .ui-autocomplete').stop(true,true).animate({
				'top': Math.floor((logoHeight-shrinkNum) + (headerPadding*2)/ 1.8) +'px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
		

			$('#search-outer, #search .container').stop(true,true).animate({
				'height' : Math.floor((logoHeight-shrinkNum) + (headerPadding*2)/ 1.8)
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('#search-outer > #search input[type="text"]').stop(true,true).animate({
				'font-size'  : 30,
				'line-height' : '30px',
				'top' : ((logoHeight-shrinkNum+headerPadding+5)/2) - ($('#search-outer > #search input[type="text"]').height()-15)/2
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			

			
			$('#search-outer > #search #close a').stop(true,true).animate({
				'top' : ((logoHeight-shrinkNum + headerPadding+5)/2) - 10
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			
			//if no image is being used
			if(usingLogoImage == false) $('header#top #logo').stop(true,true).animate({
				'margin-top' : 0
			},{queue:false, duration:450, easing: 'easeOutExpo'});	
			
			$(window).unbind('scroll',smallNav);
			$(window).bind('scroll',bigNav);
		}
	}
	
	function bigNav(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();
		if($offset == 0 && $windowWidth > 1000) {
			
			$('#header-outer').removeClass('small-nav');
			
			if($('#header-outer').attr('data-transparent-header') == 'true') $('#header-outer').addClass('transparent');
			$('.ns-loading-cover').show();
			
			$('#header-outer #logo img').stop(true,true).animate({
				'height' : logoHeight,				
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			

			$('#header-outer').stop(true,true).animate({
				'padding-top' : headerPadding 
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('header#top nav > ul > li > a').stop(true,true).animate({
				'padding-bottom' : ((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding,
				'padding-top' : (logoHeight/2) - ($('header#top nav > ul > li > a').height()/2) 
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('#header-outer .cart-menu').stop(true,true).animate({
				'padding-bottom' : Math.ceil(((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding),
				'padding-top' : Math.ceil(((logoHeight/2) - ($('header#top nav > ul > li > a').height()/2)) + headerPadding)
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('header#top nav > ul li#search-btn').stop(true,true).animate({
				'padding-bottom' : Math.floor((logoHeight/2) - ($('header#top nav > ul li#search-btn a').height()/2)),
				'padding-top' : Math.ceil((logoHeight/2) - ($('header#top nav > ul li#search-btn a').height()/2))
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			
			$('header#top .sf-menu > li > ul, header#top .sf-menu > li.sfHover > ul').stop(true,true).animate({
				'top' : $('header#top nav > ul > li > a').height() + (((logoHeight)/2) - ($('header#top nav > ul > li > a').height()/2))*2 + headerPadding,
			},{queue:false, duration:250, easing: 'easeOutCubic'});		
			
			$('#search-outer #search-box .ui-autocomplete').stop(true,true).animate({
				'top': Math.ceil(logoHeight + headerPadding*2) +'px'
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			
			$('#search-outer, #search .container').stop(true,true).animate({
				'height' : Math.ceil(logoHeight + headerPadding*2)
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			$('#search-outer > #search input[type="text"]').stop(true,true).animate({
				'font-size'  : 43,
				'line-height' : '43px',
				'top' : ((logoHeight + headerPadding*2)/2) - 30
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			
			$('#search-outer > #search #close a').stop(true,true).animate({
				'top' : ((logoHeight + headerPadding*2)/2) - 8
			},{queue:false, duration:250, easing: 'easeOutCubic'});	
			
			//if no image is being used
			if(usingLogoImage == false) $('header#top #logo').stop(true,true).animate({
				'margin-top' : 4
			},{queue:false, duration:450, easing: 'easeOutExpo'});	
		
			$(window).unbind('scroll',bigNav);
			$(window).bind('scroll',smallNav);
		}
	}
	
	
	
	
	
	function opaqueCheck(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();

		if($offset > 0 && $windowWidth > 1000) {
			
			if($('#header-outer').attr('data-transparent-header') == 'true') $('#header-outer').removeClass('transparent');
			$('.ns-loading-cover').hide();
			
			$(window).unbind('scroll',opaqueCheck);
			$(window).bind('scroll',transparentCheck);
		}
	}
	
	
	function transparentCheck(){
		var $offset = $(window).scrollTop();
		var $windowWidth = $(window).width();

		if($offset == 0 && $windowWidth > 1000) {
			
			if($('#header-outer').attr('data-transparent-header') == 'true') $('#header-outer').addClass('transparent');
			$('.ns-loading-cover').show();
			
			$(window).unbind('scroll',transparentCheck);
			$(window).bind('scroll',opaqueCheck);
		}
	}
	
	
	
	
	//responsive nav
	$('#toggle-nav').click(function(){
		
		$('#mobile-menu').stop(true,true).slideToggle(500);
		return false;
	});
	
	
	//add wpml to mobile menu
	if($('header#top nav > ul > li.menu-item-language').length > 0){
		var $langSelector = $('header#top nav > ul > li.menu-item-language').clone();
		$langSelector.insertBefore('#mobile-menu ul #mobile-search');
	}
	
	////append dropdown indicators / give classes
	$('#mobile-menu .container ul li').each(function(){
		if($(this).find('> ul').length > 0) {
			 $(this).addClass('has-ul');
			 $(this).find('> a').append('<span class="sf-sub-indicator"><i class="icon-angle-down"></i></span>');
		}
	});
	
	////events
	$('#mobile-menu .container ul li:has(">ul") > a .sf-sub-indicator').click(function(){
		$(this).parent().parent().toggleClass('open');
		$(this).parent().parent().find('> ul').stop(true,true).slideToggle();
		return false;
	});
	


/*-------------------------------------------------------------------------*/
/*	5.	Page Specific
/*-------------------------------------------------------------------------*/	

	//recent work
	function piVertCenter() {
		$('.portfolio-items  > .col').each(function(){
			var $colHeight = $(this).find('.work-item').height();
			var $infoHeight = $(this).find('.vert-center').height();
			
			//xAmount px away from being centered so we can transition to center point on hover
			$(this).find('.work-info .vert-center').css('margin-top', (($colHeight / 2) - ($infoHeight / 2 )) - 15 );
			
			//style 3
			$(this).find('.style-3 .work-info .vert-center p').stop().animate({
				'margin-top' : '-'+$(this).find('.work-info .vert-center p').height()*1.5+'px',
				'opacity' : 0
			},350,'easeOutCubic');
			
			//style 4
			$(this).find('.style-4 .work-info .bottom-meta:not(.shown)').stop().animate({
				'bottom' : '-'+$(this).find('.work-info .bottom-meta').outerHeight()-2+'px'
			},420,'easeOutCubic');

			
		});	 
	}
	
	$(window).load(function(){
	 	 piVertCenter();
	 	 portfolioCommentOrder();
	 	 fullWidthContentColumns();
	});
	
	
	//ie8 width fix
	function ie8Width(){
		if( $(window).width() >= 1300 ) {
			$('.container').css('max-width','1100px');
		} else {
			$('.container').css('max-width','880px');
		}
	}
	
	if( $(window).width() >= 1300 && $('html').hasClass('no-video')) { $('.container').css('max-width','1100px'); $(window).resize(ie8Width); };
	
	
	$(window).smartresize(function(){
		 //carousel height calcs
		 carouselHeightCalcs();
		 
		 //portfolio comment order
		 portfolioCommentOrder();
		 
		 //testimonial slider height
		 testimonialHeightResize(); //animated
		 testimonialSliderHeight(); //non-animated
		 
		 //full width content columns sizing
		 fullWidthContentColumns();
		 
		 //center portfolio text
		 piVertCenter();
		  
	});
	
	
	$(window).resize(function(){

		 portfolioDeviceCheck();

		 //fullwidth page section calcs
		 fullWidthSections(); 
		 fullwidthImgOnlySizing();
		 fullWidthContentColumns();
		 
		 //center portfolio text
		 piVertCenter();
		 
		 //iframe video emebeds
		 responsiveVideoIframes();
		 
		 if($('.nectar-video-bg').length > 0) {
		 	resizeVideoToCover();
		 }
		 
		 if($('.nectar-social.full-width').length > 0) {
		 	nectarLoveFWCenter();
		 }
		 
		 //fixed sidebar for portfolio
		 sidebarPxConversion();

		 pageHeader();
	});
	
	//portfolio item hover effect
	
	////desktop event 
	if(!$('body').hasClass('mobile') && !navigator.userAgent.match(/(iPad|IEMobile)/)) {
		
		//style 1 & 2
		$('.portfolio-items .col .work-item:not(.style-3)').hover(function(){
			$(this).find('.work-info .vert-center').stop().animate({
				'padding-top' : 15
			},400,'easeOutCubic');
			$(this).find('.work-info, .work-info .vert-center *, .work-info > i').stop().animate({
				'opacity' : 1
			},250,'easeOutCubic');
			$(this).find('.work-info-bg').stop().animate({
				'opacity' : 0.85
			},250,'easeOutCubic');
		},function(){
			$(this).find('.work-info .vert-center').stop().animate({ 
				'padding-top' : 0
			},400,'easeOutCubic');
			$(this).find('.work-info, .work-info .vert-center *, .work-info > i').stop().animate({
				'opacity' : 0
			},250,'easeOutCubic');
			$(this).find('.work-info-bg').stop().animate({
				'opacity' : 0
			},250,'easeOutCubic');
		});
		
		
		//style 3
		$('.portfolio-items .col .work-item.style-3').hover(function(){
			$(this).find('.work-info .vert-center').stop().animate({
				'top' : '-' + $(this).find('.work-info .vert-center p').height() +'px'
			},350,'easeOutCubic');
			$(this).find('.work-info .vert-center *').stop().animate({
				'opacity' : 1
			},350,'easeOutCubic');
			
			$(this).find('.work-info .vert-center p').stop().animate({
				'margin-top' : '0px',
				'opacity' : 1
			},350,'easeOutCubic');
			
			$(this).find('.work-info-bg').stop(true).animate({
				'opacity' : 0
			},350,'swing');
		},function(){
			$(this).find('.work-info .vert-center').stop().animate({
				'top' : '0'
			},350,'easeOutCubic');
			$(this).find('.work-info .vert-center *').stop().animate({
				'opacity' : 0
			},350,'easeOutCubic');
			
			$(this).find('.work-info .vert-center p').stop().animate({
				'margin-top' : '-'+$(this).find('.work-info .vert-center p').height()*1.5+'px',
				'opacity' : 0
			},350,'easeOutCubic');
			
			$(this).find('.work-info-bg').stop(true).animate({
				'opacity' : 0.45
			},350,'swing');
		});
		
		
		//style 4
		$('.portfolio-items .col .work-item.style-4').hover(function(){
			
			$(this).find('img').stop().animate({
				'top' : '-'+$(this).find('.work-info .bottom-meta').outerHeight()/2+'px'
			},250,'easeOutCubic');
			
			$(this).find('.work-info .bottom-meta').addClass('shown').stop().animate({
				'bottom' : '0px'
			},320,'easeOutCubic');

		},function(){
			
			$(this).find('img').stop().animate({
				'top' : '0px'
			},250,'easeOutCubic');
			
			$(this).find('.work-info .bottom-meta').removeClass('shown').stop().animate({
				'bottom' : '-'+$(this).find('.work-info .bottom-meta').outerHeight()-2+'px'
			},320,'easeOutCubic');
			
		});
	
	} 
	////mobile event
	else {
		portfolioDeviceCheck();
	}
	
	function portfolioDeviceCheck(){
		if($('body').hasClass('mobile') || navigator.userAgent.match(/(iPad|IEMobile)/) ){
			
			//if using more details
			if($('.portfolio-items .col .work-item').find('a:not(".pp")').length > 0){
				$('.portfolio-items .col .work-item').find('a.pp').css('display','none');
			} 
			
			//if only using pp
			else {
				$('.portfolio-items .col .work-item').find('a:not(".pp")').css('display','none');
			}
		
		} else {
			$('.portfolio-items .col .work-item').find('a').css('display','inline');
		}
	}
	
	
	//portfolio accent color
	$('.portfolio-items .col').each(function(){
		if ($(this).has('[data-project-color]')) $(this).find('.work-info-bg, .bottom-meta').css('background-color',$(this).attr('data-project-color'));
	})
	
	
	//portfolio sort
	$('#portfolio-filters').hover(function(){
		$(this).find('> ul').stop(true,true).slideDown(500,'easeOutExpo');
		$(this).find('a#sort-portfolio span').html($(this).find('a#sort-portfolio').attr('data-sortable-label'));
	},function(){
		var $activeCat = $(this).find('a.active').html();
		if( typeof $activeCat == 'undefined' || $activeCat.length == 0) $activeCat = $(this).attr('data-sortable-label');
		$(this).find('a#sort-portfolio span').html($activeCat);
		$(this).find('> ul').stop(true,true).slideUp(500,'easeOutExpo');
	});
	

	//mobile sort menu fix
	if($('body').hasClass('mobile') || navigator.userAgent.match(/(iPad|IEMobile)/)){
		$('#portfolio-filters').unbind('mouseenter mouseleave');
		$('#portfolio-filters > a, #portfolio-filters ul li a').click(function(e){
			if(e.originalEvent !== undefined) $(this).parents('#portfolio-filters').find('> ul').stop(true,true).slideToggle(600,'easeOutCubic');
		});
	}
	
	//portfolio selected category
	$('#portfolio-filters ul li a').click(function(){
		$(this).parents('#portfolio-filters').find('#sort-portfolio span').html($(this).html());
	});
	
	//inline portfolio selected category
	$('#portfolio-filters-inline ul li a').click(function(){
		$(this).parents('ul').find('li a').removeClass('active');
		$(this).addClass('active');
		$(this).parents('#portfolio-filters-inline').find('#current-category').html($(this).html());
		
	});
	
	$('#portfolio-filters-inline .container > ul > li:nth-child(2) a').click();
	
	//portfolio more details page menu highlight
	$('body.single-portfolio #header-outer nav > ul > li > a:contains("Portfolio")').parents('li').addClass('current-menu-item');
	
	//blog page highlight
	$('body.single-post #header-outer nav > ul > li > a:contains("Blog")').parents('li').addClass('current-menu-item');
	

	
	//blog love center
	function centerLove(){
		$('.post').each(function(){
			
			var $loveWidth = $(this).find('.post-meta .nectar-love').outerWidth();
			var $loveWrapWidth = $(this).find('.post-meta  .nectar-love-wrap').width();
			
			//center
			$(this).find('.post-meta .nectar-love').css('margin-left', $loveWrapWidth/2 - $loveWidth/2 + 'px' );
			$(this).find('.nectar-love-wrap').css('visibility','visible');
		});
	}
	
	$('.nectar-love').on('click',function(){
		centerLove();
	});
	
	centerLove();	
	
	
	//portfolio single comment order
	function portfolioCommentOrder(){
	
		if($('body').hasClass('mobile') && $('body').hasClass('single-portfolio') && $('#respond').length > 0){
			$('#sidebar').insertBefore('.comments-section');
		}
		 
		else if($('body').hasClass('single-portfolio') && $('#respond').length > 0) {
			$('#sidebar').insertAfter('#post-area');
		}
		
	}

	 portfolioCommentOrder();
	 
	
	//portfolio sidebar follow
	
	var sidebarFollow = $('.single-portfolio #sidebar').attr('data-follow-on-scroll');
	
	function portfolioSidebarFollow(){
	
		if( $('body.single-portfolio').length > 0 && sidebarFollow == 1 && !$('body').hasClass('mobile') && parseInt($('#sidebar').height()) + 50 <= parseInt($('#post-area').height())) {
			
			 $('#sidebar').addClass('fixed-sidebar');
			 
			 var $footer = '#footer-outer';
			 if( $('#call-to-action').length > 0 ) $footer = '#call-to-action';
			 
			 //convert width into px
			 sidebarPxConversion();
			 
			 $('#sidebar').stickyMojo({footerID: $footer, contentID: '#post-area'});
			 
		}
		
	}
	
	function sidebarPxConversion(){
		
		if( $('body.single-portfolio').length > 0 && sidebarFollow == 1 && !$('body').hasClass('mobile') ) {
			
			var $containerWidth = $('.main-content > .row').width();
			var $sidebarWidth = $containerWidth*.235;
			
			if(window.innerWidth > 1300){
				$sidebarWidth = $containerWidth*.235;
			} else if(window.innerWidth < 1300 && window.innerWidth > 1000 ) {
				$sidebarWidth = $containerWidth*.273;
			}
			
			$('#sidebar').css('width',$sidebarWidth+'px');
		}
	}
	
	$(window).load(portfolioSidebarFollow);
	
	
	//remove the portfolio filters that are not found in the current page
	var isotopeCatArr = [];
	var $portfolioCatCount = 0;
	$('#portfolio-filters ul li, #portfolio-filters-inline ul li').each(function(i){
		if($(this).find('a').length > 0) {
			isotopeCatArr[$portfolioCatCount] = $(this).find('a').attr('data-filter').substring(1);	
			$portfolioCatCount++;
		}
	});
	
	////ice the first (all)
	isotopeCatArr.shift();
	
	
	var itemCats = '';
	
	$('#portfolio > div').each(function(i){
		itemCats += $(this).attr('data-project-cat');
	});
	itemCats = itemCats.split(' ');
	
	////remove the extra item on the end of blank space
	itemCats.pop();
	
	////make sure the array has no duplicates
	itemCats = $.unique(itemCats);
	
	////if user has chosen a set of filters to display - only show those
	if($('.portfolio-items:not(".carousel")').length > 0 && $('.portfolio-items:not(".carousel")').attr('data-categories-to-show').length != 0 && $('.portfolio-items:not(".carousel")').attr('data-categories-to-show') != 'all') {
		$userSelectedCats = $('.portfolio-items:not(".carousel")').attr('data-categories-to-show').replace(/,/g , ' ');
		$userSelectedCats = $userSelectedCats.split(' ');
		
		$('.portfolio-items:not(".carousel")').removeAttr('data-categories-to-show');
	} else {
		$userSelectedCats = itemCats;
	}
	
	
	////Find which categories are actually on the current page
	var notFoundCats = [];
	$.grep(isotopeCatArr, function(el) {

    	if ($.inArray(el, itemCats) == -1) notFoundCats.push(el);
    	if ($.inArray(el, $userSelectedCats) == -1) notFoundCats.push(el);

	});
	
	//manipulate the list
	if(notFoundCats.length != 0){
		$('#portfolio-filters ul li, #portfolio-filters-inline ul li').each(function(){
			if($(this).find('a').length > 0) {
				if( $.inArray($(this).find('a').attr('data-filter').substring(1), notFoundCats) != -1 ){ $(this).hide(); }
			}
		})
	}
	
	
	
	//sharing buttons
	/*jQuery.sharedCount = function(url, fn) {
		url = encodeURIComponent(url || location.href);
		var arg = {
			url: "//" + (location.protocol == "https:" ? "sharedcount.appspot" : "api.sharedcount") + ".com/?url=" + url,
			cache: true,
			dataType: "json"
		};
		if ('withCredentials' in new XMLHttpRequest) {
			arg.success = fn;
		}
		else {
			var cb = "sc_" + url.replace(/\W/g, '');
			window[cb] = fn;
			arg.jsonpCallback = cb;
			arg.dataType += "p";
		}
		return jQuery.ajax(arg);
	};*/
	
	
	
	
	var completed = 0;
	var windowLocation = window.location.href.replace(window.location.hash, '');
	
	if( $('a.facebook-share').length > 0 || $('a.twitter-share').length > 0 || $('a.google-plus-share').length > 0 || $('a.linkedin-share').length > 0 || $('a.pinterest-share').length > 0) {
  
	 
		////facebook
		if($('a.facebook-share').length > 0) {
			
			//load share count on load  
			$.getJSON("http://graph.facebook.com/?id="+ windowLocation +'&callback=?', function(data) {
				if((data.shares != 0) && (data.shares != undefined) && (data.shares != null)) { 
					$('.facebook-share a span.count, a.facebook-share span.count').html( data.shares );	
				}
				else {
					$('.facebook-share a span.count, a.facebook-share span.count').html( 0 );	
				}
				completed++;
				socialFade();
			});
		 
			function facebookShare(){
				window.open( 'https://www.facebook.com/sharer/sharer.php?u='+windowLocation, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			
			$('.facebook-share').click(facebookShare);
			
		}
		
		
		////google plus
		function googlePlusShare(){
			window.open( 'https://plus.google.com/share?url='+windowLocation, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		
		$('.google-plus-share').click(googlePlusShare);
		
		
		
		
		////twitter
		if($('a.twitter-share').length > 0) {
			//load tweet count on load 
			$.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+windowLocation+'&callback=?', function(data) {
				if((data.count != 0) && (data.count != undefined) && (data.count != null)) { 
					$('.twitter-share a span.count, a.twitter-share span.count').html( data.count );
				}
				else {
					$('.twitter-share a span.count, a.twitter-share span.count').html( 0 );
				}
				completed++;
				socialFade();
			});
			
			function twitterShare(){
				if($(".section-title h1").length > 0) {
					var $pageTitle = encodeURIComponent($(".section-title h1").text());
				} else {
					var $pageTitle = encodeURIComponent($(document).find("title").text());
				}
				window.open( 'http://twitter.com/intent/tweet?text='+$pageTitle +' '+windowLocation, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			function wooTwitterShare(){
				window.open( 'http://twitter.com/intent/tweet?text='+$("h1.product_title").text() +' '+windowLocation, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			
			$('.nectar-social:not(".woo") .twitter-share').click(twitterShare);
			$('.nectar-social.woo .twitter-share').click(wooTwitterShare);
		}
		
		
		////linkedIn
		if($('a.linkedin-share').length > 0) {
			//load share count on load 
			$.getJSON('http://www.linkedin.com/countserv/count/share?url='+windowLocation+'&callback=?', function(data) {
				if((data.count != 0) && (data.count != undefined) && (data.count != null)) { 
					$('.linkedin-share a span.count, a.linkedin-share span.count').html( data.count );
				}
				else {
					$('.linkedin-share a span.count, a.linkedin-share span.count').html( 0 );
				}
				completed++;
				socialFade();
			});
			
			function linkedInShare(){
				if($(".section-title h1").length > 0) {
					var $pageTitle = encodeURIComponent($(".section-title h1").text());
				} else {
					var $pageTitle = encodeURIComponent($(document).find("title").text());
				}
				window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+windowLocation+'&title='+$pageTitle+'', "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			function woolinkedInShare(){
				window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+windowLocation+'&title='+$("h1.product_title").text(), "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			
			$('.nectar-social:not(".woo") .linkedin-share').click(linkedInShare);
			$('.nectar-social.woo .linkedin-share').click(woolinkedInShare);
		}
		
		
		////pinterest
		if($('a.pinterest-share').length > 0) {
			//load pin count on load 
			$.getJSON('http://api.pinterest.com/v1/urls/count.json?url='+windowLocation+'&callback=?', function(data) {
				if((data.count != 0) && (data.count != undefined) && (data.count != null)) { 
					$('.pinterest-share a span.count, a.pinterest-share span.count').html( data.count );
				}
				else {
					$('.pinterest-share a span.count, a.pinterest-share span.count').html( 0 );
				}
				completed++;
				socialFade();
			});
			
			function pinterestShare(){
				var $sharingImg = ($('.single-portfolio').length > 0 && $('div[data-featured-img]').attr('data-featured-img') != 'empty' ) ? $('div[data-featured-img]').attr('data-featured-img') : $('.main-content img').first().attr('src'); 
				
				if($(".section-title h1").length > 0) {
					var $pageTitle = encodeURIComponent($(".section-title h1").text());
				} else {
					var $pageTitle = encodeURIComponent($(document).find("title").text());
				}
				
				window.open( 'http://pinterest.com/pin/create/button/?url='+windowLocation+'&media='+$sharingImg+'&description='+$pageTitle, "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			
			function wooPinterestShare(){
				window.open( 'http://pinterest.com/pin/create/button/?url='+windowLocation+'&media='+$('img.attachment-shop_single').first().attr('src')+'&description='+$('h1.product_title').text(), "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
				return false;
			}
			
			$('.nectar-social:not(".woo") .pinterest-share').click(pinterestShare);
			$('.nectar-social.woo .pinterest-share').click(wooPinterestShare);
		}
		
		
		//fadeIn
		$('a.nectar-sharing > span.count, a.nectar-sharing-alt > span.count').hide().css('width','auto');
		function socialFade(){

			if(completed == $('a.nectar-sharing').length && $('a.nectar-sharing').parent().hasClass('in-sight')) {

				$('.nectar-social > a').stop(true,true).animate({'padding-right':'15px'},350,'easeOutSine');
				
				//love fadein
				$('.nectar-social .nectar-love span').show(350,'easeOutSine',function(){
					$(this).stop().animate({'opacity':1},800);
				});
				
				//sharing loadin
				$('.nectar-social > a').each(function(i){
					var $that = $(this);
					
					$(this).find('> span').show(350,'easeOutSine',function(){
						$that.find('> span').stop().animate({'opacity':1},800);
					});
					
				});
			}
		}
		
		//social light up
		$('.nectar-social').each(function() {

			$(this).appear(function() {
				
				$(this).addClass('in-sight');
				socialFade();
				
				$(this).find('> *').each(function(i){
					
					var $that = $(this);
					
					setTimeout(function(){ 
						
						$that.delay(i*80).queue(function(){ 
							
							var $that = $(this); $(this).addClass('hovered'); 
							
							setTimeout(function(){ 
								$that.removeClass('hovered');
							},300); 
							
						});
					
					},750);
				});
			
			},{accX: 0, accY: -115});
		
		}); 
		
		
	}
	
	//full width love center
	function nectarLoveFWCenter(){
		$('.nectar-social.full-width').each(function(){ 
			$(this).find('.n-shortcode .nectar-love').css('padding-top', $(this).find('> a').css('padding-top'));
		});
	}
	
	nectarLoveFWCenter();
	
	
	//infinite scroll
	if($('.infinite_scroll').length > 0) {
		
		//portfolio
		$('.portfolio-items.infinite_scroll').infinitescroll({
	    	navSelector  : "div#pagination",            
	   	    nextSelector : "div#pagination a:first",    
	   	    itemSelector : ".portfolio-items.infinite_scroll .element",
	   	    finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
	        msgText: " ",         
	   },function(newElements){
	   	

			var $container = $('.portfolio-items:not(.carousel)');
			//loading effect   
	        //// hide new items while they are loading
	        var $newElems = $( newElements ).css({ opacity: 0 });
	        //// ensure that images load before adding to masonry layout
	        $newElems.imagesLoaded(function(){
	          $container.isotope( 'appended', $( newElements ),function(){
	          	  
		          $( newElements ).find('.work-item').css({ opacity: 0 }).addClass('ajax-loaded');
		          ///// show elems now they're ready
		          
		          $(newElements).find('.work-meta, .nectar-love-wrap').css({'opacity':1});
		          
		          //keep filtering
		          if($('#portfolio-filters-inline').length > 0 || $('#portfolio-filters').length > 0) {
		          	
		          	  if($('#portfolio-filters-inline').length > 0) {
		          	  	 var selector = $('#portfolio-filters-inline a.active').attr('data-filter');
		          	  } else {
		          	  	 var selector = $('#portfolio-filters a.active').attr('data-filter');
		          	  }
		          	  
		          	  $('#portfolio-filters-inline a.active').attr('data-filter');
			  	 	  $container.isotope({ filter: selector });
		          }
		          
			  
		          $(newElements).each(function(i){
		          	$(this).find('.work-item').delay(i*125).animate({ 'opacity':1 },700, 'easeOutCubic');
		          });
		          
		        
		          
		          //bind hover event
		          ////desktop event 
				if(!$('body').hasClass('mobile') && !navigator.userAgent.match(/(iPad|IEMobile)/)) {
					
					//style 1 & 2
					$('.portfolio-items .col .work-item:not(.style-3)').hover(function(){
						$(this).find('.work-info .vert-center').stop().animate({
							'padding-top' : 15
						},400,'easeOutCubic');
						$(this).find('.work-info, .work-info .vert-center *, .work-info > i').stop().animate({
							'opacity' : 1
						},250,'easeOutCubic');
						$(this).find('.work-info-bg').stop().animate({
							'opacity' : 0.85
						},250,'easeOutCubic');
					},function(){
						$(this).find('.work-info .vert-center').stop().animate({ 
							'padding-top' : 0
						},400,'easeOutCubic');
						$(this).find('.work-info, .work-info .vert-center *, .work-info > i').stop().animate({
							'opacity' : 0
						},250,'easeOutCubic');
						$(this).find('.work-info-bg').stop().animate({
							'opacity' : 0
						},250,'easeOutCubic');
					});
					
					
					//style 3
					$('.portfolio-items .col .work-item.style-3').hover(function(){
						$(this).find('.work-info .vert-center').stop().animate({
							'top' : '-' + $(this).find('.work-info .vert-center p').height() +'px'
						},350,'easeOutCubic');
						$(this).find('.work-info .vert-center *').stop().animate({
							'opacity' : 1
						},350,'easeOutCubic');
						
						$(this).find('.work-info .vert-center p').stop().animate({
							'margin-top' : '0px',
							'opacity' : 1
						},350,'easeOutCubic');
						
						$(this).find('.work-info-bg').stop(true).animate({
							'opacity' : 0
						},350,'swing');
					},function(){
						$(this).find('.work-info .vert-center').stop().animate({
							'top' : '0'
						},350,'easeOutCubic');
						$(this).find('.work-info .vert-center *').stop().animate({
							'opacity' : 0
						},350,'easeOutCubic');
						
						$(this).find('.work-info .vert-center p').stop().animate({
							'margin-top' : '-'+$(this).find('.work-info .vert-center p').height()*1.5+'px',
							'opacity' : 0
						},350,'easeOutCubic');
						
						$(this).find('.work-info-bg').stop(true).animate({
							'opacity' : 0.45
						},350,'swing');
					});
					
					
					//style 4
					$('.portfolio-items .col .work-item.style-4').hover(function(){
						
						$(this).find('img').stop().animate({
							'top' : '-'+$(this).find('.work-info .bottom-meta').outerHeight()/2+'px'
						},250,'easeOutCubic');
						
						$(this).find('.work-info .bottom-meta').addClass('shown').stop().animate({
							'bottom' : '0px'
						},320,'easeOutCubic');
			
					},function(){
						
						$(this).find('img').stop().animate({
							'top' : '0px'
						},250,'easeOutCubic');
						
						$(this).find('.work-info .bottom-meta').removeClass('shown').stop().animate({
							'bottom' : '-'+$(this).find('.work-info .bottom-meta').outerHeight()-2+'px'
						},320,'easeOutCubic');
						
					});
				
				} 
				
				//portfolio accent color
				$('.portfolio-items .col').each(function(){
					if ($(this).has('[data-project-color]')) $(this).find('.work-info-bg, .bottom-meta').css('background-color',$(this).attr('data-project-color'));
				})
		         
		        //verify smooth scorlling
				if( $smoothCache == true && $(window).width() > 690 && $('body').outerHeight(true) > $(window).height() && Modernizr.csstransforms3d && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){ niceScrollInit(); $(window).trigger('resize') } 
				
				
				//Panr 
				if(!$('body').hasClass('mobile') && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
					
					$(".portfolio-items:not(.carousel) .work-item.style-3 img").panr({
						scaleDuration: .28,
					}); 
					
				}
				
				//prettyphoto
				$('.portfolio-items').each(function(){
					var $unique_id = Math.floor(Math.random()*10000);
					$(this).find('a[rel^="prettyPhoto"], a.pretty_photo').attr('rel','prettyPhoto['+$unique_id+'_gal]').removeClass('pretty_photo');
				});
		
				prettyPhotoInit();
				
				
				//center meta data
				piVertCenter(); 
				
				masonryZindex(); 
		          
	          
	          }); 
	          
	        });
			
			
			
			
	   });
		
		
		
		//blog
		$('#post-area.infinite_scroll .posts-container').infinitescroll({
	    	navSelector  : "div#pagination",            
	   	    nextSelector : "div#pagination a:first",    
	   	    itemSelector : "#post-area .posts-container .post",
	   	    finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
	        msgText: " " 
	   },function(newElements){
	   	
	   	//reinit js
	   	centerLove();
	   	
	   	
	   	//gallery
		$(newElements).find('.flex-gallery').each(function(){
			
			var $that = $(this);
			
			 $that.flexslider({
		        animation: 'fade',
		        smoothHeight: false, 
		        animationSpeed: 500,
		        useCSS: false, 
		        touch: true
		    });
			
			////gallery slider add arrows
			$('.flex-gallery .flex-direction-nav li a.flex-next').html('<i class="icon-angle-right"></i>');
			$('.flex-gallery .flex-direction-nav li a.flex-prev').html('<i class="icon-angle-left"></i>');

		});
	   	
	   	
	   	//media players
	   	if($().mediaelementplayer) $(newElements).find('.wp-audio-shortcode, .wp-video-shortcode').mediaelementplayer();
	   	
	   	
	   	//lightbox
	   	prettyPhotoInit();
	   	
	   	//carousels
	   	standardCarouselInit();
    	clientsCarouselInit();
	   	
	   	//iframes
	   	showLateIframes();

	   	//milestone
	   	$(newElements).find('.nectar-milestone').each(function() {
			//symbol
			if($(this).has('[data-symbol]')) {
				if($(this).attr('data-symbol-pos') == 'before') {
					$(this).find('.number').prepend($(this).attr('data-symbol'));
				} else {
					$(this).find('.number').append($(this).attr('data-symbol'));
				}
			}
		});
		
		if(!$('body').hasClass('mobile')) {
			
			$(newElements).find('.nectar-milestone').each(function() {
				//animation
				$(this).appear(function() {
					var $endNum = parseInt($(this).find('.number span').text());
					$(this).find('.number span').countTo({
						from: 0,
						to: $endNum,
						speed: 1500,
						refreshInterval: 30
					});
				},{accX: 0, accY: 0});
			}); 
		}
		
		//pie chart		
	    if($().vcChat) $(newElements).find('.vc_pie_chart').vcChat();
    	
    	//fancy ul
    	nectar_fancy_ul_init();
    	
    	//testimonial slider
    	$('.testimonial_slider').animate({'opacity':'1'},800);
    	createTestimonialControls();
		testimonialSliderHeight(); 
		testimonialHeightResize();
    	
		//bar graph
		$(newElements).find('.nectar-progress-bar').each(function(i){
			
			$(this).appear(function(){
				
				var percent = $(this).find('span').attr('data-width');
				var $endNum = parseInt($(this).find('span strong i').text());
				var $that = $(this);
				
				$(this).find('span').animate({
					'width' : percent + '%'
				},1600, 'easeOutCirc',function(){
				});
				
				$(this).find('span strong').animate({
					'opacity' : 1
				},1350);
				
				
				$(this).find('span strong i').countTo({
					from: 0,
					to: $endNum,
					speed: 1100,
					refreshInterval: 30,
					onComplete: function(){
			
					}
				});	
				
				////100% progress bar 
					if(percent == '100'){
						$that.find('span strong').addClass('full');
					}
		
			});
			
	
		});
		
		
		//columns & images with animation
		colAndImgAnimations();

		responsiveVideoIframesInit();
		responsiveVideoIframes();

		
		$(window).trigger('resize');
	   	
	   	
	   	// trigger Masonry as a callback
	   	var $container = $('.posts-container');
	    if($container.parent().hasClass('masonry')) { 
	    	 
	    	$container.find('article').addClass('masonry-blog-item');
			$container.find('article').prepend('<span class="bottom-line"></span>');
			
			//move the meta to the bottom
			$container.find('article').each(function(){
				
				var $metaClone = $(this).find('.post-meta').clone();
	
				$(this).find('.post-meta').remove();
	
				$(this).find('.content-inner').after($metaClone);
				
			});
		
	    	 
	    	//loading effect   
	    	
	        //// hide new items while they are loading
	        var $newElems = $( newElements ).css({ opacity: 0 });
	        //// ensure that images load before adding to masonry layout
	        $newElems.imagesLoaded(function(){
	          $container.isotope( 'appended', $( newElements ),function(){
	          	
		          $( newElements ).css({ opacity: 0 }).addClass('ajax-loaded');
		          ///// show elems now they're ready
		          
		          $(newElements).each(function(i){
		          	$(this).delay(i*125).transition({ 'opacity':1 },700, 'easeOutCubic');
		          });
	          
	          }); 
	          
	        });
	        
	     }//if masonry
	   	
	   });
	   
   }
	
	
/*-------------------------------------------------------------------------*/
/*	6.	Scroll to top
/*-------------------------------------------------------------------------*/	

var $scrollTop = $(window).scrollTop();

//starting bind
if( $('#to-top').length > 0 && $(window).width() > 1020) {
	
	if($scrollTop > 350){
		$(window).bind('scroll',hideToTop);
	}
	else {
		$(window).bind('scroll',showToTop);
	}
}


function showToTop(){
	
	if( $scrollTop > 350 ){

		$('#to-top').stop(true,true).animate({
			'bottom' : '17px'
		},350,'easeInOutCubic');	
		
		$(window).unbind('scroll',showToTop);
		$(window).bind('scroll',hideToTop);
	}

}

function hideToTop(){
	
	if( $scrollTop < 350 ){

		$('#to-top').stop(true,true).animate({
			'bottom' : '-30px'
		},350,'easeInOutCubic');	
		
		$(window).unbind('scroll',hideToTop);
		$(window).bind('scroll',showToTop);	
		
	}
}

//to top color
if( $('#to-top').length > 0 ) {
	
	var $windowHeight, $pageHeight, $footerHeight, $ctaHeight;
	
	function calcToTopColor(){
		$scrollTop = $(window).scrollTop();
		$windowHeight = $(window).height();
		$pageHeight = $('body').height();
		$footerHeight = $('#footer-outer').height();
		$ctaHeight = ($('#call-to-action').length > 0) ? $('#call-to-action').height() : 0;
		
		if( ($scrollTop-35 + $windowHeight) >= ($pageHeight - $footerHeight) && $('#boxed').length == 0){
			$('#to-top').addClass('dark');
		}
		
		else {
			$('#to-top').removeClass('dark');
		}
	}
	
	//calc on scroll
	$(window).scroll(calcToTopColor);
	
	//calc on resize
	$(window).resize(calcToTopColor);

}

//scroll up event
$('#to-top').click(function(){
	$('body,html').stop().animate({
		scrollTop:0
	},800,'easeOutQuad')
	return false;
});














	

	// Isotope
	var $portfolio_container = $('.portfolio-items:not(.carousel)');

	//// filter items when filter link is clicked
	var clearIsoAnimation = null;
	//// cache window
	var $window = jQuery(window);	
	
	if($portfolio_container.length > 0) {
		
		////filter event
		$('#portfolio-filters ul li a, #portfolio-filters-inline ul li a').click(function(){
			 
			 if(window.innerWidth > 690 && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
			 	
				 //add css animation only for sorting	 
				  clearTimeout(clearIsoAnimation);
				  $('.isotope, .isotope .isotope-item').css('transition-duration','0.7s');
				  clearIsoAnimation = setTimeout(function(){  $('.isotope, .isotope .isotope-item').css('transition-duration','0s'); },700);
				  
				  setTimeout(masonryZindex,700);
				  
			 }
			  
			  var selector = $(this).attr('data-filter');
			  $portfolio_container.isotope({ filter: selector });
			  
			  //active classes
			  $('#portfolio-filters ul li a').removeClass('active');
			  $(this).addClass('active');
			  
			  return false;
		});
	
	
		//// start up isotope with default settings
		$portfolio_container.imagesLoaded(function(){
			
			//verify smooth scorlling
			if( $smoothCache == true && $(window).width() > 690 && $('body').outerHeight(true) > $(window).height() && Modernizr.csstransforms3d && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){ niceScrollInit(); $(window).trigger('resize') } 
			
			//transformns enabled logic
			var $isoUseTransforms = false;
			
			//Panr 
			if(!$('body').hasClass('mobile') && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
				
				$(".portfolio-items:not(.carousel) .work-item.style-3 img").panr({
					scaleDuration: .28,
				}); 
				
				$isoUseTransforms = true;
				
			}
			
			//center meta data
			piVertCenter();

			//initial call to setup isotope
			var $layoutMode = ($('.portfolio-items.masonry-items').length > 0) ? 'masonry' : 'fitRows' ;
			var $startingFilter = ($('.portfolio-items:not(".carousel")').attr('data-starting-filter') != '' && $('.portfolio-items:not(".carousel")').attr('data-starting-filter') != 'default') ? '.' + $('.portfolio-items:not(".carousel")').attr('data-starting-filter') : '*';

			$portfolio_container.isotope({
			  resizable: false, 
			  itemSelector : '.element',
			  filter: $startingFilter,
			  transformsEnabled: $isoUseTransforms,
			  layoutMode: $layoutMode
			}).isotope( 'reLayout' );
			
			
			if($startingFilter != '*'){
				$('#portfolio-filters ul a[data-filter="'+$startingFilter+'"], #portfolio-filters-inline ul a[data-filter="'+$startingFilter+'"]').click();
			}

			//call the reLayout to get things rollin'
			reLayout();
			masonryZindex();
			$window.resize( reLayout );
			$window.smartresize( masonryZindex );
		
			//fadeout the loading animation
			$('.portfolio-loading').stop(true,true).fadeOut(200);
			
			//fadeIn items one by one
			$('.portfolio-items .col').each(function(i){
				$(this).find('.work-item, .work-meta, .nectar-love-wrap').delay(i*90).animate({'opacity':1},450);
			});
	
		});
		
		
		
	}//if portfolio items found
		
	function reLayout() {
  
		var mediaQuerySize; // = getComputedStyle(document.body, ':after').getPropertyValue('content'); 
		var windowSize = $window.width();
		var masonryObj;

		//remove double quotes for FF
		//if (navigator.userAgent.match('MSIE 8') == null) {
		//	mediaQuerySize = mediaQuerySize.replace(/"/g, '');
		//}
		
		//user defined cols
		var userDefinedColWidth;
		
		if($('#portfolio').attr('data-user-defined-cols') == 'span4') {
			userDefinedColWidth = 3
		} 
		
		else if($('#portfolio').attr('data-user-defined-cols') == 'span3') {
			userDefinedColWidth = 4
		} 
		
		var isFullWidth = $('.portfolio-items:not(".carousel")').attr('data-col-num') == 'elastic';
		
		
		//chrome 33 approved method for getting column sizing
		if(window.innerWidth > 1600){
			
			if($('.portfolio-items.no-masonry:not(".carousel")').hasClass('constrain-max-cols')) {
				mediaQuerySize = 'four';
			} else {
				mediaQuerySize = 'five';
			}
			
		} else if(window.innerWidth <= 1600 && window.innerWidth > 1300){
			mediaQuerySize = 'four';
		} else if(window.innerWidth <= 1300 && window.innerWidth > 990){
			
			if($('.portfolio-items.no-masonry:not(".carousel")').hasClass('constrain-max-cols')) {
				mediaQuerySize = 'four';
			} else {
				mediaQuerySize = 'three';
			}
			
		} else if(window.innerWidth <= 990 && window.innerWidth > 470){
			mediaQuerySize = 'two';
		} else if(window.innerWidth <= 470){
			mediaQuerySize = 'one';
		}
		
		//boxed
		if($('#boxed').length > 0) {
			if(window.innerWidth > 1300){
				mediaQuerySize = 'four';
			} else if(window.innerWidth < 1300 && window.innerWidth > 990){
				mediaQuerySize = 'three';
			} else if(window.innerWidth < 990){
				mediaQuerySize = 'one';
			}
			
		}
		
		//change masonry columns depending on screen size
		switch (mediaQuerySize) {
			case 'five':
				(isFullWidth) ? colWidth = 5 : colWidth = userDefinedColWidth;
				masonryObj = { columnWidth: $portfolio_container.width() / parseInt(colWidth) };
			break;
			
			case 'four':
				(isFullWidth) ? colWidth = 4 : colWidth = userDefinedColWidth;

				masonryObj = { columnWidth: $portfolio_container.width() / parseInt(colWidth) };
			break;
			
			case 'three':
				(isFullWidth) ? colWidth = 3 : colWidth = userDefinedColWidth;
				
				masonryObj = { columnWidth: $portfolio_container.width() / parseInt(colWidth) };
			break;
			
			case 'two':
				masonryObj = { columnWidth: $portfolio_container.width() / 2 };
			break;
			
			case 'one':
				masonryObj = { columnWidth: $portfolio_container.width() / 1 };
			break;
		}
		
		//sizing for large items
		var tallColHeight = $('.portfolio-items:not(".carousel") .col.elastic-portfolio-item[class*="regular"]:first img').height();
		var multipler = (window.innerWidth > 470) ? 2 : 1 ;
		$('.portfolio-items:not(".carousel") .col.elastic-portfolio-item[class*="tall"] img').css('height',(tallColHeight*multipler));

		$portfolio_container.isotope({
		   masonry: masonryObj
		}).isotope( 'reLayout' );
	
	}


	//z-index for masonry
	function masonryZindex(){
		
		//escape if no browser support
		if($('body .portfolio-items:not(".carousel") .elastic-portfolio-item').css('transform')) {
		
			var $coords = {};
			var $zindexRelation = {};
			
			$('body .portfolio-items:not(".carousel") .elastic-portfolio-item').each(function(){
				$matrix = matrixToArray($(this).css('transform'));
				$coords[$(this).index()] = $matrix[4];
			});
			
			var $corrdsArr = $.map($coords, function (value) { return value; });
			$corrdsArr = removeDuplicates($corrdsArr);
			$corrdsArr.sort(function(a,b){return a-b});
	
			for(var i = 0; i < $corrdsArr.length; i++){
				$zindexRelation[$corrdsArr[i]] = i*10; 
			}
	
			$.each($coords,function(k,v){
				
				var $zindex;
				var $coordCache = v;
				$.each($zindexRelation,function(k,v){
					if($coordCache == k) {
						$zindex = v;
					}
				});
	
				$('body .portfolio-items:not(".carousel") .elastic-portfolio-item:eq('+k+')').css('z-index',$zindex);
			});
			
		}
		
	}
	
	function matrixToArray(matrix) {
	    return matrix.substr(7, matrix.length - 8).split(', ');
	}
	
	function removeDuplicates(inputArray) {
        var i;
        var len = inputArray.length;
        var outputArray = [];
        var temp = {};

        for (i = 0; i < len; i++) {
            temp[inputArray[i]] = 0;
        }
        for (i in temp) {
            outputArray.push(i);
        }
        return outputArray;
    }











/*-------------------------------------------------------------------------*/
/*	7.	Cross Browser Fixes
/*-------------------------------------------------------------------------*/	
	 
	//Fix current class in menu 
	if ($("body").hasClass("single-portfolio") || $('body').hasClass("error404") || $('body').hasClass("search-results")) {   
		$("li").removeClass("current_page_parent").removeClass("current-menu-ancestor").removeClass('current_page_ancestor');   
	}
	
	//fix for IE8 nth-child
	$('.recent_projects_widget div a:nth-child(3n+3), #sidebar #flickr div:nth-child(3n+3) a, #footer-outer #flickr div:nth-child(3n+3) a').css('margin-right','0px');
	
	//remove br's from code tag
	$('code').find('br').remove();	
	
	//if a clear is the last div, remove the padding
	if($('.container.main-content > .row > div:last-child').hasClass('clear')) {
		$('.container.main-content > .row > div:last-child').css('padding-bottom','0');
	}
	
	//homepage recent blog for IE8
	$('.container-wrap .blog-recent > div:last-child').addClass('col_last');
	
	//contact form
	$('.wpcf7-form p:has(input[type=submit])').css('padding-bottom','0px');
	
	//no caption home slider fix
	$('#featured article').each(function(){
		if($(this).find('h2').attr('data-has-caption') == '0') {
			$(this).parents('.slide').addClass('no-caption');
		}
	});
	
	//chat post format nth child color
	$('article.post.format-chat .content-inner dt:odd').css('color','#333');
	
	//remove margin on last cols inside of full width sections 
	$('.full-width-section').each(function(){
		$(this).find('> .span_12 > div.col_last').last().css('margin-bottom','0');
	});
	
	//remove p tags from extra content editor when warpping only an img 
	$('#portfolio-extra p').each(function(){
		if($(this).find('*').length == 1 && $(this).find('img').length == 1) {
			$(this).find('img').unwrap();
		}
	});

	//vc text_separator color
	$('.vc_text_separator').each(function(){
		if( $(this).parents('.full-width-section').length > 0 ) $(this).find('div').css('background-color',$(this).parents('.full-width-section').css('background-color'));
	});
	
	//carousel head button alignment  
	$('.carousel-heading').each(function(){
		if($(this).find('h2').length > 0) $(this).find('.carousel-prev, .carousel-next').css('top','7px');
	});
	
	//remove carousel heading if not being used
	$('.carousel-wrap').each(function(){
		if($(this).find('.carousel-heading .container:empty').length > 0) $(this).find('.carousel-heading').remove();
	});
	
	//woocommerce product thuimbnails
	$('.woocommerce div.product div.images div.thumbnails a:nth-child(4n+4)').css('margin-right','0px');
	
	//remove extra galleries when using the nectar gallery slider on projects and posts
	$('article.post .gallery-slider .gallery,  article.post .gallery-slider .jetpack-slideshow, .single-portfolio .gallery-slider .gallery, .single-portfolio .gallery-slider .jetpack-slideshow').remove();
	
	
	$('.woocommerce .span_9 .products.related .products li:nth-child(4), .woocommerce .span_9 .products.upsells .products li:nth-child(4)').remove();
	$('.woocommerce .span_9 .products.related .products li:nth-child(3), .woocommerce .span_9 .products.upsells .products li:nth-child(3)').css('margin-right','0');	
	
	//clients no hover if no link
	$('div.clients').each(function(){
		$(this).find('> div').each(function(){
			if($(this).find('a').length == 0) {
				$(this).addClass('no-link');
			}
		});
	});
	
	//shop header parallax margin 
	if($('body.woocommerce').find('#page-header-bg').length > 0){
		$('.container-wrap').css({'margin-top':'0px','padding-top':'30px'});
	}

	//remove arrows on mega menu item
	$('header#top nav .megamenu .sub-menu a.sf-with-ul .sf-sub-indicator').remove();
	
	//if using wooCommerce sitewide notice
	if($('.demo_store').length > 0) $('#header-outer, #header-space').css('margin-top','32px');
	
	//footer last column class for IE8
	$('#footer-widgets .container .row > div:last-child').addClass('col_last');
	
	//nectar slider external links
	$('.swiper-slide.external-button-1 .buttons > div:nth-child(1) a').attr('target','_blank');
	$('.swiper-slide.external-button-2 .buttons > div:nth-child(2) a').attr('target','_blank');
	
	//portfolio external links
	$(".portfolio-items a[href*='http://']:not([href*='"+window.location.hostname+"']), .recent_projects_widget a[href*='http://']:not([href*='"+window.location.hostname+"'])").attr("target","_blank"); 
	
	//remove excess inner content when empty row
	$('.container-wrap .row > .wpb_row').each(function(){
		if($(this).find('> .span_12 > .wpb_column > .wpb_wrapper').length > 0 && $(this).find('> .span_12 > .wpb_column > .wpb_wrapper').find('*').length == 0) $(this).find('> .span_12 ').remove();
	});
	
	//remove boxed style from full width content
	$('.full-width-content .col.boxed').removeClass('boxed');
	
	//remove full width attribute on slider in full width content section
	$('.full-width-content .wpb_column .nectar-slider-wrap[data-full-width="true"]').attr('data-full-width','false');	

	
	
	
	$('a#toggle-section').click(function(){
			
		//open
		if(!$('#style-selection').hasClass('open')){
			$('#style-selection').addClass('open');
			$('#style-selection').stop().animate({
				'right' : '13px'
			},600,'easeOutCubic');
		}
		
		//close  
		else {
			$('#style-selection').removeClass('open');
			$('#style-selection').stop().animate({
				'right' : '-177px'
			},500,'easeInCubic');
		}

		return false;
	});
	
	//layout style select
	$('.section-options select[name=layout-style]').change(function(){
		if($(this).val() == 'boxed' && $('#boxed').length == 0) {
			$('body').wrapInner('<div id="boxed" />');
			controlsInit();
			controlsAndInfoPos();
			sliderAfterSetup();
			fullWidthSections(); 
			reLayout();
			masonryZindex();
			$('.carousel').trigger('updateSizes');
			$('body').css('padding-right','0');
			$(window).trigger('resize')
			
			$('.slider-nav .right, .slider-nav .left').css('opacity','1');
		} else if($('#boxed').length == 1) {
			$('#header-outer').unwrap();
			controlsInit();
			controlsAndInfoPos();
			fullWidthSections();
			reLayout();
			masonryZindex();
			$('.slider-nav .right').css('right','13px');
			$('.slider-nav .left').css('left','0px');
			$('.carousel').trigger('updateSizes');
			$('body').css('padding-right','16px');
			$(window).trigger('resize')
		}
	});
	
	$('.section-options .patterns li').click(function(){
		$('.section-options li').removeClass('active-bg');
		$(this).addClass('active-bg');
		$('body').css({
			'background-image':'url('+$(this).attr('data-full')+')',
			'background-repeat': 'repeat',
			'background-attachment': 'scroll',
			'background-size': 'auto'
		});
		return false;
	});
	
	$('.section-options .bg-images li').click(function(){
		$('.section-options li').removeClass('active-bg');
		$(this).addClass('active-bg');
		$('body').css({
			'background-image':'url('+$(this).attr('data-full')+')',
			'background-repeat': 'no-repeat',
			'background-attachment': 'fixed',
			'background-size': 'cover'
		});
		return false;
	});
	
	
	
	
	
});



function resizeIframe() {
	var element = document.getElementById("pp_full_res").getElementsByTagName("iframe");
	var height = element[0].contentWindow.document.body.scrollHeight;
    
    //iframe height
    element[0].style.height = height + 'px';
	
	//pp height
	document.getElementsByClassName("pp_content_container")[0].style.height = height+40+ 'px';
	document.getElementsByClassName("pp_content")[0].style.height = height+40+ 'px';
	
}


//don't load if mobile
if(!navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
		
	/*!
	 * VERSION: 1.11.5
	 * DATE: 2014-02-20
	 * UPDATES AND DOCS AT: http://www.greensock.com
	 * 
	 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
	 *
	 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
	 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
	 * Club GreenSock members, the software agreement that was issued with your membership.
	 * 
	 * @author: Jack Doyle, jack@greensock.com
	 **/
	(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=[].slice,r=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=r.prototype.render},n=1e-10,a=i._internals.isSelector,o=i._internals.isArray,h=r.prototype=i.to({},.1,{}),l=[];r.version="1.11.5",h.constructor=r,h.kill()._gc=!1,r.killTweensOf=r.killDelayedCallsTo=i.killTweensOf,r.getTweensOf=i.getTweensOf,r.ticker=i.ticker,h.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},h.updateTo=function(t,e){var s,r=this.ratio;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted)if(e)this._initted=!1;else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var n=this._time;this.render(0,!0,!1),this._initted=!1,this.render(n,!0,!1)}else if(this._time>0){this._initted=!1,this._init();for(var a,o=1/(1-r),h=this._firstPT;h;)a=h.s+h.c,h.c*=o,h.s=a-h.c,h=h._next}return this},h.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var s,r,a,o,h,_,u,p,c=this._dirty?this.totalDuration():this._totalDuration,f=this._time,m=this._totalTime,d=this._cycle,g=this._duration;if(t>=c?(this._totalTime=c,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=g,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete"),0===g&&(p=this._rawPrevTime,(0===t||0>p||p===n)&&p!==t&&(i=!0,p>n&&(r="onReverseComplete")),this._rawPrevTime=p=!e||t||0===p?t:n)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==m||0===g&&this._rawPrevTime>n)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===g&&(this._rawPrevTime>=0&&(i=!0),this._rawPrevTime=p=!e||t||0===this._rawPrevTime?t:n)):this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(o=g+this._repeatDelay,this._cycle=this._totalTime/o>>0,0!==this._cycle&&this._cycle===this._totalTime/o&&this._cycle--,this._time=this._totalTime-this._cycle*o,this._yoyo&&0!==(1&this._cycle)&&(this._time=g-this._time),this._time>g?this._time=g:0>this._time&&(this._time=0)),this._easeType?(h=this._time/g,_=this._easeType,u=this._easePower,(1===_||3===_&&h>=.5)&&(h=1-h),3===_&&(h*=2),1===u?h*=h:2===u?h*=h*h:3===u?h*=h*h*h:4===u&&(h*=h*h*h*h),this.ratio=1===_?1-h:2===_?h:.5>this._time/g?h/2:1-h/2):this.ratio=this._ease.getRatio(this._time/g)),f===this._time&&!i&&d===this._cycle)return m!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||l)),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;this._time&&!s?this.ratio=this._ease.getRatio(this._time/g):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._active||!this._paused&&this._time!==f&&t>=0&&(this._active=!0),0===m&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===g)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||l))),a=this._firstPT;a;)a.f?a.t[a.p](a.c*this.ratio+a.s):a.t[a.p]=a.c*this.ratio+a.s,a=a._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==m||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||l)),this._cycle!==d&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||l)),r&&(this._gc||(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||l),0===g&&this._rawPrevTime===n&&p!==n&&(this._rawPrevTime=0)))},r.to=function(t,e,i){return new r(t,e,i)},r.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new r(t,e,i)},r.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new r(t,e,s)},r.staggerTo=r.allTo=function(t,e,n,h,_,u,p){h=h||0;var c,f,m,d,g=n.delay||0,v=[],y=function(){n.onComplete&&n.onComplete.apply(n.onCompleteScope||this,arguments),_.apply(p||this,u||l)};for(o(t)||("string"==typeof t&&(t=i.selector(t)||t),a(t)&&(t=s.call(t,0))),c=t.length,m=0;c>m;m++){f={};for(d in n)f[d]=n[d];f.delay=g,m===c-1&&_&&(f.onComplete=y),v[m]=new r(t[m],e,f),g+=h}return v},r.staggerFrom=r.allFrom=function(t,e,i,s,n,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,r.staggerTo(t,e,i,s,n,a,o)},r.staggerFromTo=r.allFromTo=function(t,e,i,s,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,r.staggerTo(t,e,s,n,a,o,h)},r.delayedCall=function(t,e,i,s,n){return new r(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:n,overwrite:0})},r.set=function(t,e){return new r(t,0,e)},r.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var _=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(_(n,e)),r=s.length),n=n._next;return s},u=r.getAllTweens=function(e){return _(t._rootTimeline,e).concat(_(t._rootFramesTimeline,e))};r.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,h=u(0!=r),l=h.length,_=i&&s&&r;for(o=0;l>o;o++)a=h[o],(_||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a.totalDuration()):a._enabled(!1,!1))},r.killChildTweensOf=function(t,e){if(null!=t){var n,h,l,_,u,p=i._tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),a(t)&&(t=s.call(t,0)),o(t))for(_=t.length;--_>-1;)r.killChildTweensOf(t[_],e);else{n=[];for(l in p)for(h=p[l].target.parentNode;h;)h===t&&(n=n.concat(p[l].tweens)),h=h.parentNode;for(u=n.length,_=0;u>_;_++)e&&n[_].totalTime(n[_].totalDuration()),n[_]._enabled(!1,!1)}}};var p=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=u(r),h=i&&s&&r,l=o.length;--l>-1;)a=o[l],(h||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return r.pauseAll=function(t,e,i){p(!0,t,e,i)},r.resumeAll=function(t,e,i){p(!1,t,e,i)},r.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||n,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},h.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},h.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},h.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},h.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},h.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},h.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},h.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},h.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r},!0),window._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],a(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));a(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals.isSelector,a=i._internals.isArray,o=[],h=function(t){var e,i={};for(e in t)i[e]=t[e];return i},l=function(t,e,i,s){t._timeline.pause(t._startTime),e&&e.apply(s||t._timeline,i||o)},_=o.slice,u=s.prototype=new e;return s.version="1.11.5",u.constructor=s,u.kill()._gc=!1,u.to=function(t,e,s,r){return e?this.add(new i(t,e,s),r):this.set(t,s,r)},u.from=function(t,e,s,r){return this.add(i.from(t,e,s),r)},u.fromTo=function(t,e,s,r,n){return e?this.add(i.fromTo(t,e,s,r),n):this.set(t,r,n)},u.staggerTo=function(t,e,r,a,o,l,u,p){var c,f=new s({onComplete:l,onCompleteParams:u,onCompleteScope:p,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),n(t)&&(t=_.call(t,0)),a=a||0,c=0;t.length>c;c++)r.startAt&&(r.startAt=h(r.startAt)),f.to(t[c],e,h(r),c*a);return this.add(f,o)},u.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},u.staggerFromTo=function(t,e,i,s,r,n,a,o,h){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,h)},u.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},u.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},u.add=function(r,n,o,h){var l,_,u,p,c,f;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&a(r)){for(o=o||"normal",h=h||0,l=n,_=r.length,u=0;_>u;u++)a(p=r[u])&&(p=new s({tweens:p})),this.add(p,l),"string"!=typeof p&&"function"!=typeof p&&("sequence"===o?l=p._startTime+p.totalDuration()/p._timeScale:"start"===o&&(p._startTime-=p.delay())),l+=h;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(c=this,f=c.rawTime()>r._startTime;c._timeline;)f&&c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._gc&&c._enabled(!0,!1),c=c._timeline;return this},u.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&a(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},u._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},u.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},u.insert=u.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},u.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},u.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},u.addPause=function(t,e,i,s){return this.call(l,["{self}",e,i,s],this,t)},u.removeLabel=function(t){return delete this._labels[t],this},u.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},u._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&a(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},u.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},u.stop=function(){return this.paused(!0)},u.gotoAndPlay=function(t,e){return this.play(t,e)},u.gotoAndStop=function(t,e){return this.pause(t,e)},u.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,h,l,_=this._dirty?this.totalDuration():this._totalDuration,u=this._time,p=this._startTime,c=this._timeScale,f=this._paused;if(t>=_?(this._totalTime=this._time=_,this._reversed||this._hasPausedChild()||(n=!0,h="onComplete",0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(l=!0,this._rawPrevTime>r&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||0===this._rawPrevTime?t:r,t=_+1e-4):1e-7>t?(this._totalTime=this._time=0,(0!==u||0===this._duration&&(this._rawPrevTime>r||0>t&&this._rawPrevTime>=0))&&(h="onReverseComplete",n=this._reversed),0>t?(this._active=!1,0===this._duration&&this._rawPrevTime>=0&&this._first&&(l=!0),this._rawPrevTime=t):(this._rawPrevTime=this._duration||!e||t||0===this._rawPrevTime?t:r,t=0,this._initted||(l=!0))):this._totalTime=this._time=this._rawPrevTime=t,this._time!==u&&this._first||i||l){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==u&&t>0&&(this._active=!0),0===u&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||o)),this._time>=u)for(s=this._first;s&&(a=s._next,!this._paused||f);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||f);)(s._active||u>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||o)),h&&(this._gc||(p===this._startTime||c!==this._timeScale)&&(0===this._time||_>=this.totalDuration())&&(n&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[h]&&this.vars[h].apply(this.vars[h+"Scope"]||this,this.vars[h+"Params"]||o)))}},u._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},u.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},u.getTweensOf=function(t,e){for(var s=i.getTweensOf(t),r=s.length,n=[],a=0;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(n[a++]=s[r]);return n},u._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},u.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},u._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},u.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},u.invalidate=function(){for(var t=this._first;t;)t.invalidate(),t=t._next;return this},u._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},u.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},u.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},u.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},u.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),window._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,n=[],a=new i(null,null,1,0),o=s.prototype=new t;return o.constructor=s,o.kill()._gc=!1,s.version="1.11.5",o.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},o.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},o.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},o.tweenTo=function(t,i){i=i||{};var s,r,o,h={ease:a,overwrite:2,useFrames:this.usesFrames(),immediateRender:!1};for(r in i)h[r]=i[r];return h.time=this._parseTimeOrLabel(t),s=Math.abs(Number(h.time)-this._time)/this._timeScale||.001,o=new e(this,s,h),h.onStart=function(){o.target.paused(!0),o.vars.time!==o.target.time()&&s===o.duration()&&o.duration(Math.abs(o.vars.time-o.target.time())/o.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||o,i.onStartParams||n)},o},o.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},o.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,a,o,h,l,_,u=this._dirty?this.totalDuration():this._totalDuration,p=this._duration,c=this._time,f=this._totalTime,m=this._startTime,d=this._timeScale,g=this._rawPrevTime,v=this._paused,y=this._cycle;if(t>=u?(this._locked||(this._totalTime=u,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(a=!0,h="onComplete",0===this._duration&&(0===t||0>g||g===r)&&g!==t&&this._first&&(l=!0,g>r&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||0===this._rawPrevTime?t:r,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=p,t=p+1e-4)):1e-7>t?(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==c||0===p&&(g>r||0>t&&g>=0)&&!this._locked)&&(h="onReverseComplete",a=this._reversed),0>t?(this._active=!1,0===p&&g>=0&&this._first&&(l=!0),this._rawPrevTime=t):(this._rawPrevTime=p||!e||t||0===this._rawPrevTime?t:r,t=0,this._initted||(l=!0))):(0===p&&0>g&&(l=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(_=p+this._repeatDelay,this._cycle=this._totalTime/_>>0,0!==this._cycle&&this._cycle===this._totalTime/_&&this._cycle--,this._time=this._totalTime-this._cycle*_,this._yoyo&&0!==(1&this._cycle)&&(this._time=p-this._time),this._time>p?(this._time=p,t=p+1e-4):0>this._time?this._time=t=0:t=this._time))),this._cycle!==y&&!this._locked){var T=this._yoyo&&0!==(1&y),w=T===(this._yoyo&&0!==(1&this._cycle)),x=this._totalTime,b=this._cycle,P=this._rawPrevTime,S=this._time;if(this._totalTime=y*p,y>this._cycle?T=!T:this._totalTime+=p,this._time=c,this._rawPrevTime=0===p?g-1e-4:g,this._cycle=y,this._locked=!0,c=T?0:p,this.render(c,e,0===p),e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||n),w&&(c=T?p+1e-4:-1e-4,this.render(c,!0,!1)),this._locked=!1,this._paused&&!v)return;this._time=S,this._totalTime=x,this._cycle=b,this._rawPrevTime=P}if(!(this._time!==c&&this._first||i||l))return f!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._totalTime&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n)),this._time>=c)for(s=this._first;s&&(o=s._next,!this._paused||v);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=o;else for(s=this._last;s&&(o=s._prev,!this._paused||v);)(s._active||c>=s._startTime&&!s._paused&&!s._gc)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=o;this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),h&&(this._locked||this._gc||(m===this._startTime||d!==this._timeScale)&&(0===this._time||u>=this.totalDuration())&&(a&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[h]&&this.vars[h].apply(this.vars[h+"Scope"]||this,this.vars[h+"Params"]||n)))},o.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var s,r,n=[],a=this.getChildren(t,e,i),o=0,h=a.length;for(s=0;h>s;s++)r=a[s],r.isActive()&&(n[o++]=r);return n},o.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),s=i.length;for(e=0;s>e;e++)if(i[e].time>t)return i[e].name;return null},o.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},o.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},o.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},o.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},o.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},o.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},o.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},o.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},o.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},o.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},s},!0),function(){var t=180/Math.PI,e=[],i=[],s=[],r={},n=function(t,e,i,s){this.a=t,this.b=e,this.c=i,this.d=s,this.da=s-t,this.ca=i-t,this.ba=e-t},a=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",o=function(t,e,i,s){var r={a:t},n={},a={},o={c:s},h=(t+e)/2,l=(e+i)/2,_=(i+s)/2,u=(h+l)/2,p=(l+_)/2,c=(p-u)/8;return r.b=h+(t-h)/4,n.b=u+c,r.c=n.a=(r.b+n.b)/2,n.c=a.a=(u+p)/2,a.b=p-c,o.b=_+(s-_)/4,a.c=o.a=(a.b+o.b)/2,[r,n,a,o]},h=function(t,r,n,a,h){var l,_,u,p,c,f,m,d,g,v,y,T,w,x=t.length-1,b=0,P=t[0].a;for(l=0;x>l;l++)c=t[b],_=c.a,u=c.d,p=t[b+1].d,h?(y=e[l],T=i[l],w=.25*(T+y)*r/(a?.5:s[l]||.5),f=u-(u-_)*(a?.5*r:0!==y?w/y:0),m=u+(p-u)*(a?.5*r:0!==T?w/T:0),d=u-(f+((m-f)*(3*y/(y+T)+.5)/4||0))):(f=u-.5*(u-_)*r,m=u+.5*(p-u)*r,d=u-(f+m)/2),f+=d,m+=d,c.c=g=f,c.b=0!==l?P:P=c.a+.6*(c.c-c.a),c.da=u-_,c.ca=g-_,c.ba=P-_,n?(v=o(_,P,g,u),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=m;c=t[b],c.b=P,c.c=P+.4*(c.d-P),c.da=c.d-c.a,c.ca=c.c-c.a,c.ba=P-c.a,n&&(v=o(c.a,P,c.c,c.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},l=function(t,s,r,a){var o,h,l,_,u,p,c=[];if(a)for(t=[a].concat(t),h=t.length;--h>-1;)"string"==typeof(p=t[h][s])&&"="===p.charAt(1)&&(t[h][s]=a[s]+Number(p.charAt(0)+p.substr(2)));if(o=t.length-2,0>o)return c[0]=new n(t[0][s],0,0,t[-1>o?0:1][s]),c;for(h=0;o>h;h++)l=t[h][s],_=t[h+1][s],c[h]=new n(l,0,0,_),r&&(u=t[h+2][s],e[h]=(e[h]||0)+(_-l)*(_-l),i[h]=(i[h]||0)+(u-_)*(u-_));return c[h]=new n(t[h][s],0,0,t[h+1][s]),c},_=function(t,n,o,_,u,p){var c,f,m,d,g,v,y,T,w={},x=[],b=p||t[0];u="string"==typeof u?","+u+",":a,null==n&&(n=1);for(f in t[0])x.push(f);if(t.length>1){for(T=t[t.length-1],y=!0,c=x.length;--c>-1;)if(f=x[c],Math.abs(b[f]-T[f])>.05){y=!1;break}y&&(t=t.concat(),p&&t.unshift(p),t.push(t[1]),p=t[t.length-3])}for(e.length=i.length=s.length=0,c=x.length;--c>-1;)f=x[c],r[f]=-1!==u.indexOf(","+f+","),w[f]=l(t,f,r[f],p);for(c=e.length;--c>-1;)e[c]=Math.sqrt(e[c]),i[c]=Math.sqrt(i[c]);if(!_){for(c=x.length;--c>-1;)if(r[f])for(m=w[x[c]],v=m.length-1,d=0;v>d;d++)g=m[d+1].da/i[d]+m[d].da/e[d],s[d]=(s[d]||0)+g*g;for(c=s.length;--c>-1;)s[c]=Math.sqrt(s[c])}for(c=x.length,d=o?4:1;--c>-1;)f=x[c],m=w[f],h(m,n,o,_,r[f]),y&&(m.splice(0,d),m.splice(m.length-d,d));return w},u=function(t,e,i){e=e||"soft";var s,r,a,o,h,l,_,u,p,c,f,m={},d="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||d+1>t.length)throw"invalid Bezier data";for(p in t[0])v.push(p);for(l=v.length;--l>-1;){for(p=v[l],m[p]=h=[],c=0,u=t.length,_=0;u>_;_++)s=null==i?t[_][p]:"string"==typeof(f=t[_][p])&&"="===f.charAt(1)?i[p]+Number(f.charAt(0)+f.substr(2)):Number(f),g&&_>1&&u-1>_&&(h[c++]=(s+h[c-2])/2),h[c++]=s;for(u=c-d+1,c=0,_=0;u>_;_+=d)s=h[_],r=h[_+1],a=h[_+2],o=2===d?0:h[_+3],h[c++]=f=3===d?new n(s,r,a,o):new n(s,(2*r+s)/3,(2*r+a)/3,a);h.length=c}return m},p=function(t,e,i){for(var s,r,n,a,o,h,l,_,u,p,c,f=1/i,m=t.length;--m>-1;)for(p=t[m],n=p.a,a=p.d-n,o=p.c-n,h=p.b-n,s=r=0,_=1;i>=_;_++)l=f*_,u=1-l,s=r-(r=(l*l*a+3*u*(l*o+u*h))*l),c=m*i+_-1,e[c]=(e[c]||0)+s*s},c=function(t,e){e=e>>0||6;var i,s,r,n,a=[],o=[],h=0,l=0,_=e-1,u=[],c=[];for(i in t)p(t[i],a,e);for(r=a.length,s=0;r>s;s++)h+=Math.sqrt(a[s]),n=s%e,c[n]=h,n===_&&(l+=h,n=s/e>>0,u[n]=c,o[n]=l,h=0,c=[]);return{length:l,lengths:o,segments:u}},f=window._gsDefine.plugin({propName:"bezier",priority:-1,API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var s,r,n,a,o,h=e.values||[],l={},p=h[0],f=e.autoRotate||i.vars.orientToBezier;this._autoRotate=f?f instanceof Array?f:[["x","y","rotation",f===!0?0:Number(f)||0]]:null;for(s in p)this._props.push(s);for(n=this._props.length;--n>-1;)s=this._props[n],this._overwriteProps.push(s),r=this._func[s]="function"==typeof t[s],l[s]=r?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(t[s]),o||l[s]!==h[0][s]&&(o=l);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?_(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):u(h,e.type,l),this._segCount=this._beziers[s].length,this._timeRes){var m=c(this._beziers,this._timeRes);this._length=m.length,this._lengths=m.lengths,this._segments=m.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(f=this._autoRotate)for(f[0]instanceof Array||(this._autoRotate=f=[f]),n=f.length;--n>-1;)for(a=0;3>a;a++)s=f[n][a],this._func[s]="function"==typeof t[s]?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]:!1;return!0},set:function(e){var i,s,r,n,a,o,h,l,_,u,p=this._segCount,c=this._func,f=this._target;if(this._timeRes){if(_=this._lengths,u=this._curSeg,e*=this._length,r=this._li,e>this._l2&&p-1>r){for(l=p-1;l>r&&e>=(this._l2=_[++r]););this._l1=_[r-1],this._li=r,this._curSeg=u=this._segments[r],this._s2=u[this._s1=this._si=0]}else if(this._l1>e&&r>0){for(;r>0&&(this._l1=_[--r])>=e;);0===r&&this._l1>e?this._l1=0:r++,this._l2=_[r],this._li=r,this._curSeg=u=this._segments[r],this._s1=u[(this._si=u.length-1)-1]||0,this._s2=u[this._si]}if(i=r,e-=this._l1,r=this._si,e>this._s2&&u.length-1>r){for(l=u.length-1;l>r&&e>=(this._s2=u[++r]););this._s1=u[r-1],this._si=r}else if(this._s1>e&&r>0){for(;r>0&&(this._s1=u[--r])>=e;);0===r&&this._s1>e?this._s1=0:r++,this._s2=u[r],this._si=r}o=(r+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?p-1:p*e>>0,o=(e-i*(1/p))*p;for(s=1-o,r=this._props.length;--r>-1;)n=this._props[r],a=this._beziers[n][i],h=(o*o*a.da+3*s*(o*a.ca+s*a.ba))*o+a.a,this._round[n]&&(h=h+(h>0?.5:-.5)>>0),c[n]?f[n](h):f[n]=h;if(this._autoRotate){var m,d,g,v,y,T,w,x=this._autoRotate;for(r=x.length;--r>-1;)n=x[r][2],T=x[r][3]||0,w=x[r][4]===!0?1:t,a=this._beziers[x[r][0]],m=this._beziers[x[r][1]],a&&m&&(a=a[i],m=m[i],d=a.a+(a.b-a.a)*o,v=a.b+(a.c-a.b)*o,d+=(v-d)*o,v+=(a.c+(a.d-a.c)*o-v)*o,g=m.a+(m.b-m.a)*o,y=m.b+(m.c-m.b)*o,g+=(y-g)*o,y+=(m.c+(m.d-m.c)*o-y)*o,h=Math.atan2(y-g,v-d)*w+T,c[n]?f[n](h):f[n]=h)}}}),m=f.prototype;f.bezierThrough=_,f.cubicToQuadratic=o,f._autoCSS=!0,f.quadraticToCubic=function(t,e,i){return new n(t,(2*e+t)/3,(2*e+i)/3,i)},f._cssRegister=function(){var t=window._gsDefine.globals.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,s=e._setPluginRatio,r=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,a,o,h){e instanceof Array&&(e={values:e}),h=new f;var l,_,u,p=e.values,c=p.length-1,m=[],d={};if(0>c)return o;for(l=0;c>=l;l++)u=i(t,p[l],a,o,h,c!==l),m[l]=u.end;for(_ in e)d[_]=e[_];return d.values=m,o=new r(t,"bezier",0,0,u.pt,2),o.data=u,o.plugin=h,o.setRatio=s,0===d.autoRotate&&(d.autoRotate=!0),!d.autoRotate||d.autoRotate instanceof Array||(l=d.autoRotate===!0?0:Number(d.autoRotate),d.autoRotate=null!=u.end.left?[["left","top","rotation",l,!1]]:null!=u.end.x?[["x","y","rotation",l,!1]]:!1),d.autoRotate&&(a._transform||a._enableTransforms(!1),u.autoRotate=a._target._gsTransform),h._onInitTween(u.proxy,d,a._tween),o
	}})}},m._roundProps=function(t,e){for(var i=this._overwriteProps,s=i.length;--s>-1;)(t[i[s]]||t.bezier||t.bezierThrough)&&(this._round[i[s]]=e)},m._kill=function(t){var e,i,s=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=s.length;--i>-1;)s[i]===e&&s.splice(i,1);return this._super._kill.call(this,t)}}(),window._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,s,r,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o={},h=a.prototype=new t("css");h.constructor=a,a.version="1.11.5",a.API=2,a.defaultTransformPerspective=0,h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var l,_,u,p,c,f,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,d=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,g=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,v=/[^\d\-\.]/g,y=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/,w=/opacity:([^;]*)/,x=/alpha\(opacity *=.+?\)/i,b=/^(rgb|hsl)/,P=/([A-Z])/g,S=/-([a-z])/gi,k=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,R=function(t,e){return e.toUpperCase()},A=/(?:Left|Right|Width)/i,C=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,O=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,M=Math.PI/180,I=180/Math.PI,E={},N=document,F=N.createElement("div"),L=N.createElement("img"),X=a._internals={_specialProps:o},z=navigator.userAgent,U=function(){var t,e=z.indexOf("Android"),i=N.createElement("div");return u=-1!==z.indexOf("Safari")&&-1===z.indexOf("Chrome")&&(-1===e||Number(z.substr(e+8,1))>3),c=u&&6>Number(z.substr(z.indexOf("Version/")+8,1)),p=-1!==z.indexOf("Firefox"),/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z)&&(f=parseFloat(RegExp.$1)),i.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",t=i.getElementsByTagName("a")[0],t?/^0.55/.test(t.style.opacity):!1}(),Y=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},j=function(t){window.console&&console.log(t)},B="",q="",V=function(t,e){e=e||F;var i,s,r=e.style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],s=5;--s>-1&&void 0===r[i[s]+t];);return s>=0?(q=3===s?"ms":i[s],B="-"+q.toLowerCase()+"-",q+t):null},W=N.defaultView?N.defaultView.getComputedStyle:function(){},G=a.getStyle=function(t,e,i,s,r){var n;return U||"opacity"!==e?(!s&&t.style[e]?n=t.style[e]:(i=i||W(t,null))?(t=i.getPropertyValue(e.replace(P,"-$1").toLowerCase()),n=t||i.length?t:i[e]):t.currentStyle&&(n=t.currentStyle[e]),null==r||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:r):Y(t)},$=function(t,e,i,s,r){if("px"===s||!s)return i;if("auto"===s||!i)return 0;var n,a=A.test(e),o=t,h=F.style,l=0>i;return l&&(i=-i),"%"===s&&-1!==e.indexOf("border")?n=i/100*(a?t.clientWidth:t.clientHeight):(h.cssText="border:0 solid red;position:"+G(t,"position")+";line-height:0;","%"!==s&&o.appendChild?h[a?"borderLeftWidth":"borderTopWidth"]=i+s:(o=t.parentNode||N.body,h[a?"width":"height"]=i+s),o.appendChild(F),n=parseFloat(F[a?"offsetWidth":"offsetHeight"]),o.removeChild(F),0!==n||r||(n=$(t,e,i,s,!0))),l?-n:n},Z=function(t,e,i){if("absolute"!==G(t,"position",i))return 0;var s="left"===e?"Left":"Top",r=G(t,"margin"+s,i);return t["offset"+s]-($(t,e,parseFloat(r),r.replace(y,""))||0)},Q=function(t,e){var i,s,r={};if(e=e||W(t,null))if(i=e.length)for(;--i>-1;)r[e[i].replace(S,R)]=e.getPropertyValue(e[i]);else for(i in e)r[i]=e[i];else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===r[i]&&(r[i.replace(S,R)]=e[i]);return U||(r.opacity=Y(t)),s=be(t,e,!1),r.rotation=s.rotation,r.skewX=s.skewX,r.scaleX=s.scaleX,r.scaleY=s.scaleY,r.x=s.x,r.y=s.y,xe&&(r.z=s.z,r.rotationX=s.rotationX,r.rotationY=s.rotationY,r.scaleZ=s.scaleZ),r.filters&&delete r.filters,r},H=function(t,e,i,s,r){var n,a,o,h={},l=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(h[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(v,"")?n:0:Z(t,a),void 0!==l[a]&&(o=new ue(l,a,l[a],o)));if(s)for(a in s)"className"!==a&&(h[a]=s[a]);return{difs:h,firstMPT:o}},K={width:["Left","Right"],height:["Top","Bottom"]},J=["marginLeft","marginRight","marginTop","marginBottom"],te=function(t,e,i){var s=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=K[e],n=r.length;for(i=i||W(t,null);--n>-1;)s-=parseFloat(G(t,"padding"+r[n],i,!0))||0,s-=parseFloat(G(t,"border"+r[n]+"Width",i,!0))||0;return s},ee=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="0":"center"===r&&(r="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(s.replace(v,"")),e.oy=parseFloat(r.replace(v,""))),s+" "+r+(i.length>2?" "+i[2]:"")},ie=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},se=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*Number(t.substr(2))+e:parseFloat(t)},re=function(t,e,i,s){var r,n,a,o,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(r=360,n=t.split("_"),a=Number(n[0].replace(v,""))*(-1===t.indexOf("rad")?1:I)-("="===t.charAt(1)?0:e),n.length&&(s&&(s[i]=e+a),-1!==t.indexOf("short")&&(a%=r,a!==a%(r/2)&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*r)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*r)%r-(0|a/r)*r)),o=e+a),h>o&&o>-h&&(o=0),o},ne={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ae=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},oe=function(t){var e,i,s,r,n,a;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),ne[t]?ne[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),s=t.charAt(3),t="#"+e+e+i+i+s+s),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(m),r=Number(t[0])%360/360,n=Number(t[1])/100,a=Number(t[2])/100,i=.5>=a?a*(n+1):a+n-a*n,e=2*a-i,t.length>3&&(t[3]=Number(t[3])),t[0]=ae(r+1/3,e,i),t[1]=ae(r,e,i),t[2]=ae(r-1/3,e,i),t):(t=t.match(m)||ne.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):ne.black},he="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in ne)he+="|"+h+"\\b";he=RegExp(he+")","gi");var le=function(t,e,i,s){if(null==t)return function(t){return t};var r,n=e?(t.match(he)||[""])[0]:"",a=t.split(n).join("").match(g)||[],o=t.substr(0,t.indexOf(a[0])),h=")"===t.charAt(t.length-1)?")":"",l=-1!==t.indexOf(" ")?" ":",",_=a.length,u=_>0?a[0].replace(m,""):"";return _?r=e?function(t){var e,p,c,f;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(f=t.replace(D,"|").split("|"),c=0;f.length>c;c++)f[c]=r(f[c]);return f.join(",")}if(e=(t.match(he)||[n])[0],p=t.split(e).join("").match(g)||[],c=p.length,_>c--)for(;_>++c;)p[c]=i?p[0|(c-1)/2]:a[c];return o+p.join(l)+l+e+h+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,p;if("number"==typeof t)t+=u;else if(s&&D.test(t)){for(n=t.replace(D,"|").split("|"),p=0;n.length>p;p++)n[p]=r(n[p]);return n.join(",")}if(e=t.match(g)||[],p=e.length,_>p--)for(;_>++p;)e[p]=i?e[0|(p-1)/2]:a[p];return o+e.join(l)+h}:function(t){return t}},_e=function(t){return t=t.split(","),function(e,i,s,r,n,a,o){var h,l=(i+"").split(" ");for(o={},h=0;4>h;h++)o[t[h]]=l[h]=l[h]||l[(h-1)/2>>0];return r.parse(e,o,n,a)}},ue=(X._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,s,r,n=this.data,a=n.proxy,o=n.firstMPT,h=1e-6;o;)e=a[o.v],o.r?e=e>0?0|e+.5:0|e-.5:h>e&&e>-h&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,s=1;i.l>s;s++)r+=i["xn"+s]+i["xs"+(s+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,s,r){this.t=t,this.p=e,this.v=i,this.r=r,s&&(s._prev=this,this._next=s)}),pe=(X._parseToProxy=function(t,e,i,s,r,n){var a,o,h,l,_,u=s,p={},c={},f=i._transform,m=E;for(i._transform=null,E=e,s=_=i.parse(t,e,s,r),E=m,n&&(i._transform=f,u&&(u._prev=null,u._prev&&(u._prev._next=null)));s&&s!==u;){if(1>=s.type&&(o=s.p,c[o]=s.s+s.c,p[o]=s.s,n||(l=new ue(s,"s",o,l,s.r),s.c=0),1===s.type))for(a=s.l;--a>0;)h="xn"+a,o=s.p+"_"+h,c[o]=s.data[h],p[o]=s[h],n||(l=new ue(s,h,o,l,s.rxp[h]));s=s._next}return{proxy:p,end:c,firstMPT:l,pt:_}},X.CSSPropTween=function(t,e,s,r,a,o,h,l,_,u,p){this.t=t,this.p=e,this.s=s,this.c=r,this.n=h||e,t instanceof pe||n.push(this.n),this.r=l,this.type=o||0,_&&(this.pr=_,i=!0),this.b=void 0===u?s:u,this.e=void 0===p?s+r:p,a&&(this._next=a,a._prev=this)}),ce=a.parseComplex=function(t,e,i,s,r,n,a,o,h,_){i=i||n||"",a=new pe(t,e,0,0,a,_?2:1,null,!1,o,i,s),s+="";var u,p,c,f,g,v,y,T,w,x,P,S,k=i.split(", ").join(",").split(" "),R=s.split(", ").join(",").split(" "),A=k.length,C=l!==!1;for((-1!==s.indexOf(",")||-1!==i.indexOf(","))&&(k=k.join(" ").replace(D,", ").split(" "),R=R.join(" ").replace(D,", ").split(" "),A=k.length),A!==R.length&&(k=(n||"").split(" "),A=k.length),a.plugin=h,a.setRatio=_,u=0;A>u;u++)if(f=k[u],g=R[u],T=parseFloat(f),T||0===T)a.appendXtra("",T,ie(g,T),g.replace(d,""),C&&-1!==g.indexOf("px"),!0);else if(r&&("#"===f.charAt(0)||ne[f]||b.test(f)))S=","===g.charAt(g.length-1)?"),":")",f=oe(f),g=oe(g),w=f.length+g.length>6,w&&!U&&0===g[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(R[u]).join("transparent")):(U||(w=!1),a.appendXtra(w?"rgba(":"rgb(",f[0],g[0]-f[0],",",!0,!0).appendXtra("",f[1],g[1]-f[1],",",!0).appendXtra("",f[2],g[2]-f[2],w?",":S,!0),w&&(f=4>f.length?1:f[3],a.appendXtra("",f,(4>g.length?1:g[3])-f,S,!1)));else if(v=f.match(m)){if(y=g.match(d),!y||y.length!==v.length)return a;for(c=0,p=0;v.length>p;p++)P=v[p],x=f.indexOf(P,c),a.appendXtra(f.substr(c,x-c),Number(P),ie(y[p],P),"",C&&"px"===f.substr(x+P.length,2),0===p),c=x+P.length;a["xs"+a.l]+=f.substr(c)}else a["xs"+a.l]+=a.l?" "+f:f;if(-1!==s.indexOf("=")&&a.data){for(S=a.xs0+a.data.s,u=1;a.l>u;u++)S+=a["xs"+u]+a.data["xn"+u];a.e=S+a["xs"+u]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},fe=9;for(h=pe.prototype,h.l=h.pr=0;--fe>0;)h["xn"+fe]=0,h["xs"+fe]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,s,r,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=s||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new pe(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(s||""),a)};var me=function(t,e){e=e||{},this.p=e.prefix?V(t)||t:t,o[t]=o[this.p]=this,this.format=e.formatter||le(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},de=X._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var s,r,n=t.split(","),a=e.defaultValue;for(i=i||[a],s=0;n.length>s;s++)e.prefix=0===s&&e.prefix,e.defaultValue=i[s]||a,r=new me(n[s],e)},ge=function(t){if(!o[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";de(t,{parser:function(t,i,s,r,n,a,h){var l=(window.GreenSockGlobals||window).com.greensock.plugins[e];return l?(l._cssRegister(),o[s].parse(t,i,s,r,n,a,h)):(j("Error: "+e+" js file not loaded."),n)}})}};h=me.prototype,h.parseComplex=function(t,e,i,s,r,n){var a,o,h,l,_,u,p=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),h=i.replace(D,"|").split("|")):p&&(o=[e],h=[i])),h){for(l=h.length>o.length?h.length:o.length,a=0;l>a;a++)e=o[a]=o[a]||this.dflt,i=h[a]=h[a]||this.dflt,p&&(_=e.indexOf(p),u=i.indexOf(p),_!==u&&(i=-1===u?h:o,i[a]+=" "+p));e=o.join(", "),i=h.join(", ")}return ce(t,this.p,e,i,this.clrs,this.dflt,s,this.pr,r,n)},h.parse=function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(G(t,this.p,r,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){de(t,{parser:function(t,s,r,n,a,o){var h=new pe(t,r,0,0,a,2,r,!1,i);return h.plugin=o,h.setRatio=e(t,s,n._tween,r),h},priority:i})};var ve="scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),ye=V("transform"),Te=B+"transform",we=V("transformOrigin"),xe=null!==V("perspective"),be=function(t,e,i,s){if(t._gsTransform&&i&&!s)return t._gsTransform;var r,n,o,h,l,_,u,p,c,f,m,d,g,v=i?t._gsTransform||{skewY:0}:{skewY:0},y=0>v.scaleX,T=2e-5,w=1e5,x=179.99,b=x*M,P=xe?parseFloat(G(t,we,e,!1,"0 0 0").split(" ")[2])||v.zOrigin||0:0;for(ye?r=G(t,Te,e,!0):t.currentStyle&&(r=t.currentStyle.filter.match(C),r=r&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),v.x||0,v.y||0].join(","):""),n=(r||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],o=n.length;--o>-1;)h=Number(n[o]),n[o]=(l=h-(h|=0))?(0|l*w+(0>l?-.5:.5))/w+h:h;if(16===n.length){var S=n[8],k=n[9],R=n[10],A=n[12],O=n[13],D=n[14];if(v.zOrigin&&(D=-v.zOrigin,A=S*D-n[12],O=k*D-n[13],D=R*D+v.zOrigin-n[14]),!i||s||null==v.rotationX){var E,N,F,L,X,z,U,Y=n[0],j=n[1],B=n[2],q=n[3],V=n[4],W=n[5],$=n[6],Z=n[7],Q=n[11],H=Math.atan2($,R),K=-b>H||H>b;v.rotationX=H*I,H&&(L=Math.cos(-H),X=Math.sin(-H),E=V*L+S*X,N=W*L+k*X,F=$*L+R*X,S=V*-X+S*L,k=W*-X+k*L,R=$*-X+R*L,Q=Z*-X+Q*L,V=E,W=N,$=F),H=Math.atan2(S,Y),v.rotationY=H*I,H&&(z=-b>H||H>b,L=Math.cos(-H),X=Math.sin(-H),E=Y*L-S*X,N=j*L-k*X,F=B*L-R*X,k=j*X+k*L,R=B*X+R*L,Q=q*X+Q*L,Y=E,j=N,B=F),H=Math.atan2(j,W),v.rotation=H*I,H&&(U=-b>H||H>b,L=Math.cos(-H),X=Math.sin(-H),Y=Y*L+V*X,N=j*L+W*X,W=j*-X+W*L,$=B*-X+$*L,j=N),U&&K?v.rotation=v.rotationX=0:U&&z?v.rotation=v.rotationY=0:z&&K&&(v.rotationY=v.rotationX=0),v.scaleX=(0|Math.sqrt(Y*Y+j*j)*w+.5)/w,v.scaleY=(0|Math.sqrt(W*W+k*k)*w+.5)/w,v.scaleZ=(0|Math.sqrt($*$+R*R)*w+.5)/w,v.skewX=0,v.perspective=Q?1/(0>Q?-Q:Q):0,v.x=A,v.y=O,v.z=D}}else if(!(xe&&!s&&n.length&&v.x===n[4]&&v.y===n[5]&&(v.rotationX||v.rotationY)||void 0!==v.x&&"none"===G(t,"display",e))){var J=n.length>=6,te=J?n[0]:1,ee=n[1]||0,ie=n[2]||0,se=J?n[3]:1;v.x=n[4]||0,v.y=n[5]||0,_=Math.sqrt(te*te+ee*ee),u=Math.sqrt(se*se+ie*ie),p=te||ee?Math.atan2(ee,te)*I:v.rotation||0,c=ie||se?Math.atan2(ie,se)*I+p:v.skewX||0,f=_-Math.abs(v.scaleX||0),m=u-Math.abs(v.scaleY||0),Math.abs(c)>90&&270>Math.abs(c)&&(y?(_*=-1,c+=0>=p?180:-180,p+=0>=p?180:-180):(u*=-1,c+=0>=c?180:-180)),d=(p-v.rotation)%180,g=(c-v.skewX)%180,(void 0===v.skewX||f>T||-T>f||m>T||-T>m||d>-x&&x>d&&false|d*w||g>-x&&x>g&&false|g*w)&&(v.scaleX=_,v.scaleY=u,v.rotation=p,v.skewX=c),xe&&(v.rotationX=v.rotationY=v.z=0,v.perspective=parseFloat(a.defaultTransformPerspective)||0,v.scaleZ=1)}v.zOrigin=P;for(o in v)T>v[o]&&v[o]>-T&&(v[o]=0);return i&&(t._gsTransform=v),v},Pe=function(t){var e,i,s=this.data,r=-s.rotation*M,n=r+s.skewX*M,a=1e5,o=(0|Math.cos(r)*s.scaleX*a)/a,h=(0|Math.sin(r)*s.scaleX*a)/a,l=(0|Math.sin(n)*-s.scaleY*a)/a,_=(0|Math.cos(n)*s.scaleY*a)/a,u=this.t.style,p=this.t.currentStyle;if(p){i=h,h=-l,l=-i,e=p.filter,u.filter="";var c,m,d=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==p.position,w="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+h+", M21="+l+", M22="+_,x=s.x,b=s.y;if(null!=s.ox&&(c=(s.oxp?.01*d*s.ox:s.ox)-d/2,m=(s.oyp?.01*g*s.oy:s.oy)-g/2,x+=c-(c*o+m*h),b+=m-(c*l+m*_)),v?(c=d/2,m=g/2,w+=", Dx="+(c-(c*o+m*h)+x)+", Dy="+(m-(c*l+m*_)+b)+")"):w+=", sizingMethod='auto expand')",u.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(O,w):w+" "+e,(0===t||1===t)&&1===o&&0===h&&0===l&&1===_&&(v&&-1===w.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&u.removeAttribute("filter")),!v){var P,S,k,R=8>f?1:-1;for(c=s.ieOffsetX||0,m=s.ieOffsetY||0,s.ieOffsetX=Math.round((d-((0>o?-o:o)*d+(0>h?-h:h)*g))/2+x),s.ieOffsetY=Math.round((g-((0>_?-_:_)*g+(0>l?-l:l)*d))/2+b),fe=0;4>fe;fe++)S=J[fe],P=p[S],i=-1!==P.indexOf("px")?parseFloat(P):$(this.t,S,parseFloat(P),P.replace(y,""))||0,k=i!==s[S]?2>fe?-s.ieOffsetX:-s.ieOffsetY:2>fe?c-s.ieOffsetX:m-s.ieOffsetY,u[S]=(s[S]=Math.round(i-k*(0===fe||2===fe?1:R)))+"px"}}},Se=function(){var t,e,i,s,r,n,a,o,h,l,_,u,c,f,m,d,g,v,y,T,w,x,b,P=this.data,S=this.t.style,k=P.rotation*M,R=P.scaleX,A=P.scaleY,C=P.scaleZ,O=P.perspective;if(p){var D=1e-4;D>R&&R>-D&&(R=C=2e-5),D>A&&A>-D&&(A=C=2e-5),!O||P.z||P.rotationX||P.rotationY||(O=0)}if(k||P.skewX)v=Math.cos(k),y=Math.sin(k),t=v,r=y,P.skewX&&(k-=P.skewX*M,v=Math.cos(k),y=Math.sin(k)),e=-y,n=v;else{if(!(P.rotationY||P.rotationX||1!==C||O))return S[ye]="translate3d("+P.x+"px,"+P.y+"px,"+P.z+"px)"+(1!==R||1!==A?" scale("+R+","+A+")":""),void 0;t=n=1,e=r=0}_=1,i=s=a=o=h=l=u=c=f=0,m=O?-1/O:0,d=P.zOrigin,g=1e5,k=P.rotationY*M,k&&(v=Math.cos(k),y=Math.sin(k),h=_*-y,c=m*-y,i=t*y,a=r*y,_*=v,m*=v,t*=v,r*=v),k=P.rotationX*M,k&&(v=Math.cos(k),y=Math.sin(k),T=e*v+i*y,w=n*v+a*y,x=l*v+_*y,b=f*v+m*y,i=e*-y+i*v,a=n*-y+a*v,_=l*-y+_*v,m=f*-y+m*v,e=T,n=w,l=x,f=b),1!==C&&(i*=C,a*=C,_*=C,m*=C),1!==A&&(e*=A,n*=A,l*=A,f*=A),1!==R&&(t*=R,r*=R,h*=R,c*=R),d&&(u-=d,s=i*u,o=a*u,u=_*u+d),s=(T=(s+=P.x)-(s|=0))?(0|T*g+(0>T?-.5:.5))/g+s:s,o=(T=(o+=P.y)-(o|=0))?(0|T*g+(0>T?-.5:.5))/g+o:o,u=(T=(u+=P.z)-(u|=0))?(0|T*g+(0>T?-.5:.5))/g+u:u,S[ye]="matrix3d("+[(0|t*g)/g,(0|r*g)/g,(0|h*g)/g,(0|c*g)/g,(0|e*g)/g,(0|n*g)/g,(0|l*g)/g,(0|f*g)/g,(0|i*g)/g,(0|a*g)/g,(0|_*g)/g,(0|m*g)/g,s,o,u,O?1+-u/O:1].join(",")+")"},ke=function(t){var e,i,s,r,n,a=this.data,o=this.t,h=o.style;return a.rotationX||a.rotationY||a.z||a.force3D?(this.setRatio=Se,Se.call(this,t),void 0):(a.rotation||a.skewX?(e=a.rotation*M,i=e-a.skewX*M,s=1e5,r=a.scaleX*s,n=a.scaleY*s,h[ye]="matrix("+(0|Math.cos(e)*r)/s+","+(0|Math.sin(e)*r)/s+","+(0|Math.sin(i)*-n)/s+","+(0|Math.cos(i)*n)/s+","+a.x+","+a.y+")"):h[ye]="matrix("+a.scaleX+",0,0,"+a.scaleY+","+a.x+","+a.y+")",void 0)};de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D",{parser:function(t,e,i,s,n,a,o){if(s._transform)return n;var h,l,_,u,p,c,f,m=s._transform=be(t,r,!0,o.parseTransform),d=t.style,g=1e-6,v=ve.length,y=o,T={};if("string"==typeof y.transform&&ye)_=d.cssText,d[ye]=y.transform,d.display="block",h=be(t,null,!1),d.cssText=_;else if("object"==typeof y){if(h={scaleX:se(null!=y.scaleX?y.scaleX:y.scale,m.scaleX),scaleY:se(null!=y.scaleY?y.scaleY:y.scale,m.scaleY),scaleZ:se(y.scaleZ,m.scaleZ),x:se(y.x,m.x),y:se(y.y,m.y),z:se(y.z,m.z),perspective:se(y.transformPerspective,m.perspective)},f=y.directionalRotation,null!=f)if("object"==typeof f)for(_ in f)y[_]=f[_];else y.rotation=f;h.rotation=re("rotation"in y?y.rotation:"shortRotation"in y?y.shortRotation+"_short":"rotationZ"in y?y.rotationZ:m.rotation,m.rotation,"rotation",T),xe&&(h.rotationX=re("rotationX"in y?y.rotationX:"shortRotationX"in y?y.shortRotationX+"_short":m.rotationX||0,m.rotationX,"rotationX",T),h.rotationY=re("rotationY"in y?y.rotationY:"shortRotationY"in y?y.shortRotationY+"_short":m.rotationY||0,m.rotationY,"rotationY",T)),h.skewX=null==y.skewX?m.skewX:re(y.skewX,m.skewX),h.skewY=null==y.skewY?m.skewY:re(y.skewY,m.skewY),(l=h.skewY-m.skewY)&&(h.skewX+=l,h.rotation+=l)}for(xe&&null!=y.force3D&&(m.force3D=y.force3D,c=!0),p=m.force3D||m.z||m.rotationX||m.rotationY||h.z||h.rotationX||h.rotationY||h.perspective,p||null==y.scale||(h.scaleZ=1);--v>-1;)i=ve[v],u=h[i]-m[i],(u>g||-g>u||null!=E[i])&&(c=!0,n=new pe(m,i,m[i],u,n),i in T&&(n.e=T[i]),n.xs0=0,n.plugin=a,s._overwriteProps.push(n.n));return u=y.transformOrigin,(u||xe&&p&&m.zOrigin)&&(ye?(c=!0,i=we,u=(u||G(t,i,r,!1,"50% 50%"))+"",n=new pe(d,i,0,0,n,-1,"transformOrigin"),n.b=d[i],n.plugin=a,xe?(_=m.zOrigin,u=u.split(" "),m.zOrigin=(u.length>2&&(0===_||"0px"!==u[2])?parseFloat(u[2]):_)||0,n.xs0=n.e=d[i]=u[0]+" "+(u[1]||"50%")+" 0px",n=new pe(m,"zOrigin",0,0,n,-1,n.n),n.b=_,n.xs0=n.e=m.zOrigin):n.xs0=n.e=d[i]=u):ee(u+"",m)),c&&(s._transformType=p||3===this._transformType?3:2),n},prefix:!0}),de("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),de("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,h,l,_,u,p,c,f,m,d,g,v,y,T,w,x,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(m=parseFloat(t.offsetWidth),d=parseFloat(t.offsetHeight),o=e.split(" "),h=0;b.length>h;h++)this.p.indexOf("border")&&(b[h]=V(b[h])),u=_=G(t,b[h],r,!1,"0px"),-1!==u.indexOf(" ")&&(_=u.split(" "),u=_[0],_=_[1]),p=l=o[h],c=parseFloat(u),v=u.substr((c+"").length),y="="===p.charAt(1),y?(f=parseInt(p.charAt(0)+"1",10),p=p.substr(2),f*=parseFloat(p),g=p.substr((f+"").length-(0>f?1:0))||""):(f=parseFloat(p),g=p.substr((f+"").length)),""===g&&(g=s[i]||v),g!==v&&(T=$(t,"borderLeft",c,v),w=$(t,"borderTop",c,v),"%"===g?(u=100*(T/m)+"%",_=100*(w/d)+"%"):"em"===g?(x=$(t,"borderLeft",1,"em"),u=T/x+"em",_=w/x+"em"):(u=T+"px",_=w+"px"),y&&(p=parseFloat(u)+f+g,l=parseFloat(_)+f+g)),a=ce(P,b[h],u+" "+_,p+" "+l,!1,"0px",a);return a},prefix:!0,formatter:le("0px 0px 0px 0px",!1,!0)}),de("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,s,n,a){var o,h,l,_,u,p,c="background-position",m=r||W(t,null),d=this.format((m?f?m.getPropertyValue(c+"-x")+" "+m.getPropertyValue(c+"-y"):m.getPropertyValue(c):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==d.indexOf("%")!=(-1!==g.indexOf("%"))&&(p=G(t,"backgroundImage").replace(k,""),p&&"none"!==p)){for(o=d.split(" "),h=g.split(" "),L.setAttribute("src",p),l=2;--l>-1;)d=o[l],_=-1!==d.indexOf("%"),_!==(-1!==h[l].indexOf("%"))&&(u=0===l?t.offsetWidth-L.width:t.offsetHeight-L.height,o[l]=_?parseFloat(d)/100*u+"px":100*(parseFloat(d)/u)+"%");d=o.join(" ")}return this.parseComplex(t.style,d,g,n,a)},formatter:ee}),de("backgroundSize",{defaultValue:"0 0",formatter:ee}),de("perspective",{defaultValue:"0px",prefix:!0}),de("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),de("transformStyle",{prefix:!0}),de("backfaceVisibility",{prefix:!0}),de("userSelect",{prefix:!0}),de("margin",{parser:_e("marginTop,marginRight,marginBottom,marginLeft")}),de("padding",{parser:_e("paddingTop,paddingRight,paddingBottom,paddingLeft")}),de("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,s,n,a){var o,h,l;return 9>f?(h=t.currentStyle,l=8>f?" ":",",o="rect("+h.clipTop+l+h.clipRight+l+h.clipBottom+l+h.clipLeft+")",e=this.format(e).split(",").join(l)):(o=this.format(G(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),de("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),de("autoRound,strictUnits",{parser:function(t,e,i,s,r){return r}}),de("border",{defaultValue:"0px solid #000",parser:function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(G(t,"borderTopWidth",r,!1,"0px")+" "+G(t,"borderTopStyle",r,!1,"solid")+" "+G(t,"borderTopColor",r,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(he)||["#000"])[0]}}),de("borderWidth",{parser:_e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),de("float,cssFloat,styleFloat",{parser:function(t,e,i,s,r){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new pe(n,a,0,0,r,-1,i,!1,0,n[a],e)}});var Re=function(t){var e,i=this.t,s=i.filter||G(this.data,"filter"),r=0|this.s+this.c*t;100===r&&(-1===s.indexOf("atrix(")&&-1===s.indexOf("radient(")&&-1===s.indexOf("oader(")?(i.removeAttribute("filter"),e=!G(this.data,"filter")):(i.filter=s.replace(x,""),e=!0)),e||(this.xn1&&(i.filter=s=s||"alpha(opacity="+r+")"),-1===s.indexOf("opacity")?0===r&&this.xn1||(i.filter=s+" alpha(opacity="+r+")"):i.filter=s.replace(T,"opacity="+r))};de("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,s,n,a){var o=parseFloat(G(t,"opacity",r,!1,"1")),h=t.style,l="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),l&&1===o&&"hidden"===G(t,"visibility",r)&&0!==e&&(o=0),U?n=new pe(h,"opacity",o,e-o,n):(n=new pe(h,"opacity",100*o,100*(e-o),n),n.xn1=l?1:0,h.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Re),l&&(n=new pe(h,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",s._overwriteProps.push(n.n),s._overwriteProps.push(i)),n}});var Ae=function(t,e){e&&(t.removeProperty?t.removeProperty(e.replace(P,"-$1").toLowerCase()):t.removeAttribute(e))},Ce=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.className=0===t?this.b:this.e;for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Ae(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.className!==this.e&&(this.t.className=this.e)};de("className",{parser:function(t,e,s,n,a,o,h){var l,_,u,p,c,f=t.className,m=t.style.cssText;if(a=n._classNamePT=new pe(t,s,0,0,a,2),a.setRatio=Ce,a.pr=-11,i=!0,a.b=f,_=Q(t,r),u=t._gsClassPT){for(p={},c=u.data;c;)p[c.p]=1,c=c._next;u.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:f.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),n._tween._duration&&(t.className=a.e,l=H(t,_,Q(t),h,p),t.className=f,a.data=l.firstMPT,t.style.cssText=m,a=a.xfirst=n.parse(t,l.difs,a,o)),a}});var Oe=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,s,r,n=this.t.style,a=o.transform.parse;if("all"===this.e)n.cssText="",r=!0;else for(e=this.e.split(","),s=e.length;--s>-1;)i=e[s],o[i]&&(o[i].parse===a?r=!0:i="transformOrigin"===i?we:o[i].p),Ae(n,i);r&&(Ae(n,ye),this.t._gsTransform&&delete this.t._gsTransform)}};for(de("clearProps",{parser:function(t,e,s,r,n){return n=new pe(t,s,0,0,n,2),n.setRatio=Oe,n.e=e,n.pr=-10,n.data=r._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),fe=h.length;fe--;)ge(h[fe]);h=a.prototype,h._firstPT=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,l=e.autoRound,i=!1,s=e.suffixMap||a.suffixMap,r=W(t,""),n=this._overwriteProps;var h,p,f,m,d,g,v,y,T,x=t.style;if(_&&""===x.zIndex&&(h=G(t,"zIndex",r),("auto"===h||""===h)&&(x.zIndex=0)),"string"==typeof e&&(m=x.cssText,h=Q(t,r),x.cssText=m+";"+e,h=H(t,h,Q(t)).difs,!U&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,x.cssText=m),this._firstPT=p=this.parse(t,e,null),this._transformType){for(T=3===this._transformType,ye?u&&(_=!0,""===x.zIndex&&(v=G(t,"zIndex",r),("auto"===v||""===v)&&(x.zIndex=0)),c&&(x.WebkitBackfaceVisibility=this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):x.zoom=1,f=p;f&&f._next;)f=f._next;y=new pe(t,"transform",0,0,null,2),this._linkCSSP(y,null,f),y.setRatio=T&&xe?Se:ye?ke:Pe,y.data=this._transform||be(t,r,!0),n.pop()}if(i){for(;p;){for(g=p._next,f=m;f&&f.pr>p.pr;)f=f._next;(p._prev=f?f._prev:d)?p._prev._next=p:m=p,(p._next=f)?f._prev=p:d=p,p=g}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,h,_,u,p,c,f,m,d,g,v=t.style;for(a in e)c=e[a],h=o[a],h?i=h.parse(t,c,a,this,i,n,e):(p=G(t,a,r)+"",d="string"==typeof c,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||d&&b.test(c)?(d||(c=oe(c),c=(c.length>3?"rgba(":"rgb(")+c.join(",")+")"),i=ce(v,a,p,c,!0,"transparent",i,0,n)):!d||-1===c.indexOf(" ")&&-1===c.indexOf(",")?(_=parseFloat(p),f=_||0===_?p.substr((_+"").length):"",(""===p||"auto"===p)&&("width"===a||"height"===a?(_=te(t,a,r),f="px"):"left"===a||"top"===a?(_=Z(t,a,r),f="px"):(_="opacity"!==a?0:1,f="")),g=d&&"="===c.charAt(1),g?(u=parseInt(c.charAt(0)+"1",10),c=c.substr(2),u*=parseFloat(c),m=c.replace(y,"")):(u=parseFloat(c),m=d?c.substr((u+"").length)||"":""),""===m&&(m=a in s?s[a]:f),c=u||0===u?(g?u+_:u)+m:e[a],f!==m&&""!==m&&(u||0===u)&&(_||0===_)&&(_=$(t,a,_,f),"%"===m?(_/=$(t,a,100,"%")/100,e.strictUnits!==!0&&(p=_+"%")):"em"===m?_/=$(t,a,1,"em"):(u=$(t,a,u,m),m="px"),g&&(u||0===u)&&(c=u+_+m)),g&&(u+=_),!_&&0!==_||!u&&0!==u?void 0!==v[a]&&(c||"NaN"!=c+""&&null!=c)?(i=new pe(v,a,u||_||0,0,i,-1,a,!1,0,p,c),i.xs0="none"!==c||"display"!==a&&-1===a.indexOf("Style")?c:p):j("invalid "+a+" tween value: "+e[a]):(i=new pe(v,a,_,u-_,i,0,a,l!==!1&&("px"===m||"zIndex"===a),0,p,c),i.xs0=m)):i=ce(v,a,p,c,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},h.setRatio=function(t){var e,i,s,r=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;r;){if(e=r.c*t+r.s,r.r?e=e>0?0|e+.5:0|e-.5:n>e&&e>-n&&(e=0),r.type)if(1===r.type)if(s=r.l,2===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;)2!==r.type?r.t[r.p]=r.e:r.setRatio(t),r=r._next},h._enableTransforms=function(t){this._transformType=t||3===this._transformType?3:2,this._transform=this._transform||be(this._target,r,!0)},h._linkCSSP=function(t,e,i,s){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,s=!0),i?i._next=t:s||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,s,r,n=e;if(e.autoAlpha||e.alpha){n={};for(s in e)n[s]=e[s];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(r=i.xfirst,r&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var De=function(t,e,i){var s,r,n,a;if(t.slice)for(r=t.length;--r>-1;)De(t[r],e,i);else for(s=t.childNodes,r=s.length;--r>-1;)n=s[r],a=n.type,n.style&&(e.push(Q(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||De(n,e,i)};return a.cascadeTo=function(t,i,s){var r,n,a,o=e.to(t,i,s),h=[o],l=[],_=[],u=[],p=e._internals.reservedProps;for(t=o._targets||o.target,De(t,l,u),o.render(i,!0),De(t,_),o.render(0,!0),o._enabled(!0),r=u.length;--r>-1;)if(n=H(u[r],l[r],_[r]),n.firstMPT){n=n.difs;for(a in s)p[a]&&(n[a]=s[a]);h.push(e.to(u[r],i,n))}return h},t.activate([a]),a},!0),function(){var t=window._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=t.prototype;e._onInitAllProps=function(){for(var t,e,i,s=this._tween,r=s.vars.roundProps instanceof Array?s.vars.roundProps:s.vars.roundProps.split(","),n=r.length,a={},o=s._propLookup.roundProps;--n>-1;)a[r[n]]=1;for(n=r.length;--n>-1;)for(t=r[n],e=s._firstPT;e;)i=e._next,e.pg?e.t._roundProps(a,!0):e.n===t&&(this._add(e.t,t,e.s,e.c),i&&(i._prev=e._prev),e._prev?e._prev._next=i:s._firstPT===e&&(s._firstPT=i),e._next=e._prev=null,s._propLookup[t]=o),e=i;return!1},e._add=function(t,e,i,s){this._addTween(t,e,i,i+s,e,!0),this._overwriteProps.push(e)
	}}(),window._gsDefine.plugin({propName:"attr",API:2,version:"0.2.0",init:function(t,e){var i;if("function"!=typeof t.setAttribute)return!1;this._target=t,this._proxy={};for(i in e)this._addTween(this._proxy,i,parseFloat(t.getAttribute(i)),e[i],i)&&this._overwriteProps.push(i);return!0},set:function(t){this._super.setRatio.call(this,t);for(var e,i=this._overwriteProps,s=i.length;--s>-1;)e=i[s],this._target.setAttribute(e,this._proxy[e]+"")}}),window._gsDefine.plugin({propName:"directionalRotation",API:2,version:"0.2.0",init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,s,r,n,a,o,h=e.useRadians===!0?2*Math.PI:360,l=1e-6;for(i in e)"useRadians"!==i&&(o=(e[i]+"").split("_"),s=o[0],r=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof s&&"="===s.charAt(1)?r+parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)):Number(s)||0,a=n-r,o.length&&(s=o.join("_"),-1!==s.indexOf("short")&&(a%=h,a!==a%(h/2)&&(a=0>a?a+h:a-h)),-1!==s.indexOf("_cw")&&0>a?a=(a+9999999999*h)%h-(0|a/h)*h:-1!==s.indexOf("ccw")&&a>0&&(a=(a-9999999999*h)%h-(0|a/h)*h)),(a>l||-l>a)&&(this._addTween(t,i,r,r+a,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,window._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=window.GreenSockGlobals||window,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},p=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},c=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},f=u("Back",c("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),c("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),c("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),c=u,f=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--c>-1;)i=f?Math.random():1/u*c,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),f?s+=Math.random()*r-.5*r:c%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new p(1,1,null),c=u;--c>-1;)a=l[c],o=new p(a.x,a.y,o);this._prev=new p(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t||1,this._p2=e||s,this._p3=this._p2/a*(Math.asin(1/this._p1)||0)},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*a/this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),f},!0)}),function(t){"use strict";var e=t.GreenSockGlobals||t;if(!e.TweenLite){var i,s,r,n,a,o=function(t){var i,s=t.split("."),r=e;for(i=0;s.length>i;i++)r[s[i]]=r=r[s[i]]||{};return r},h=o("com.greensock"),l=1e-10,_=[].slice,u=function(){},p=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),c={},f=function(i,s,r,n){this.sc=c[i]?c[i].sc:[],c[i]=this,this.gsClass=null,this.func=r;var a=[];this.check=function(h){for(var l,_,u,p,m=s.length,d=m;--m>-1;)(l=c[s[m]]||new f(s[m],[])).gsClass?(a[m]=l.gsClass,d--):h&&l.sc.push(this);if(0===d&&r)for(_=("com.greensock."+i).split("."),u=_.pop(),p=o(_.join("."))[u]=this.gsClass=r.apply(r,a),n&&(e[u]=p,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+i.split(".").join("/"),[],function(){return p}):"undefined"!=typeof module&&module.exports&&(module.exports=p)),m=0;this.sc.length>m;m++)this.sc[m].check()},this.check(!0)},m=t._gsDefine=function(t,e,i,s){return new f(t,e,i,s)},d=h._class=function(t,e,i){return e=e||function(){},m(t,[],function(){return e},i),e};m.globals=e;var g=[0,0,1,1],v=[],y=d("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?g.concat(e):g},!0),T=y.map={},w=y.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?d("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],T[n+"."+o]=T[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(r=y.prototype,r._calcEnd=!1,r.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},i=["Linear","Quad","Cubic","Quart","Quint,Strong"],s=i.length;--s>-1;)r=i[s]+",Power"+s,w(new y(null,null,1,s),r,"easeOut",!0),w(new y(null,null,2,s),r,"easeIn"+(0===s?",easeNone":"")),w(new y(null,null,3,s),r,"easeInOut");T.linear=h.easing.Linear.easeIn,T.swing=h.easing.Quad.easeInOut;var x=d("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});r=x.prototype,r.addEventListener=function(t,e,i,s,r){r=r||0;var o,h,l=this._listeners[t],_=0;for(null==l&&(this._listeners[t]=l=[]),h=l.length;--h>-1;)o=l[h],o.c===e&&o.s===i?l.splice(h,1):0===_&&r>o.pr&&(_=h+1);l.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==n||a||n.wake()},r.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},r.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i)};var b=t.requestAnimationFrame,P=t.cancelAnimationFrame,S=Date.now||function(){return(new Date).getTime()},k=S();for(i=["ms","moz","webkit","o"],s=i.length;--s>-1&&!b;)b=t[i[s]+"RequestAnimationFrame"],P=t[i[s]+"CancelAnimationFrame"]||t[i[s]+"CancelRequestAnimationFrame"];d("Ticker",function(t,e){var i,s,r,o,h,l=this,_=S(),p=e!==!1&&b,c=function(t){k=S(),l.time=(k-_)/1e3;var e,n=l.time-h;(!i||n>0||t===!0)&&(l.frame++,h+=n+(n>=o?.004:o-n),e=!0),t!==!0&&(r=s(c)),e&&l.dispatchEvent("tick")};x.call(l),l.time=l.frame=0,l.tick=function(){c(!0)},l.sleep=function(){null!=r&&(p&&P?P(r):clearTimeout(r),s=u,r=null,l===n&&(a=!1))},l.wake=function(){null!==r&&l.sleep(),s=0===i?u:p&&b?b:function(t){return setTimeout(t,0|1e3*(h-l.time)+1)},l===n&&(a=!0),c(2)},l.fps=function(t){return arguments.length?(i=t,o=1/(i||60),h=this.time+o,l.wake(),void 0):i},l.useRAF=function(t){return arguments.length?(l.sleep(),p=t,l.fps(i),void 0):p},l.fps(t),setTimeout(function(){p&&(!r||5>l.frame)&&l.useRAF(!1)},1500)}),r=h.Ticker.prototype=new h.events.EventDispatcher,r.constructor=h.Ticker;var R=d("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,U){a||n.wake();var i=this.vars.useFrames?z:U;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});n=R.ticker=new h.Ticker,r=R.prototype,r._dirty=r._gc=r._initted=r._paused=!1,r._totalTime=r._time=0,r._rawPrevTime=-1,r._next=r._last=r._onUpdate=r._timeline=r.timeline=null,r._paused=!1;var A=function(){a&&S()-k>2e3&&n.wake(),setTimeout(A,2e3)};A(),r.play=function(t,e){return arguments.length&&this.seek(t,e),this.reversed(!1).paused(!1)},r.pause=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!0)},r.resume=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!1)},r.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},r.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},r.reverse=function(t,e){return arguments.length&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},r.render=function(){},r.invalidate=function(){return this},r.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},r._enabled=function(t,e){return a||n.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},r._kill=function(){return this._enabled(!1,!1)},r.kill=function(t,e){return this._kill(t,e),this},r._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},r._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},r.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=p(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},r.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},r.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},r.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},r.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},r.totalTime=function(t,e,i){if(a||n.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&this.render(t,e,!1)}return this},r.progress=r.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},r.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},r.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||l,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},r.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},r.paused=function(t){if(!arguments.length)return this._paused;if(t!=this._paused&&this._timeline){a||t||n.wake();var e=this._timeline,i=e.rawTime(),s=i-this._pauseTime;!t&&e.smoothChildTiming&&(this._startTime+=s,this._uncache(!1)),this._pauseTime=t?i:null,this._paused=t,this._active=this.isActive(),!t&&0!==s&&this._initted&&this.duration()&&this.render(e.smoothChildTiming?this._totalTime:(i-this._startTime)/this._timeScale,!0,!0)}return this._gc&&!t&&this._enabled(!0,!1),this};var C=d("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});r=C.prototype=new R,r.constructor=C,r.kill()._gc=!1,r._first=r._last=null,r._sortChildren=!1,r.add=r.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._timeline&&this._uncache(!0),this},r._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t.timeline=null,t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),this._timeline&&this._uncache(!0)),this},r.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},r.rawTime=function(){return a||n.wake(),this._totalTime};var O=d("TweenLite",function(e,i,s){if(R.call(this,i,s),this.render=O.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:O.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),h=this.vars.overwrite;if(this._overwrite=h=null==h?X[O.defaultOverwrite]:"number"==typeof h?h>>0:X[h],(o||e instanceof Array||e.push&&p(e))&&"number"!=typeof e[0])for(this._targets=a=_.call(e,0),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(_.call(n,0))):(this._siblings[r]=Y(n,this,!1),1===h&&this._siblings[r].length>1&&j(n,this,null,1,this._siblings[r])):(n=a[r--]=O.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=Y(e,this,!1),1===h&&this._siblings.length>1&&j(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&this.render(-this._delay,!1,!0)},!0),D=function(e){return e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},M=function(t,e){var i,s={};for(i in t)L[i]||i in e&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!E[i]||E[i]&&E[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};r=O.prototype=new R,r.constructor=O,r.kill()._gc=!1,r.ratio=0,r._firstPT=r._targets=r._overwrittenProps=r._startAt=null,r._notifyPluginsOfEnabled=!1,O.version="1.11.5",O.defaultEase=r._ease=new y(null,null,1,1),O.defaultOverwrite="auto",O.ticker=n,O.autoSleep=!0,O.selector=t.$||t.jQuery||function(e){return t.$?(O.selector=t.$,t.$(e)):t.document?t.document.getElementById("#"===e.charAt(0)?e.substr(1):e):e};var I=O._internals={isArray:p,isSelector:D},E=O._plugins={},N=O._tweenLookup={},F=0,L=I.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1},X={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},z=R._rootFramesTimeline=new C,U=R._rootTimeline=new C;U._startTime=n.time,z._startTime=n.frame,U._active=z._active=!0,R._updateRoot=function(){if(U.render((n.time-U._startTime)*U._timeScale,!1,!1),z.render((n.frame-z._startTime)*z._timeScale,!1,!1),!(n.frame%120)){var t,e,i;for(i in N){for(e=N[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete N[i]}if(i=U._first,(!i||i._paused)&&O.autoSleep&&!z._first&&1===n._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||n.sleep()}}},n.addEventListener("tick",R._updateRoot);var Y=function(t,e,i){var s,r,n=t._gsTweenID;if(N[n||(t._gsTweenID=n="t"+F++)]||(N[n]={target:t,tweens:[]}),e&&(s=N[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return N[n].tweens},j=function(t,e,i,s,r){var n,a,o,h;if(1===s||s>=4){for(h=r.length,n=0;h>n;n++)if((o=r[n])!==e)o._gc||o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var _,u=e._startTime+l,p=[],c=0,f=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(_=_||B(e,0,f),0===B(o,_,f)&&(p[c++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((f||!o._initted)&&2e-10>=u-o._startTime||(p[c++]=o)));for(n=c;--n>-1;)o=p[n],2===s&&o._kill(i,t)&&(a=!0),(2!==s||!o._firstPT&&o._initted)&&o._enabled(!1,!1)&&(a=!0);return a},B=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*l>n-e?l:(n+=t.totalDuration()/t._timeScale/r)>e+l?0:n-e-l};r._init=function(){var t,e,i,s,r=this.vars,n=this._overwrittenProps,a=this._duration,o=r.immediateRender,h=r.ease;if(r.startAt){if(this._startAt&&this._startAt.render(-1,!0),r.startAt.overwrite=0,r.startAt.immediateRender=!0,this._startAt=O.to(this.target,0,r.startAt),o)if(this._time>0)this._startAt=null;else if(0!==a)return}else if(r.runBackwards&&0!==a)if(this._startAt)this._startAt.render(-1,!0),this._startAt=null;else{i={};for(s in r)L[s]&&"autoCSS"!==s||(i[s]=r[s]);if(i.overwrite=0,i.data="isFromStart",this._startAt=O.to(this.target,0,i),r.immediateRender){if(0===this._time)return}else this._startAt.render(-1,!0)}if(this._ease=h?h instanceof y?r.easeParams instanceof Array?h.config.apply(h,r.easeParams):h:"function"==typeof h?new y(h,r.easeParams):T[h]||O.defaultEase:O.defaultEase,this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],n?n[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,n);if(e&&O._onPluginEvent("_onInitAllProps",this),n&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),r.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=r.onUpdate,this._initted=!0},r._initProps=function(e,i,s,r){var n,a,o,h,l,_;if(null==e)return!1;this.vars.css||e.style&&e!==t&&e.nodeType&&E.css&&this.vars.autoCSS!==!1&&M(this.vars,e);for(n in this.vars){if(_=this.vars[n],L[n])_&&(_ instanceof Array||_.push&&p(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(E[n]&&(h=new E[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=l={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:h._priority},a=h._overwriteProps.length;--a>-1;)i[h._overwriteProps[a]]=this._firstPT;(h._priority||h._onInitAllProps)&&(o=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=l={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},l.s=l.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),l.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-l.s||0;l&&l._next&&(l._next._prev=l)}return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&j(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):o},r.render=function(t,e,i){var s,r,n,a,o=this._time,h=this._duration;if(t>=h)this._totalTime=this._time=h,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete"),0===h&&(a=this._rawPrevTime,(0===t||0>a||a===l)&&a!==t&&(i=!0,a>l&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||0===a?t:l);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===h&&this._rawPrevTime>l)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===h&&(this._rawPrevTime>=0&&(i=!0),this._rawPrevTime=a=!e||t||0===this._rawPrevTime?t:l)):this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var _=t/h,u=this._easeType,p=this._easePower;(1===u||3===u&&_>=.5)&&(_=1-_),3===u&&(_*=2),1===p?_*=_:2===p?_*=_*_:3===p?_*=_*_*_:4===p&&(_*=_*_*_*_),this.ratio=1===u?1-_:2===u?_:.5>t/h?_/2:1-_/2}else this.ratio=this._ease.getRatio(t/h);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;this._time&&!s?this.ratio=this._ease.getRatio(this._time/h):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===h)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||v))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||v)),r&&(this._gc||(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||v),0===h&&this._rawPrevTime===l&&a!==l&&(this._rawPrevTime=0)))}},r._kill=function(t,e){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:O.selector(e)||e;var i,s,r,n,a,o,h,l;if((p(e)||D(e))&&"number"!=typeof e[0])for(i=e.length;--i>-1;)this._kill(t,e[i])&&(o=!0);else{if(this._targets){for(i=this._targets.length;--i>-1;)if(e===this._targets[i]){a=this._propLookup[i]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[i]=t?this._overwrittenProps[i]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){h=t||a,l=t!==s&&"all"!==s&&t!==a&&("object"!=typeof t||!t._tempKill);for(r in h)(n=a[r])&&(n.pg&&n.t._kill(h)&&(o=!0),n.pg&&0!==n.t._overwriteProps.length||(n._prev?n._prev._next=n._next:n===this._firstPT&&(this._firstPT=n._next),n._next&&(n._next._prev=n._prev),n._next=n._prev=null),delete a[r]),l&&(s[r]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return o},r.invalidate=function(){return this._notifyPluginsOfEnabled&&O._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._startAt=null,this._initted=this._active=this._notifyPluginsOfEnabled=!1,this._propLookup=this._targets?{}:[],this},r._enabled=function(t,e){if(a||n.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=Y(s[i],this,!0);else this._siblings=Y(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?O._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},O.to=function(t,e,i){return new O(t,e,i)},O.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new O(t,e,i)},O.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new O(t,e,s)},O.delayedCall=function(t,e,i,s,r){return new O(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:r,overwrite:0})},O.set=function(t,e){return new O(t,0,e)},O.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:O.selector(t)||t;var i,s,r,n;if((p(t)||D(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(O.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=Y(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},O.killTweensOf=O.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=O.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var q=d("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=q.prototype},!0);if(r=q.prototype,q.version="1.10.1",q.API=2,r._firstPT=null,r._addTween=function(t,e,i,s,r,n){var a,o;return null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))?(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o),o):void 0},r.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=0|e+(e>0?.5:-.5):s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},r._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},r._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},O._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},q.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===q.API&&(E[(new t[e])._propName]=t[e]);return!0},m.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=d("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){q.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new q(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,q.activate([a]),a},i=t._gsQueue){for(s=0;i.length>s;s++)i[s]();for(r in c)c[r].func||t.console.log("GSAP encountered missing dependency: com.greensock."+r)}a=!1}}(window);
	
	
	/*
	panr - v0.0.1 by Robert Bue (@robert_bue)
	*/
	;(function ( $, window, document, undefined ) {
	// Create the defaults once
				
	var pluginName = "panr",
		defaults = {
		sensitivity: 10,
		moveTarget: "parent",
		scale: false,
		scaleOnHover: false,
		scaleTo: 1.1,
		scaleDuration: .28,
		panY: true,
		panX: true,
		panDuration: 1.25,
		resetPanOnMouseLeave: true,
		onEnter: function(){},
		onLeave: function(){}
	};
	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		//console.log(element);
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype = {
		init: function () {
		if ( Modernizr.touch ) {
			return;
		}
		// call them like so: this.yourOtherFunction(this.element, this.settings).
		//console.log(this.settings);
		var settings = this.settings,
		target = $(this.element),
		w = target.width(),
		targetWidth = target.width() - settings.sensitivity,
		cx = (w-targetWidth)/targetWidth,
		x,
		y,
		panVars,
		xPanVars,
		yPanVars,
		mouseleaveVars;
		//console.log(cx);
		if ( settings.scale || (!settings.scaleOnHover && settings.scale) ) {
			TweenMax.set(target, { scale: settings.scaleTo });
		}
		// If no target provided we'll use the hovered element
		if ( !settings.moveTarget ) {
			settings.moveTarget = $(this.element);
		}
		if ( settings.moveTarget == "parent" ) {
			settings.moveTarget = $(this.element).parent();
		}
		if ( settings.moveTarget == "parent parent" ) {
			settings.moveTarget = $(this.element).parent().parent();
		}
		if ( settings.moveTarget == "parent parent parent" ) {
			settings.moveTarget = $(this.element).parent().parent().parent();
		}
	
		settings.moveTarget.on('mousemove', function(e){
			x = e.pageX - target.offset().left; // mouse x coordinate relative to the container
			y = e.pageY - target.offset().top; // mouse x coordinate relative to the container
			if ( settings.panX ) {
				xPanVars = { x: -cx*x };
			}
			if ( settings.panY ) {
				yPanVars = { y: -cx*y };
			}
			panVars = $.extend({}, xPanVars, yPanVars);
	
			// Pan element
			TweenMax.to(target, settings.panDuration, panVars);
		});
		// On mouseover
		settings.moveTarget.on('mouseenter', function(e){
			// Scale up element
			TweenMax.to(target, settings.scaleDuration, { scale: settings.scaleTo });
			settings.onEnter(target);
		});
		if ( !settings.scale || (!settings.scaleOnHover && !settings.scale) ) {
			mouseleaveVars = { scale: 1.005, x: 0, y: 0 };
		} else {
		
		if ( settings.resetPanOnMouseLeave ) {
			mouseleaveVars = { x: 0, y: 0 };
		}
		}
		settings.moveTarget.on('mouseleave', function(e){
		// Reset element
		TweenMax.to(target, .35, mouseleaveVars );
		settings.onLeave(target);
		});
		}
	};
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
			$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
		}
	  });
	};
	})( jQuery, window, document ); 

}

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)