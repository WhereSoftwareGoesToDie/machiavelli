jQuery(document).ready(function($){
	
	var $container = $('.posts-container')
	
	if($container.parent().hasClass('masonry')) { 
		
		$container.find('article').addClass('masonry-blog-item');
		$container.find('article').prepend('<span class="bottom-line"></span>');
		
		//move the meta to the bottom
		$container.find('article').each(function(){
			
			var $metaClone = $(this).find('.post-meta').clone();

			$(this).find('.post-meta').remove();

			$(this).find('.content-inner').after($metaClone);
			
		});
	
	
		if($container.parent().hasClass('masonry') && $container.parent().hasClass('full-width-content')){
			$container.parent().wrap('<div class="full-width-content blog-fullwidth-wrap"> </div>').removeClass('full-width-content').css({'margin-left':'0','width':'auto'});
			$container.parent().parents('.full-width-content').css({
				'padding' : '0px 0.6% 0px 3.2%'
			});
		}
		
		var $cols = 3;
		var $element = $container;
		
		if($container.find('img').length == 0) $element = $('<img />');
	
		imagesLoaded($element,function(instance){
			
			if($('body').hasClass('mobile') || $('#post-area').hasClass('span_9')) {
				$cols = 2;
			}
			
			$container.isotope({
			   itemSelector: 'article',
			   masonry: { columnWidth: $('#post-area').width() / $cols }
			});
			
			setTimeout(function(){ $container.parent().animate({'opacity': 1},1300); },200);
			
			$(window).trigger('resize')
				
		});
		
		$(window).resize(function(){
			if($('body').hasClass('mobile') || $('#post-area').hasClass('span_9')) {
			   $cols = 2;
		   } else if( $('#post-area').hasClass('full-width-content') || $('#post-area').parent().hasClass('full-width-content') && $('#boxed').length == 0 ){
		   		
		   		var mediaQuerySize; //= getComputedStyle(document.body, ':after').getPropertyValue('content'); 
				var windowSize = $(window).width();
	
				//remove double quotes for FF
				//if (navigator.userAgent.match('MSIE 8') == null) {
				//	mediaQuerySize = mediaQuerySize.replace(/"/g, '');
				///}
				
				
				if(window.innerWidth > 1600){
					mediaQuerySize = 'five';
				} else if(window.innerWidth <= 1600 && window.innerWidth >= 1300){
					mediaQuerySize = 'four';
				} else if(window.innerWidth < 1300 && window.innerWidth >= 990){
					mediaQuerySize = 'three';
				} else if(window.innerWidth < 990 && window.innerWidth >= 470){
					mediaQuerySize = 'two';
				} else if(window.innerWidth < 470){
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
				
				
				switch (mediaQuerySize) {
					case 'five':
						$cols = 5;
					break;
					
					case 'four':
						$cols = 4;
					break;
					
					case 'three':
						$cols = 3;
					break;
					
					case 'two':
						$cols = 2;
					break;
					
					case 'one':
						$cols = 1;
					break;
				}
		   		
			
		   } else {
		   	   $cols = 3;
		   }
		});
		
		$(window).smartresize(function(){
		   $container.isotope({
		      masonry: { columnWidth: $('#post-area').width() / $cols}
		   });
		});
		
    }	
	
});