// single preloader loop and fps calculation
preloader = (function () {

    "use strict";
	
	// required DOM elements
    var preloader = document.getElementById("preload");
	
	// static images
	var images = [];
	
	// default greetings image
    var loaderImage = 'images/christmas-loading.gif';
	
	// external initialization
	function addImages( arr ) {
		jQuery(arr).each(function(key, val) {
			images.push(val);
		});
	}
	
	function printTheLoader(){
		jQuery(preloader).html( jQuery('<img />').attr('src', loaderImage) );
	}
	
	
	// external initialization
	function onComplete( callback ) {
		printTheLoader();
		
		if( images.length == 0 ){
			callback.call();
		}else{
			preLoadImage( images, function(){
				setTimeout( function () {
					jQuery(preloader).hide();
					callback.call();
				}, 200);
			} );
		}
	}
	
	// private method
	function preLoadImage(imageList, callback) {    
		var pic = [], i, total, loaded = 0;
		if (typeof imageList !== 'undefined') {
		
			if ($.isArray(imageList)) {
				total = imageList.length; // used later
				
				for (i=0; i < total; i++) {
					pic[i] = new Image();
					pic[i].onload = function() {
						loaded++; // should never hit a race condition due to JS's non-threaded nature
						if (loaded === total) {
							if ($.isFunction(callback)) {
								callback();
							}
						}
					}
					pic[i].src = imageList[i];
				}
			}
			else {
				if(jQuery.inArray(imageList, preloaded_image) < 1){
					pic[0] = new Image();
					pic[0].onload = function() {
						if ($.isFunction(callback)) {
							preloaded_image.push(imageList);
							callback();
						}
					};
					pic[0].src = imageList;
				}else{
					callback();
				}
			}
		}
		pic = undefined;
	}
	
	return {
        "addImages": addImages,
		"onComplete": onComplete
    }
})();