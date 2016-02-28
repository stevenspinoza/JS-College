// JavaScript validation of subscription form.
// A. Anonymous function triggered by submit event 
// B. Functions called to perform generic checks by anon function in section A
// C. Functions called to perform generic checks by anon function in section A
// D. Functions to get / set / show / remove error messages
// E. Object to check type of data using RegEx called by validateTypes in section B
 
// Dependencies: jQuery


(function () {
document.forms.register.noValidate = true; // Disable HTML5 validation - using JavaScript instead
$('form').on('keyup mouseout',function (e) { 
	e.preventDefault();
	var valid = {'true': true};
	//var isFormValid;
 
    //Validate Name
	 if (!validateName()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('name')); // Show error message
      valid.name = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('name'));
    }
 
    //Validate Date
     if (!validateDate()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('birthday')); // Show error message
      valid.date = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('birthday'));
    }
    
	//Validate Number
	 if (!validateNumber()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('age')); // Show error message
      valid.number = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('age'));
    }	
	
    
	//Validate Password
    if (!validatePassword()) {          // Call validatePassword(), and if not valid
      showErrorMessage(document.getElementById('pwd')); // Show error message
      valid.password = false;           // Update the valid object - this element is not valid
    } else {                            // Otherwise remove error message
      removeErrorMessage(document.getElementById('pwd'));
    }
	
	//Validate Checkboxes
	 if (!validateCheckboxes()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('interests')); // Show error message
      valid.chkbox = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('interests'));
    }	
	
	//Validate RadioButtons, SelectBox and OtherTextbox
	 if (!validateRadioBut()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('radioRoles')); // Show error message
      valid.radiobut = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('radioRoles'));
    }	
	
	// Validate Bio textbox
	if (!validateBio()) {                // Call validateBio(), and if not valid
      showErrorMessage(document.getElementById('bio')); // Show error message
      valid.bio = false;                 // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
      removeErrorMessage(document.getElementById('bio'));
    }	
	

	// DID IT PASS / CAN IT SUBMIT THE FORM?
    // Loop through valid object, if there are errors set isFormValid to false
    for (var field in valid) {          // Check properties of the valid object
      if (!valid[field]) {              // If it is not valid	  
        //isFormValid = false;            // Set isFormValid variable to false
        //break;                          // Stop the for loop, an error was found		
		submit.disabled = true;                         // Disable submit button
		//submitted = true;                               // Update submitted var
		submit.className = 'disabled';
		//console.log("Form is invalid");		
      }
	  else{                                 // Otherwise
		  //isFormValid = true;               // The form is valid and OK to submit	  
		  valid.true = true;
		  submit.className = '';
		  submit.disabled = false;
		  //console.log("Form is valid");
	  }
    } 
 
    // If the form did not validate, prevent it being submitted
   /*  if (!isFormValid) {                 // If isFormValid is not true
      e.preventDefault();               // Prevent the form being submitted
    }
 */
	//console.log(valid);
	
}); 

////////////////////////////////////////////////////////////////////////
//////////THIS IS THE END OF THE EVENT HANDLER TO THE FORM//////////////
////////////////////////////////////////////////////////////////////////


// Check that the name is entered
	function validateName() {
		var nameVar = document.getElementById('name');
		//alert(nameVar);
        var valid = (nameVar.value.length);
        //var valid = (name.value === undefined)||(name.value.length>=0);
		if (!valid) {
		  setErrorMessage(nameVar, 'Please enter a valid name');
          //console.log("setErrorMessage is called");
		}
		return valid;
	  }  

// Check that the date is greater than 1900–01–01 and less than today.

    function validateDate(){
        var date = document.getElementById('birthday');

        var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(date.value);
        
        var dateForm = date.value.replace(/-/g, ',');
        
        //Date(year, month, day, hours, minutes, seconds)
        //Date(year, month, day)
        var birthdate = new Date(dateForm);
        var curdate = new Date();
        var olddate = new Date(1900,00,01);
        		
		
		if(birthdate<olddate){
			valid = false;
			setErrorMessage(date, 'Please enter a date after 1900');
			//console.log("birthdate<olddate is called");
			//console.log(birthdate + "is lesser than "+ olddate +"?: "+(birthdate<olddate));
		}
		else if (birthdate>curdate){                                        // If the value of valid is not true
			valid = false;
            setErrorMessage(date, 'Please enter a date before today');  // Set error message
			//console.log("birthdate>curdate is called");
			//console.log(birthdate + "is greater than "+ curdate +"?: "+(birthdate>curdate));
        }		
		else if ((!valid) && (!date.value)){                                        // If the value of valid is not true
            setErrorMessage(date, 'Please enter a valid date');  // Set error message
			//console.log("!date.value is called");
        }		
		
        return valid;                                        // Return the valid variable
				
    }

