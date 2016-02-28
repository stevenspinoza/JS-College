(function(){
	console.log("IIFE is running"); 
	
	var url = 'img.json';	

	var rows = [];                        // rows array
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
						//console.log(this);  //One array	
						//msg="";
						$.each(this, function(image){
						//console.log(this);  //One array	
						
							var $row = $('<tr></tr>');
								$row.append( $('<td></td>').text(this.datatags));
								$row.append( $('<td></td>').html('<img src="images/'+this.url+'" data-tags="'+this.datatags+'" alt="'+this.alt+'" title="From: '+this.title+'" width="200" height="150"/>'));
								$row.append( $('<td></td>').text(this.description));
								$row.append( $('<td></td>').html('<a href="'+this.title+'" target="_blank">'+this.title+'</a>'));								
							//Populate array of Rows	
							rows.push({ 
								/* Strings should be parsed to integers for slider match */
								image: parseInt(this.datatags),       
								$element: $row,								
							});							
						});
						//After Rows are generated and populated, append them.
						appendRows();
						update($min.val(), $max.val());
						//$content.html(msg).hide().fadeIn(500);
					});				
				},
				fail: function() { 	                                      
					alert('FATAL ERROR');
				}
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