// Initialization and events code for the app
(function () {
    "use strict";

    // secret logic vars
    var defaultMusicTrack = "res/LetItSnowShort.mp3";
	
	// the app image, need to be preloaded
	var appImages = [];
	appImages.push('images/audio_btn.png');
	appImages.push('images/social_box_left.png');
	appImages.push('images/social_box_middle.png');
	appImages.push('images/social_box_right.png');
	appImages.push('images/btn-open.png');
	appImages.push('images/btn-close.png');
	appImages.push('images/cover.png');
	appImages.push('images/right-side.png');
	appImages.push('images/left-side.png');
	appImages.push('images/tree.png');
	appImages.push('images/logo-aa.png');

    // preparing the elements we'll need further
    var snowflakesCanvas = document.getElementById("snowflakesCanvas");
    var snowflakesContext = document.getElementById("snowflakesCanvas").getContext("2d");
	var grCardSize = {
		'w': appConfig.w
	};
	
    function resizeCanvasElements() {
		// resize falling snowflakes canvas to fit the screen
        snowflakesCanvas.width = window.innerWidth;
        snowflakesCanvas.height = window.innerHeight;
		
		// resize falling greeting card canvas
		greetingCard.setSize( grCardSize.w );
		greetingCard.show();
    }

    document.addEventListener("DOMContentLoaded", function () {

		// add the images to preload
		preloader.addImages(appImages);
		
		// on images preloaded
		preloader.onComplete( function() {
			// initialiaze the postcard
			greetingCard.setSize( grCardSize.w );
			greetingCard.triggers();
			greetingCard.show();
			
			if( appConfig.show_show === true ){
				// initialiaze the Snowflakes
				Snowflakes.generate( appConfig.snowflakes );
				
				// initialize out animation functions and start animation:
				// falling snowflakes
				Animation.addFrameRenderer(Snowflakes.render, snowflakesContext);
				
				// start the animation
				Animation.start();
				
				// show the social box
				var sb = jQuery("#social-box");
				sb.css({
					'margin-left': "-" + (sb.width() / 2) + "px"
				});
				sb.animate({
					'opacity': 1
				}, 250);
			}
			
			
			if( appConfig.play_sound === true ){
				// start audio 
				playAudio.init( appConfig.volume );
				playAudio.play();
			}
			
			// properly resize the canvases
			resizeCanvasElements();
		});
    });

    window.addEventListener("resize", function () {
        // properly resize the canvases
        resizeCanvasElements();
    });
})();