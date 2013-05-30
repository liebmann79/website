$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if (this.title == this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function() {
		if (this.value == '') {
			this.value = this.title;
		}
	});

	//nav indicator
	var $mainNav = $('#main-nav');
	var $indicator = $mainNav.find('.indicator');
	var $aboutPage = $('#about');
	var $header = $('#header');
	var $map = $('#map-frame');
	var forcedScroll = false;

	$('li', $mainNav).on('mouseenter', function() { // nav indicator
		if ($(window).width() > 1025){
			indicatorPos($(this));
		}
	}).on('mouseleave', function() {
		if ($(window).width() > 1025){
			indicatorPos($mainNav.find('.current'));
		}
	});

	$('a', $mainNav).on('click', function() {
		window.location.hash = $(this).attr('href');
		slidePage(true);
		return false;
	});

	// devices slider in lower resolutions
	$('.devices').each(function() {
		$('.devices-nav a:first', this).addClass('current');
		$('.phone-img:first', this).addClass('current');
	});

	$('.devices-nav a').on('click',function() {
		var idx = $(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		$(this).parents('.devices').find('.phone-img').eq(idx).addClass('current').siblings().removeClass('current');
		return false;
	});

    $('a.move-to-first-page').on('click', function() {
        $('.slider').trigger('next');
    });

	$(window).on('load',function() {
		slidePage(true);

		$('.slider').carouFredSel({
			auto:false,
			responsive:true,
			width:"100%",
			items:1,
			scroll: {
				fx: "directscroll"
			},
			next: '.carousel .next',
			pagination: {
				container: '#intro .thumbs-i',
				anchorBuilder: false,
                onBefore: function() {
                    window.location.hash = '#/intro';
                    slidePage(true);
		            return false;
                }
			},
			onCreate: function() {
				$('.carousel').addClass('loaded');
			}
		});

		$map.attr('src', $map.data("src"));
	}).on('scroll', function() {
		if (!forcedScroll) {
			var offT = $(window).scrollTop();
			var visibleArea = $(window).height()*0.6;

			$('.section:not(#about)').each(function() {
				if ($(this).offset().top >= (offT-visibleArea)) {
					var newCurrent = $mainNav.find('a[href="#/'+$(this).attr('id')+'"]').parent();
					newCurrent.addClass('current').siblings().removeClass('current');
					indicatorPos(newCurrent);
					window.location.hash = '#/'+$(this).attr('id');
					return false;
				}
			});
		}
	});

	function indicatorPos(elem) {
		$indicator.css({'left': elem.position().left, "width": elem.width()});
	}

	function slidePage(triggerSlide) {
		var duration = 200;
		var pageString = window.location.hash.slice(2);
		if (pageString == '') {
            // no hash, root of page, don't auto scroll down
            indicatorPos($mainNav.find('.current'));
			return;
        }

		if ($aboutPage.is('.visible')){
			if (pageString == "about") {
				return;
			}

			// hide #about
			var ah = $aboutPage.height();
			$("body").removeAttr('style');
			$aboutPage.removeClass('visible');
			$header.removeClass('black');
			$aboutPage.slideUp(duration*2, function() {
				forcedScroll = false;
			});
		}

		if (pageString != 'about') {
			var page = $('#'+pageString);
			$mainNav.find('a[href="#/'+pageString+'"]').parent().addClass('current').siblings().removeClass('current');
			indicatorPos($mainNav.find('.current'));
			if (triggerSlide) {
				forcedScroll = true;
				$('body, html').animate({scrollTop: page.offset().top}, duration*4, function() {
					forcedScroll = false;
				});
			}
		} else {
			// show #about
			forcedScroll = true;
			$mainNav.find('a[href="#/about"]').parent().addClass('current').siblings().removeClass('current');
			indicatorPos($mainNav.find('.current'));
			$header.addClass('black');
			$aboutPage.slideDown(duration*4, function() {
				$("body").css('overflow', 'hidden');
				$aboutPage.addClass('visible');
			});
		}
	}
});
