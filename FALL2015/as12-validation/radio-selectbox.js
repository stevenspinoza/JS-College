//(function() {

	//Getting radiobuttons
	var form, options, subrole;
	form      = document.getElementById('form-teresa');
	options   = form.elements.role; 
	//Getting the select box
	subrole	  = document.getElementById('subrole');        // Model select box
	
	other     = document.getElementById('other');        // Other radio button
	otherRole = document.getElementById('other-role');   // Other text input
	otherRole.className = 'hide';                        // Hide other text input

	
		
	//Subrole elements
	var web = {                                      // Object stores cameras
		front: 'Front-End Developer',
		php: 'PHP Developer',
		python: 'Python Developer',
		rails: 'Rails Developer'
	};
	var mobile = {                                  // Store projectors
		android: 'Android Developer',
		ios: 'iOS Developer',
		mobdes: 'Mobile Designer'    
	};

	var business = {                                  // Store projectors
		owner: 'Business Owner',
		freelan: 'Freelancer'   
	};

	/* var other = {                                  // Store projectors
		secre: 'Secretary',
		maint: 'Maintenance'   
	}; */  
	
	//Loop for every radiobutton
	for (var i = [0]; i < options.length; i++) {         // Loop through radios
		addEvent(options[i], 'click', function(){		// Add event 
			radioChanged(this.value);
		});       
		
		//Jquery way
		/* $(options[i]).click(function(){
			radioChanged(this.value)
		});		 */
	}

	function radioChanged(value) {
		
		if (value ==='other'){
			subrole.className = 'hide';
			
			hide = other.checked ? '' : 'hide';                // Is other checked?
			otherRole.className = hide;                        // Text input visibility
			if (hide) {                                        // If text input hidden
			  otherRole.value = '';                            // Empty its contents
			}		
		}
		else{
			subrole.className = '';
			otherRole.className = 'hide';
			
			var subroles = getSubroles(value);
			
			var options = '<option value="choose">Please choose a subrole</option>';
			var key;
			
			for (key in subroles) {                     // Loop through models
			  options += '<option value="' + key + '">' + subroles[key] + '</option>';
			} 
			subrole.innerHTML = options; 
		}	
	}	
	
	function getSubroles(subrole) {
		switch(subrole){
			case 'web':
				return web;
			break;
			case 'mobile':
				return mobile;
			break;
			case 'business':
				return business;
			break;
			/* case 'other':
				return other;
			break; */		
		}	
	}
	
	
//}());

//http://stackoverflow.com/questions/15589994/how-to-update-a-select-box-based-on-radio-button-check-in-javascript
//