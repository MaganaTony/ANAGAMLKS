// single greetingCard loop and fps calculation
greetingCard = (function () {

    "use strict";
	
	// required DOM elements
    var greetingCardContainer = jQuery("#wrap-greetingCard");
    var greetingCard = jQuery("#greetingCard");
    var openCardBtn = jQuery("#btn-open");
    var closeCardBtn = jQuery("#btn-close");
	
	// cache the moving DOM elements
    var frontCover = jQuery(".wrap-cover");
    var backFrontCover = jQuery("#back-front-cover");
	
	// cache for future usage
	var cssPrefixString = {};
	var cardPos = 'close';
	var running = false;
	var openDuration = 1200;
	var showTree = true;
	var openEasing = 'linear';
	var centeringDuration = 1050;
	var centeringEasing = 'easeInOutBack';

	// jsut define the card and page size
	var cardWidth, halfCardWidth, cardHeight, halfCardHeight;
	
	// external initilization
    function setSize( w ) {
		var re = new RegExp("[^A-Za-z0-9_]");
		var newW = 0;
		if( w != "" ){
			if(w.match(re) == '%'){
				var newW = Math.ceil(window.innerWidth * parseInt(w, 10) / 100);
			}else{
				var newW = w;
			}
		}
		
		// store the new width
		cardWidth = newW;
		halfCardWidth = Math.abs(cardWidth / 2);
		
		// get the real height using a small trick
		jQuery(".cover").width(halfCardWidth);
		greetingCardContainer.show();
		cardHeight = jQuery(".cover").outerHeight();
		halfCardHeight = Math.abs(cardHeight  / 2);
		greetingCardContainer.hide();

		// set size for the gretting card
		greetingCard.css({
			width: cardWidth,
			height: cardHeight
		});
		
		// test 
		jQuery('h2').css('font-size', halfCardWidth / 16);
		jQuery('p').css('font-size', halfCardWidth / 27);
		
		toCenter();
	}
	
	function show() {
		// show the greeting card
		greetingCardContainer.fadeIn(250);
	}
	
	// external initialization
	function triggers() {
		triggers();
	}
	
	function toCenter() {
		jQuery(greetingCardContainer).css({
			width: cardWidth + "px",
			height: cardHeight + "px",
			marginLeft: -Math.ceil(cardWidth / 2) + "px",
			marginTop: -Math.ceil(cardHeight / 2) + "px"
		});
	}
	
	function triggers() {
        openCardBtn.on("click", greetingCardOpen);	
        closeCardBtn.on("click", greetingCardClose);	
        greetingCard.on("click", greetingCardClick);	
	}
	
	function greetingCardClick(e) {
		//e.preventDefault();
		
		if( cardPos == 'close' ){
			greetingCardOpen();
		}else{
			greetingCardClose();
		}
	}
	
	function greetingCardOpen(e) {
	
		if( running == true ) return false;
		running = true;
		openCardBtn.hide();
		var halfduration = (openDuration / 2);
		
		frontCover.animate({  textIndent: 0 }, {
			'step': function(now) {
				now = 90 - now;
				$(this).css( cssPrefix('Transform'), 'perspective(1800px) rotateY(-'+now+'deg)'); 
			},
			'duration': halfduration,
			'easing': openEasing,
			'complete': function(){
				
				if ($.browser.msie && $.browser.version.substr(0,1)<10) {
					frontCover.hide();
				}
				backFrontCover.css( cssPrefix('Transform'), 'perspective(1800px) rotateY(90deg)').show(); 
				backFrontCover.animate({  textIndent: 0 }, {
					'step': function(now) {
						$(this).css( cssPrefix('Transform'), 'perspective(1800px) rotateY('+now+'deg)');  
					},
					'duration': halfduration,
					'easing': openEasing,
					'complete': function(){
						cardPos = 'open';
						running = false;
						
						closeCardBtn.show();
					}
				});
			}
		});
		
		// put the greeting card to center
		greetingCard.animate({
			'left': '0%'
		}, centeringDuration, centeringEasing );
	}
	
	function greetingCardClose(e) {
	
		if( running == true ) return false;
		running = true;
		closeCardBtn.hide();
		var halfduration = (openDuration / 2);
		
		backFrontCover.animate({  textIndent: 90 }, {
			'step': function(now) {
				$(this).css( cssPrefix('Transform'), 'perspective(1800px) rotateY('+now+'deg)');  
			},
			'duration': halfduration,
			'easing': openEasing,
			'complete': function(){
				frontCover.animate({  textIndent: 90 }, {
					'step': function(now) {
						now = 90 - now;
						$(this).css( cssPrefix('Transform'), 'perspective(1800px) rotateY(-'+now+'deg)'); 
					},
					
					'duration': halfduration,
					'easing': openEasing,
					'complete': function(){
						cardPos = 'close';
						running = false;
						
						openCardBtn.show();
					}
				});	
			}
		});
		
		
		// put the greeting card to center
		greetingCard.animate({
			'left': '-25%'
		}, centeringDuration, centeringEasing );
	}

	var cssPrefix = function(propertie) {
		if (cssPrefixString[propertie] || cssPrefixString[propertie] === '') return cssPrefixString[propertie] + propertie;
		var e = document.createElement('div');
		var prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
		for (var i in prefixes) {
			if (typeof e.style[prefixes[i] + propertie] !== 'undefined') {
				cssPrefixString[propertie] = prefixes[i];
				return prefixes[i] + propertie;
			}
		}
		return false;
	}

	return {
        "setSize": setSize,
        "show": show,
        "triggers": triggers
    }
})();

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});