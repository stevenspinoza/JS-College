$.fn.typewriter = function(options) {
		var settings = $.extend({
				sound:false,
				cursorVisible:true,
				cursorColor:"#ffffff",
				randomTypeSpeed:true,
		}, options);

		var $self = $(this);
		// Convert selected element to array
		var chosenElement = $(this).text();
		console.log(chosenElement);

		// Add class of .typeAction to user selected element
		$(this).addClass('typeAction');

		// Clears text in the user selected element
		$(this).text('');
		
		// Adds static cursor to user selected element
		if (settings.cursorVisible === true) {
			$(this).append($('<span id="cursor">').text('|'));	
		} else {
			$(this).append($('<span>').text(''));	
		}

		// Cursor Color
		if (settings.cursorColor) {
			$('#cursor').css("color", settings.cursorColor);
		}

		//Show element, remove class .typeAction
		$(this).removeClass('typeAction');

		// Create variable to measure element length 
		var elementLength = chosenElement.length;
		console.log(elementLength);

		// Below: creates an array with a list of all the letters
		var elementSplit = chosenElement.split('');
		console.log(elementSplit);

		// Our start postion for getting elements from the
		// elementSplit array, 0 becasuse we want to start from the 
		// first element
		var position = 0;
		// Set up an interval to loop every however many milliseconds

		var type = setInterval(function() {

			if (settings.randomTypeSpeed) {
			// Defines a random time interval
			var randTime = (Math.random() * 100);
			} else {
				var randTime = 0;
			}
			  setTimeout(function() {
			    console.log("I ran after ", randTime);

			    // Sound effects
			    if (settings.sound === true) {
						var audio = $('audio.sound')[0];
						audio.currentTime = 0;
						audio.play();
					}

      		// We append the element to the user selected element
					// $self refers to what element the user called our plugin on
					// We use the position number to access the element from the array, like elementSplit[0]
			    $self.find('span').before(elementSplit[position]);
			    // Increment the position for the next interval we get the next element from our array
					position++;

					// If the position is greater the length of the array
					if (position > elementLength) {
						// Shut it down
						clearInterval(type);
					}
				}, randTime);

		},100); // ends setInterval

};  // ends fn.typewriter