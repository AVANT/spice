//-----------------------------
// add visibility class on load
//-----------------------------

(setTimeout(function(){
	$('main').addClass('load');
}, 200));


//-------------
// lazy loading
//-------------

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
			container:  '.posts',
			item:       '.post',
			pagination: '#pagination',
			next:       '.next'
		});

		ias.extension(new IASSpinnerExtension({ html: '<div class="spinner load"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>', }));
		ias.extension(new IASNoneLeftExtension({ html: '<div class="spinner">∎</div><script>foot = document.getElementById("foot");try { foot.style.opacity = "1"; foot.style.height = "280px"; } catch(e) {"waiting for footer"}</script>' }));

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
var programm = new FontFaceObserver('Gerstner Programm');


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


//--------------------
// taxonomy formatting
//--------------------


$(document).ready(function(){

	$('.terms-list').each(function() {
		var listLength = $(this).children().size();
		if(listLength >= '20'){
			$(this).addClass('multi-col');
		}
	});

	var letList = { letters: [] };  // object to collect the li elements and a list of initial letters
	$('.terms-list.multi-col').children('li').each(function(){
		var itmLetter = $(this).children('.term-title').first().text().substring(0,1).toUpperCase();
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
		$('.terms-list').append(cap);  // add the list to a new li

	});

});


//-----------------
// new page control
//-----------------


Page = function() {

	// lazy load images
	if (typeof bLazy == 'function') { var Blazy = new bLazy(); }

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


//----------------------------------------
// add class on fractional viewport scroll
//----------------------------------------

$(window).scroll(function() {

	var scroll = $(window).scrollTop();

	if (scroll >= 0.5 * $(window).height()) {
		$(".site-map-base-links").addClass('hide');
	} else {
		$(".site-map-base-links").removeClass('hide');
	}

});
