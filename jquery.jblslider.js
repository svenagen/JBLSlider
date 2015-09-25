/* JBL Slider by Joel Lisenby 
Responsive slider with partial cropping for safe area support.
*/

// requestAnimationFrame shim (https://gist.github.com/paulirish/1579671)
jQuery(document).ready(function($) {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
	};
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
	};
}());

jQuery(document).ready(function($) {
$.fn.jblSlider = function( options ) {
	var jbl = this;
	
	jbl.animating = false;
	jbl.animationFrame = null;
	jbl.height = 0;
	jbl.options = {};
	jbl.slider = $(jbl);
	jbl.slides = {};
	jbl.slidesInterval = null;
	jbl.current = 0;
	jbl.next = 0;
	jbl.timeElapsed = 0;
	jbl.timeStart = 0;
	
	jbl.init = function(element) {
		jbl.options = $.extend({
			safe_area: 640,
			duration: 1000,
			delay: 5000,
			resume: 20000
		}, options);
		
		jbl.height = parseFloat($(jbl).css('height'));;
		
		jbl.bgWidth();
		
		jbl.slides = $(jbl).children('.slide');
		jbl.loadImages();
		
		if(jbl.slides.length > 1) {
			jbl.play();
			jbl.nav();
		}
		
		$(window).resize(function() {
			jbl.bgWidth();
		});
	};
	
	jbl.loadImages = function() {
		var cnt = jbl.slides.length;
		
		for(i = 0; i < cnt - 1; i++) {
			var src = $(jbl.slides[i]).css('background-image').replace('url(','').replace(')','');
			var img = new Image();
			img.src = src;
		}
	};
	
	jbl.bgWidth = function() {
		var current_width = $(jbl).innerWidth();
		var p = current_width / jbl.options.safe_area;
		var nw = jbl.innerWidth();
		var nh = jbl.innerHeight();
		if(p <= 1) {
			nw = jbl.innerWidth() * p;
			nh = jbl.height * p;
			$(jbl).css('height', nh +'px');
			$('.slide').css('background-size', 'auto '+ nh +'px');
		} else {
			$(jbl).css('height', nh +'px');
			$('.slide').css('background-size', 'cover');
		}
	};
	
	jbl.nav = function() {
		$(jbl).append('<a href="#" class="nav-prev"></a><a href="#" class="nav-next"></a>');
		$('.nav-prev').click(function(e) {
			var cnt = jbl.slides.length;
			var slide = (cnt == 0 ? 0 : (jbl.current > 0 ? jbl.current - 1 : cnt - 1) );
			jbl.pause();
			setTimeout(jbl.play, jbl.options.resume);
			jbl.nextSlide(slide);
			(e.preventDefault) ? e.preventDefault() : e.returnValue = false;
		});
		$('.nav-next').click(function(e) {
			jbl.pause();
			setTimeout(jbl.play, jbl.options.resume);
			jbl.nextSlide();
			(e.preventDefault) ? e.preventDefault() : e.returnValue = false;
		});
	};
	
	jbl.play = function() {
		clearInterval(jbl.slidesInterval);
		jbl.slidesInterval = setInterval(function() {
			jbl.nextSlide();
		}, jbl.options.delay);
	};
	
	jbl.pause = function() {
		clearInterval(jbl.slidesInterval);
	};
	
	jbl.nextSlide = function(next) {
		var cnt = jbl.slides.length;
		if(next === undefined) {
			jbl.next = (cnt > 1 ? (jbl.current < cnt - 1 ? jbl.current + 1 : 0) : jbl.current);
		} else {
			jbl.next = next;
		}
		
		if(!jbl.animating) {
			jbl.animate();
		}
	};
	
	jbl.animate = function() {
		jbl.animationFrame = requestAnimationFrame(jbl.animate);
		jbl.timeElapsed = 0.0;
		var cnt = jbl.slides.length;
		
		if(jbl.timeStart == 0) {
			jbl.timeStart = new Date().getTime();
		}
		jbl.animating = true;
		var t = new Date().getTime();
		
		jbl.paused = false;
		jbl.timeElapsed = t - jbl.timeStart;
		
		var percent = jbl.timeElapsed / jbl.options.duration;
		jbl.ap = percent > 1.0 ? 1.0 : percent;
		
		jbl.fade();
		if(percent >= 1) {
			$(jbl.slides[jbl.current]).children('span').hide();
		};
		
		$(jbl.slides[jbl.next]).show();
		$(jbl.slides[jbl.next]).children('span').show();
		$(jbl.slides[jbl.current]).css({
			'opacity': jbl.slides[jbl.current].opacity,
			'z-index': 2
		});
		$(jbl.slides[jbl.next]).css({
			'opacity': jbl.slides[jbl.next].opacity,
			'z-index': 3
		});
		
		if(percent >= 1) {
			cancelAnimationFrame(jbl.animationFrame);
			$(jbl.slides[jbl.current]).hide();
			jbl.timeStart = 0;
			jbl.timeElapsed = 0;
			jbl.current = jbl.next;
			jbl.animating = false;
		}
	};
	
	jbl.fade = function() {
		$(jbl.slides[jbl.current]).css('opacity', 1 - jbl.ap);
		$(jbl.slides[jbl.next]).css('opacity', 1 * jbl.ap);
	}
	
	return jbl.each(function() {
		jbl.init(jbl);
	});
};
}( jQuery ));