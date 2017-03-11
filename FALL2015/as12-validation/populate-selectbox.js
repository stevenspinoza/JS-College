(function() {
  var role  = document.getElementById('role');// Type select box
  var subrole = document.getElementById('subrole');        // Model select box
  
  //List of subroles
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
  
  var other = {                                  // Store projectors
    secre: 'Secretary',
    maint: 'Maintenance'   
  };  
  

  // WHEN THE USER CHANGES THE TYPE SELECT BOX
  addEvent(type, 'change', function() {
    if (this.value === 'choose') {                // No selection made
      model.innerHTML = '<option>Please choose a type first</option>';
      return;                                     // No need to proceed further
    }
    var subroles = getSubroles(this.value);           // Select the right object

    // LOOP THROUGH THE OPTIONS IN THE OBJECT TO CREATE OPTIONS
    var options = '<option>Please choose a model</option>';
    var key;
    for (key in models) {                     // Loop through models
      options += '<option value="' + key + '">' + models[key] + '</option>';
    } // If an option could contain a quote, key should be escaped (see pXXX)
    model.innerHTML = options;                    // Update select box
  });

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
		case 'other':
			return other;
		break;		
	}	
  }
}());