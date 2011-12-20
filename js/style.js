$(document).ready(function() {
	calcChange();
	$(window).resize(calcChange);
});

function calcChange(){
	// Set up all the variables
		var screenWidth = $(document).width();
		var screenHeight = $(document).height();

		var error = 40;
		var diff = 75;

		var posX = diff;
		var posY = diff;

		var width = screenWidth - 2*diff - error;
		var height = screenHeight - diff - 1;

	// Do the actual resizing.
		var cont = $(".container");
		var halves = $(".half");
			
		// Modify the container
			cont.css("left",posX);
			cont.css("top",posY);

			cont.css("width",width);
			cont.css("min-height",height);
		
		// Modify all the other slides
			halves.css("width",width/2);
			halves.css("min-height",height);
}
