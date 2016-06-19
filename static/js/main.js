$(document).ready(function() {

	var $menuIcon = document.getElementsByClassName('nav-link')[0],
		$navBack = document.getElementsByClassName('nav-back')[0],
		$offCanva = document.getElementsByClassName('menu')[0],
		$siteWrap = document.getElementsByClassName('site-wrapper')[0];

	$menuIcon.addEventListener('click', function() {
		toggleClass($menuIcon, 'open');
		toggleClass($navBack, 'open');
		toggleClass($offCanva, 'open');
		toggleClass($siteWrap, 'open');
	}, false);

	$navBack.addEventListener('click', function() {
		toggleClass($menuIcon, 'open');
		toggleClass($navBack, 'open');
		toggleClass($offCanva, 'open');
		toggleClass($siteWrap, 'open');
	}, false);

	$menuIcon.addEventListener('mouseenter', function() {
		addClass($menuIcon, 'hover');
		addClass($navBack, 'hover');
	});

	$menuIcon.addEventListener('mouseleave', function() {
		removeClass($menuIcon, 'hover');
		removeClass($navBack, 'hover');
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

(setTimeout(function(){
	$('.site-wrapper').addClass('load');
}, 300));



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
	$('.cover').css('height', windowsHeight * 0.65 + 'px');
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

// $('.gallery').flickity({
// 	// options
// 	cellAlign: 'left',
// 	contain: true,
// 	lazyLoad: 2
// });

//-------------
// IMPRINT TABS
//-------------

$(document).ready(function() {

	if(window.location.href.split('#')[0] == "http://avant.org/imprint/"){

		var currentHashValue = window.location.hash;

		$('.tabs ' + currentHashValue + '-tab').show().siblings().hide();
		$(currentHashValue).parent('li').addClass('active').siblings().removeClass('active');
		$('[href="' + currentHashValue + '-tab"]').parent('li').addClass('active').siblings().removeClass('active');

		$('.tabs .tab-links a').on('click', function(e) {
			var currentRawValue = jQuery(this).attr('href');
			var currentAttrValue = $(currentRawValue.split('-')).get(0);

			window.location.hash = currentAttrValue;

			// Show/Hide Tabs
			$('.tabs ' + currentAttrValue + '-tab').show().siblings().hide();

			// Change/remove current tab to active
			$(this).parent('li').addClass('active').siblings().removeClass('active');

			e.preventDefault();
		});

	}

});


// $(document).ready(function() {
// 	$('.tabs .tab-links a').on('click', function(e)  {
// 		var currentAttrValue = jQuery(this).attr('href');
 
// 		// Show/Hide Tabs
// 		$('.tabs ' + currentAttrValue).show().siblings().hide();
 
// 		// Change/remove current tab to active
// 		$(this).parent('li').addClass('active').siblings().removeClass('active');
 
// 		e.preventDefault();
// 	});
// });

//----------------
// INFINITE SCROLL
//----------------

(function($) {
	$(document).ready(function() {

		var ias = jQuery.ias({
			container:  '#posts',
			item:       '.post',
			pagination: '#pagination',
			next:       '.next'
		});

		ias.extension(new IASSpinnerExtension({ html: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>', }));
		ias.extension(new IASNoneLeftExtension({ html: '<div class="spinner">∎</div><script>footer = document.getElementById("footer");footer.style.display = "block";</script>' }));

	 });
}(jQuery));


//-------------------
// FONT FACE OBSERVER
//-------------------

var tiempos_headline = new FontFaceObserver('Tiempos Headline');
var tiempos_text = new FontFaceObserver('Tiempos Text');

// tiempos_headline.load().then(function () {
// 	console.log('Tiempos Headline available');
// });

// tiempos_text.load().then(function () {
// 	console.log('Tiempos Text available');
// });


//-------------
// LUNAR SEARCH
//-------------

// var index = lunr(function () {
// 	this.pipeline.add(function (token, tokenIndex, tokens) {
// 		// text processing in here
// })

// this.pipeline.after(lunr.stopWordFilter, function (token, tokenIndex, tokens) {
// 		// text processing in here
// 	})
// })

// //I will try and add more comments to this later...
// /*Begin full-screen search overlay toggle*/
// //Note that this requires the element.classList method, which is not supported in IE9. If you need IE9 support, use the classList.js polyfill (https://github.com/eligrey/classList.js/)
// //Full-screen overlay opens via click/touch event or if the user hits "s' on the keyboard. When search is open, this is controlled for so that people can search words with "s" in them
// var searchOverlay = document.querySelector('.search-form');
// var searchButton = document.getElementById('search-button');
// var searchInput = document.getElementById('search-input');
// var closeSearch = document.getElementById('close-search');
// closeSearch.onclick = function() {
// 	if (searchOverlay.classList.contains('open')) {
// 		searchOverlay.classList.remove('open');
// 	}
// }
// window.addEventListener('keyup', function(event) {
// 	var keyPressed = event.keyCode;
// 	if (keyPressed === 83 && searchOverlay.classList.contains('open')) {
// 		return;
// 	} else if (keyPressed === 83) {
// 		searchOverlay.classList.add('open');
// 		if (searchInput.value.length > 0) {
// 			searchInput.value = '';
// 		}
// 		searchInput.focus();
// 	} else if (keyPressed === 27 && searchOverlay.classList.contains('open')) {
// 		searchOverlay.classList.remove('open');
// 	}
// }, true);
// searchButton.addEventListener('click', function(event) {
// 	searchOverlay.classList.toggle('open');
// 	searchInput.focus();
// }, true);
// /*End search overlay toggle*/

// /*Begin Lunr live search*/
// //for more information on lunr.js, go to http://lunrjs.com/
// var searchData;
// var searchInput = document.getElementById('search-input');
// searchInput.addEventListener('keyup', lunrSearch, true);
// window.index = lunr(function() {
// 	this.field('id');
// 	this.field('url');
// 	this.field('title', { boost: 50 });
// 	this.field('excerpt');
// 	this.field('description');
// 	this.field('tag',{ boost: 30});
// 	this.field('content', { boost: 10 });
// //boosting for relevancy is up to you.
// });

// var searchReq = new XMLHttpRequest();
// searchReq.open('GET', '/site-index.json', true);
// searchReq.onload = function() {
// 	if (this.status >= 200 && this.status < 400) {
// 		console.log("Got the site index");
// 		searchData = JSON.parse(this.response);
// 		searchData.forEach(function(obj, index) {
// 			obj['id'] = index;
// 			window.index.add(obj);
// 		});
// 	} else {
// 		console.log("Failed status for site-index.js. Check /static/site-index.json");
// 	}
// }
// searchReq.onerror = function() {
// 	console.log("Error when attempting to load site-index.json.");
// }
// searchReq.send();

// function lunrSearch(event) {
// 	var query = document.querySelector("#search-input").value;
// 	var searchResults = document.querySelector('#search-results');
// 	if (query.length === 0) {
// 		searchResults.innerHTML = '';
// 	}
// 	if ((event.keyCode !== 9) && (query.length > 2)) {
// 		var matches = window.index.search(query);
// 		displayResults(matches);
// 	}
// }

// function displayResults(results) {
// 	var searchResults = document.querySelector('#search-results');
// 	var inputVal = document.querySelector('#search-input').value;
// 	if (results.length) {
// 		searchResults.innerHTML = '';
// 		results.forEach(function(result) {
// 			var item = window.searchData[result.ref];
// 			var section = item.section.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
// 			var appendString = '<li class=\"search-result\"><a href=\"' + item.url + '\"><h5>' + item.title + '</h5></a><p>' + item.description + '</p><div class=\"in-section\">In: ' + section + '</div><ul class=\"tags\"><li><i class=\"icon-tags\"></i></li>';
// 			// var tags = '';
// 			for (var i = 0; i < item.tags.length; i++) {
// 				appendString += '<li><a href=\"/tags/' + item.tags[i] + '\" class=\"tag\">' + item.tags[i] + '</a> ';
// 			}
// 			appendString += '</ul></li>';
// 			searchResults.innerHTML += appendString;
// 		})
// 	} else {
// 		searchResults.innerHTML = '<li class=\"search-result none\">No results found for <span class=\"input-value\">' + inputVal + '</span>.<br/>Please check spelling and spacing.</li>';
// 	}
// }


//------------------
// email input logic
//------------------

function autoUnput(thefield, orig){
	if(orig){
		if(thefield.value == ''){
			thefield.value = orig;
		}
	} else if (thefield.defaultValue==thefield.value){
		thefield.value = "";
	}
}


//-------------
// svg coloring
//-------------

$(document).ready(function() {
    $('img[src$=".svg"]').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('src');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
});
