if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
		document.body.addEventListener('gesturestart', function() {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}
(function(){
  // if firefox 3.5+, hide content till load (or 3 seconds) to prevent FOUT
  var d = document, e = d.documentElement, s = d.createElement('style');
  if (e.style.MozTransform === ''){ // gecko 1.9.1 inference
    s.textContent = 'body{visibility:hidden}';
    var r = document.getElementsByTagName('script')[0];
    r.parentNode.insertBefore(s, r);
    function f(){ s.parentNode && s.parentNode.removeChild(s); }
    addEventListener('load',f,false);
    setTimeout(f,3000); 
  }
})();
  
function scrollPage(scrollId) {
	var animSpeed=1200; //animation speed
	var easeType="easeInOutExpo"; //easing type
	if($.browser.webkit){ //webkit browsers do not support animate-html
		$("body").stop().animate({scrollTop: $(scrollId).offset().top}, animSpeed, easeType);
	} else {
		$("html").stop().animate({scrollTop: $(scrollId).offset().top}, animSpeed, easeType);
	}
}

var br = 1024/573;
function adjustBackground(){
	var $window = $(window);
	if($window.width()/$window.height() < br){
		$('body').addClass('portrait');
	}else{
		$('body').removeClass('portrait');
	}
}

$(document).ready(function() {
	
	adjustBackground();
	$(window).load(function() { 
		$("header h2").fadeIn(500);
		$("header h2").css({ scale: 0 }); 
		$("html, body").css({ overflow: 'auto' });
		$.cssEase["bounceIn"] = "cubic-bezier(0.2,0.8,0,1.1)";
		$("header h2").transition({ scale: 1 }, 800, "bounceIn");	
	});
	
	
});

		
$(window).resize(function() {		
	var size = $(window).width();	
	if( size > 992) {
		scrollPage("#panel-01");
	}
	adjustBackground();	
});
      
