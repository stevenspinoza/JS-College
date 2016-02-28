(function(){
	console.log("IIFE is running"); 
	
	var url = 'img.json';	

	var rows = [],                        // rows array
	  $min = $('#value-min'),           // Minimum text input
	  $max = $('#value-max'),           // Maximum text input
	  $table = $('#rates');             // The table that shows results
		
	function getAjax(){	  
		$.ajax({
				type: "GET",                                           
				url: url,                                               
				timeout: 500, 
				dataType: "json",			

				beforeSend: function() {			
					/* $table.append('<div id="load">Loading</div>');
					console.log("table appended"); */
				},
				complete: function() {                                  
					/* $('#load').remove();                               
					console.log("load removed"); */
				},
				
				error: function(){console.log("error");},
				
				success: function(data) {   
					console.log("SUCCESS");			
					$.each(data, function(i, imgArray){
						//After Rows are generated and populated, append them.
						makeRows(this);						
						appendRows();
						update($min.val(), $max.val());						
					});				
				},
				fail: function() { 	                                      
					alert('FATAL ERROR');
				}
			});
		}

		function makeRows(jsonArr) {   		// Create table rows and the array			
			//console.log(jsonArr);
			jsonArr.forEach(function(img) {   // For each person object in people
				//console.log(img);					
				//console.log(this); This outputs the window elements				 
				var $row = $('<tr></tr>');        // Create a row for them
					$row.append( $('<td></td>').text(img.datatags) ); // Add their name
					$row.append( $('<td></td>').html('<img src="images/'+img.url+'" data-tags="'+img.datatags+'" alt="'+img.alt+'" title="From: '+img.title+'" width="200" height="150"/>')); // Add their rate
					$row.append( $('<td></td>').text(img.description));
					$row.append( $('<td></td>').html('<a href="'+img.title+'" target="_blank">'+img.title+'</a>'));
				rows.push({ // Create rows array which links people objects to table rows
				image: img.datatags,
				$element: $row                  // Reference to row as jQuery selection
				}); 					
			});			
		}
		
		function appendRows() {               // Adds rows to the table
			var $tbody = $('<tbody></tbody>');  // Create <tbody> element
			rows.forEach(function(row) {        // For each object in the rows array
				$tbody.append(row.$element);      // Add the HTML for the row
			});
			$table.append($tbody);              // Add the rows to the table
		}
		
		function update(min, max) {           // Update the table content
			rows.forEach(function(row) {        // For each row in the rows array  
			  if (row.image >= min && row.image <= max) { // If in range
				row.$element.show();            // Show the row				
				//console.log(row.$element.html());
			  } else {                          // Otherwise
				row.$element.hide();            // Hide the row
			  }
			})
		}
		
		
		function init() {                     // Tasks when script first runs
			$('#slider').noUiSlider({           // Set up the slide control
			  range: [1, 10], start: [4, 7], handles: 2, margin: 0, connect: true,
			  serialization: {to: [$min, $max],resolution: 1}
			}).change(function() { 
				//Clear console for before update results
				console.clear();
				update($min.val(), $max.val()); 
			});
			
			getAjax();
			
			$($min.add($max)).bind('input', function(){
				//console.log(this.value); 
				update($min.val(), $max.val());		
			});
			
		}		
		
		
	//init() starts everything;
	$(init); 
}());