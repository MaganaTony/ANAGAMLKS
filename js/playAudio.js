// single playAudio loop and fps calculation
playAudio = (function () {

    "use strict";
	
	// required DOM elements
    var audio = document.getElementById('playAudio');
	var playAudioBtn = jQuery("#playAudioBtn");
    
	function init( volume ){
		triggers();
		
		// setup the volume
		if( volume == 9 ){
			volume = 1;
		}else{
			volume = "0." + volume;
		}
		audio.volume= volume;
	}
	
	function play(){
		audio.play();
		playAudioBtn.attr('class', 'play');
	}
	
	function pause(){
		audio.pause();
		playAudioBtn.attr('class', 'pause');
	}
	
	function triggers(){
		playAudioBtn.on('click', function(e){
			e.preventDefault();
			
			if( playAudioBtn.hasClass('play') ){
				pause();
			}else{
				play();
			}
		});
	}
	
	return {
        "init": init,
        "play": play,
        "pause": pause
    }
})();