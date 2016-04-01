$(document).ready(function() {

	var $menuIcon = document.getElementsByClassName('menu-icon')[0],
		$offCanva = document.getElementsByClassName('menu')[0],
		$siteWrap = document.getElementsByClassName('site-wrapper')[0];

	$menuIcon.addEventListener('click', function() {
		toggleClass($menuIcon, 'close');
		toggleClass($offCanva, 'toggled');
		toggleClass($siteWrap, 'open');
	}, false);

	$menuIcon.addEventListener('mouseenter', function() {
		addClass($menuIcon, 'hover');
	});

	$menuIcon.addEventListener('mouseleave', function() {
		removeClass($menuIcon, 'hover');
	});

	function addClass(element, className) {
		element.className += " " + className;
	}

	function removeClass(element, className) {
		// capture any surrounding space characters to prevent repeated
		// additions and removals from leaving lots of spaces.
		var classNameRegEx = new RegExp("\\s*" + className + "\\s*");
		element.className = element.className.replace(classNameRegEx, " ");
	}

	function toggleClass(element, className) {
		if (!element || !className) {
			return;
		}

		if (element.className.indexOf(className) === -1) {
			addClass(element, className);
		} else {
			removeClass(element, className);
		}
	}

	// open Twitter/share in a Pop-Up
	var $popup = document.getElementsByClassName('popup')[0];
	if (!$popup) {
		return;
	}
	$popup.addEventListener('click', function(e) {
		e.preventDefault()
		var width  = 575,
			height = 400,
			left   = (document.documentElement.clientWidth  - width)  / 2,
			top    = (document.documentElement.clientHeight - height) / 2,
			url    = this.href,
			opts   = 'status=1' +
					 ',width='  + width  +
					 ',height=' + height +
					 ',top='    + top    +
					 ',left='   + left;

		window.open(url, 'twitter', opts);
		return false;
	})

});

//-----------------------------
// add visibility class on load
//-----------------------------

function loadViz(){
	$(".site-wrapper").addClass("load");
}

window.addEventListener ? 
window.addEventListener("load",loadViz,false) : 
window.attachEvent && window.attachEvent("onload",loadViz);


//-----------------------------
// in-page anchor smooth scroll
//-----------------------------

// $(function() {
//   $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });
// });


//-----------------------------
// in-page anchor scroll offset
//-----------------------------

// function to apply page scroll offset
function offsetAnchor() {
	if(location.hash.length !== 0) {
		window.scrollTo(window.scrollX, window.scrollY - 50);
	}
}

// capture hash changes while on page
$(window).on("hashchange", function () {
	offsetAnchor();
});

// navigate to page with a hash also uses offset
window.setTimeout(function() {
	offsetAnchor();
}, 1);


//-------------------------------
// article cover image dimensions
//-------------------------------

function setDimensions(){
	var windowsHeight = $(window).height();
	$('.cover').css('height', windowsHeight * 0.8 + 'px');
}

setDimensions();

//when resizing the site, we adjust the heights of the sections
$(window).resize(function() {
	setDimensions();
});

$(document).ready(function() {
	;(function() {
			// Initialize
			var bLazy = new Blazy({
				offset: 1000
			});
		})();
});

//--------
// GALLERY
//--------

$('.gallery').flickity({
    arrowShape: {
      x0: 25,
      x1: 59, y1: 60,
      x2: 65, y2: 60,
      x3: 29
    },
    cellAlign: 'left',
    contain: true,
    imagesLoaded: true,
    lazyLoad : 3
});


//-------------
// IMPRINT TABS
//-------------

$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');
 
        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});