// Check that the age is positive and lesser than 150	
  function validateNumber() {	  
	var ageVar = document.getElementById('age');
	var valid = /^\d+$/.test(ageVar.value);                  // Store result of test in valid
	 
	if(!ageVar.value){
		valid = false;
		setErrorMessage(ageVar, 'Please enter a valid number');
		//console.log("ageVar.value is called");
	}
	else if(ageVar.value>149){
		valid = false;
		setErrorMessage(ageVar, 'Please a number lesser than 150');	
		//console.log("ageVar.value>149 is called");		
	}	
	else if (!valid) {
		setErrorMessage(ageVar, 'Please enter a valid number');
		//console.log("!valid is called");	
	}
	else{
		valid = true;
		//console.log("!date.value is called");
	}
	return valid;
  }	
 

  // Check that the passwords both match and are 8 characters or more
  function validatePassword() {
    var password = document.getElementById('pwd');
    var valid = password.value.length >= 12;
    if (!valid) {
      setErrorMessage(password, 'Please make sure your password has at least 12 characters');
    }
    return valid;
  }
  
    // Check that at least one checkbox is checked
  function validateCheckboxes() {
    var chkboxVarDiv = document.getElementById('interests');
    var chkboxVar = $(".interest:checked").length;
	
	if(chkboxVar>0){
		valid = true;
		//console.log("chkboxVar>0 is called");
	}
	else{
		valid = false;
		setErrorMessage(chkboxVarDiv, 'Please check at least one checkbox');
		//console.log("!chkboxVar is called");
	}
	
    return valid;
  }
  
    // Check that at least one radiobutton is checked, Selectbox is selected and othertexbox has content
  function validateRadioBut() {
    var chkboxVarDiv = document.getElementById('radioRoles');
    var chkboxVar = $(".chkbox:checked").length;	
	var otherVar = document.getElementById('other');
	var subrole	  = document.getElementById('subrole'); 
	
	if(chkboxVar>0){
		valid = true;
		//console.log("chkboxVar>0 is called");
	}
	else{
		valid = false;
		setErrorMessage(chkboxVarDiv, 'Please check at least one radiobutton');
		//console.log("!chkboxVar is called");
	}
	
	if(otherVar.checked){
		var otherRoleVar = document.getElementById('other-role');		
        var valid = (otherRoleVar.value.length);        
		if (!valid) {
			valid = false;
			setErrorMessage(chkboxVarDiv, 'Please enter a valid role');
			//console.log("otherRoleVar is called");
		}
		else{valid = true;}
	}

	if(subrole.value=='choose'){
		valid = false;
		if (!valid) {			
			setErrorMessage(chkboxVarDiv, 'Please enter a valid subrole');
			//console.log("otherRoleVar is called");
		}
		else{valid = true;}
	
	}
	
    return valid;
  }
  
  // Validate Bio textbox
  function validateBio() {
    var bio = document.getElementById('bio');
    var valid = bio.value.length >= 10;
	
	if (!valid) {
      setErrorMessage(bio, 'Please make sure your bio has at least 10 characters');
    }
    return valid;
  }  
  
  // -------------------------------------------------------------------------
  // D) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
  // -------------------------------------------------------------------------
 
  function setErrorMessage(el, message) {
    $(el).data('errorMessage', message);                 // Store error message with element
  }
 
  function getErrorMessage(el) {
    return $(el).data('errorMessage') || el.title;       // Get error message or title of element
  }
 
  function showErrorMessage(el) {
    var $el = $(el);                                     // The element with the error
    var errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message
 
    if (!errorContainer.length) {                         // If no errors exist with the element
       // Create a <span> element to hold the error and add it after the element with the error
       errorContainer = $('<span class="error message"></span>').insertAfter($el);
    }
    errorContainer.text(getErrorMessage(el));             // Add error message
  }
 
  function removeErrorMessage(el) {
    var errorContainer = $(el).siblings('.error.message'); // Get the sibling of this form control used to hold the error message
    errorContainer.remove();                               // Remove the element that contains the error message
  }
		
 
}());  // End of IIFE