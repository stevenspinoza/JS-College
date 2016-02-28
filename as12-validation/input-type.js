//From utilities.js

// Helper function to add an event listener
function addEvent (el, event, callback) {
  if ('addEventListener' in el) {                  // If addEventListener works
    el.addEventListener(event, callback, false);   // Use it
  } else {                                         // Otherwise
    el['e' + event + callback] = callback;         // CreateIE fallback
    el[event + callback] = function () {
      el['e' + event + callback](window.event);
    };
    el.attachEvent('on' + event, el[event + callback]);
  }
}

// Helper function to remove an event listener
function removeEvent(el, event, callback) {
  if ('removeEventListener' in el) {                      // If removeEventListener works
    el.removeEventListener(event, callback, false);       // Use it 
  } else {                                                // Otherwise
    el.detachEvent('on' + event, el[event + callback]);   // Create IE fallback
    el[event + callback] = null;
    el['e' + event + callback] = null;
  }
}

//Input-type.js - To show password

(function() {
 
  var pwd = document.getElementById('pwd');     // Get password input
  var chk = document.getElementById('showPwd'); // Get checkbox
 
  addEvent(chk, 'change', function(e) {         // When user clicks on checkbox
    var target = e.target || e.srcElement;      // Get that element
    try {                                       // Try the following code block
      if (target.checked) {                     // If the checkbox is checked
        pwd.type = 'text';                      // Set pwd type to text
      } else {                                  // Otherwise
        pwd.type = 'password';                  // Set pwd type to password
      }
    } catch(error) {                            // If this causes an error
      alert('This browser cannot switch type'); // Say that cannot switch type
    }
  });
 
}());

//Bitrthday datepicker
(function() {

	var $birth = $('#birthday');
	
	 // Create the date picker using jQuery UI
	$birth.prop('type', 'text').data('type', 'date').datepicker({
		dateFormat: 'yy-mm-dd'
	});

}());