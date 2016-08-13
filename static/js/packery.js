
// overwrite Packery methods
var __resetLayout = Packery.prototype._resetLayout;
Packery.prototype._resetLayout = function() {
	__resetLayout.call( this );
	// reset packer
	var parentSize = getSize( this.element.parentNode );
	var colW = this.columnWidth + this.gutter;
	this.fitWidth = Math.floor( ( parentSize.innerWidth + this.gutter ) / colW ) * colW;
	this.packer.width = this.fitWidth;
	this.packer.height = Number.POSITIVE_INFINITY;
	this.packer.reset();
};

Packery.prototype._getContainerSize = function() {
	// remove empty space from fit width
	var emptyWidth = 0;
	for ( var i=0, len = this.packer.spaces.length; i < len; i++ ) {
		var space = this.packer.spaces[i];
		if ( space.y === 0 && space.height === Number.POSITIVE_INFINITY ) {
			emptyWidth += space.width;
		}
	}

	return {
		width: this.fitWidth - this.gutter - emptyWidth,
		height: this.maxY - this.gutter
	};
};

// always resize
Packery.prototype.needsResizeLayout = function() {
	return true;
};


//---------
// isostope
//---------

var $grid = '';

var $grid = $('.items').packery({
	itemSelector: '.post',
	columnWidth: 400,
	hiddenStyle: {
		opacity: 0
	},
	visibleStyle: {
		opacity: 1
	},
	gutter: 20
});

// mark items as initialized
$('.uninit').removeClass('uninit');

Iso = function() {

	// create new item elements
	var $items = $('.items .uninit');

	// append elements to container
	$grid.append($items)

	// add and lay out newly appended elements
		.packery('appended', $items);

	$grid.packery('layout');

	// mark items as initialized
	$('.uninit').removeClass('uninit');

};
