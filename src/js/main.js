//------------------
// menu button logic
//------------------

// $(document).ready(function() {

// 	var $menuIcon = document.getElementsByClassName('logo-link')[0],
// 		$navBack = document.getElementsByClassName('nav-background')[0],
// 		$offCanva = document.getElementsByClassName('nav-wrapper')[0],
// 		$siteWrap = document.getElementsByClassName('site-wrapper')[0];

// 	$menuIcon.addEventListener('click', function() {
// 		toggleClass($menuIcon, 'open');
// 		toggleClass($navBack, 'open');
// 		toggleClass($offCanva, 'open');
// 		toggleClass($siteWrap, 'open');
// 	}, false);

// 	$navBack.addEventListener('click', function() {
// 		toggleClass($menuIcon, 'open');
// 		toggleClass($navBack, 'open');
// 		toggleClass($offCanva, 'open');
// 		toggleClass($siteWrap, 'open');
// 	}, false);

// 	$menuIcon.addEventListener('mouseenter', function() {
// 		addClass($menuIcon, 'hover');
// 		addClass($navBack, 'hover');
// 	});

// 	$menuIcon.addEventListener('mouseleave', function() {
// 		removeClass($menuIcon, 'hover');
// 		removeClass($navBack, 'hover');
// 	});

// 	function addClass(element, className) {
// 		element.className += " " + className;
// 	}

// 	function removeClass(element, className) {
// 		// capture surrounding whitespace characters
// 		var classNameRegEx = new RegExp("\\s*" + className + "\\s*");
// 		element.className = element.className.replace(classNameRegEx, " ");
// 	}

// 	function toggleClass(element, className) {
// 		if (!element || !className) {
// 			return;
// 		}

// 		if (element.className.indexOf(className) === -1) {
// 			addClass(element, className);
// 		} else {
// 			removeClass(element, className);
// 		}
// 	}
// });


//-----------------------------
// add visibility class on load
//-----------------------------

(setTimeout(function(){
	$('.site-wrapper').addClass('load');
}, 200));


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
	$('.cover').css('height', windowsHeight - 240 + 'px');
}

setDimensions();

// when resizing the site adjust section heights
$(window).resize(function() {
	setDimensions();
});




function bLazy() {
	Blazy ({
		offset: 1500,
		success: function(ele){
			// success
			function viewLazy() {
				$('.b-lazy.b-loaded').animate({ opacity: 1 }, 350, 'swing');
				return false;
			}
			viewLazy();
		},
		error: function(ele, msg){
			if(msg === 'missing') {
				// data-src is missing
			}
			else if(msg === 'invalid') {
				// data-src is invalid
			}
		}
	});
}

$(document).ready(function() {
	// initialize
	var Blazy = bLazy();
});


//----------------
// infinite scroll
//----------------

(function($) {
	$(document).ready(function() {

		var ias = jQuery.ias({
			container:  '#posts',
			item:       '.post',
			pagination: '#pagination',
			next:       '.next'
		});

		ias.extension(new IASSpinnerExtension({ html: '<div class="spinner load"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>', }));
		ias.extension(new IASNoneLeftExtension({ html: '<div class="spinner">∎</div><script>footer = document.getElementById("footer");try { footer.style.opacity = "1"; footer.style.height = "280px"; } catch(e) {"waiting for footer"}</script>' }));

		ias.on('loaded', function(data, items) {
			var Bphrase = new bPhrase();

			var $items = $(items);
			console.log('Loaded ' + $items.length + ' items from server');
		});

	 });

}(jQuery));


//--------------------
// font load detection
//--------------------

var tiempos_headline = new FontFaceObserver('Tiempos Headline');
var tiempos_text = new FontFaceObserver('Tiempos Text');


//-------------
// svg coloring
//-------------

$(document).ready(function() {

	$('img[src$=".svg"]').each(function() {

		var $img = jQuery(this);
		var imgURL = $img.attr('src');
		var attributes = $img.prop("attributes");

		$.get(imgURL, function(data) {
			// get the SVG tag & ignore remainder
			var $svg = jQuery(data).find('svg');

			// remove any invalid XML tags
			$svg = $svg.removeAttr('xmlns:a');

			// loop through image attributes and apply on SVG
			$.each(attributes, function() {
				$svg.attr(this.name, this.value);
			});

			// replace image with SVG
			$img.replaceWith($svg);
		}, 'xml');
	});
});


//----------------------------------
// prevent single word lines of text
//----------------------------------


var breakPhrase = function(e){
	var n = [],
		r = [];
	n = e.length?e:n.concat(e), Array.prototype.map.call(n, function(e) {
		var n = String(e.innerHTML);
		n = n.replace(/\s+/g," ").replace(/^\s|\s$/g,""),
			r.push(n?e.innerHTML = n.replace(new RegExp("((?:[^ ]* ){" + ((n.match(/\s/g)||0).length-1) + "}[^ ]*) "), "$1&nbsp;"):void 0);
	});
};


bPhrase = function() {
	// calculate non-breaking whitespace
	phrase = $('.phrase').add('.caption p').add('.media-text p');

	if(phrase.length != 0) {
		breakPhrase(phrase);
		$(phrase).removeClass("phrase");
	}
};

$(document).ready(function() {
	var Bphrase = new bPhrase();
});


//----------------------------
// accomodate iOS touch events
//----------------------------

if ('ontouchstart' in document) {
	$('.no-touch').removeClass('no-touch');
}


//-----------------
// detect ul length
//-----------------


$(document).ready(function(){

	$('.taxonomy-list ul').each(function() {
		var listLength = $(this).children().size();
		if(listLength >= '20'){
			$(this).addClass('multi-col');
		}
	});

	var letList = { letters: [] };  // object to collect the li elements and a list of initial letters
	$('.taxonomy-list .multi-col').children('li').each(function(){
		var itmLetter = $(this).children('a').first().text().substring(0,1).toUpperCase();
		if (!(itmLetter in letList)) {
			letList[itmLetter] = [];
			letList.letters.push(itmLetter);
		}
		letList[itmLetter].push($(this));  // add li element to the letter's array in the letList object
	});

	letList.letters.sort();  // sort all available letters to iterate over them

	$.each(letList.letters, function(i, letter){

		letList[letter].sort(function(a, b) {
			return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());  //sort li elements of one letter
		});

		var ul = $('<ul/>');  // create new dom element and add li elements
		$.each(letList[letter], function(idx, itm){
			ul.append(itm);
		});

		var cap = $(ul).prepend($('<li/>').attr('name', letter.toLowerCase()).addClass('list-title').html(letter));
		console.log(cap);
		$('.taxonomy-list .multi-col').append(cap);  // add the list to a new li

	});

});


//-----------------
// new page control
//-----------------


Page = function() {

	// word breaking
	if (typeof bPhrase == 'function') { var Bphrase = new bPhrase(); }

	// lazy load images
	if (typeof bLazy == 'function') { var Blazy = new bLazy(); }

	// tiled layout
	if (typeof Iso == 'function') { var iso = new Iso(); }

};


//---------------------
// hanging punctutation
//---------------------

$(document).ready(function(){

	$.holdReady(true);
	$.getScript("/js/vendor/hanging-punctuation.min.js", function() {
		$.holdReady(false);
	});

});
