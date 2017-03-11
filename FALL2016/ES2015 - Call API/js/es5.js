
	$table = $('.table');
	rows = [];	
		
	var root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
	  url: root + '/comments/',
	  method: 'GET'
	}).then(function(data) {
	  //console.log(data);
	  $.each(data, function(i, object){
		var $row = $('<tr></tr>');		
		$row.append( $('<td></td>').text(this.id));
		$row.append( $('<td></td>').text(this.name));
		$row.append( $('<td></td>').text(this.email));
		$row.append( $('<td></td>').text(this.body));
			
		//console.log(this);  
		rows.push({$element: $row});
	  });
	  appendRows();
	});

	function appendRows() {               // Adds rows to the table
		var $tbody = $('<tbody></tbody>');  // Create <tbody> element
		rows.forEach(function(row) {        // For each object in the rows array
			$tbody.append(row.$element);      // Add the HTML for the row
		});
		$table.append($tbody);              // Add the rows to the table
	}

$(document).ajaxStop(function() {
	$('.table').each(function () {
		var $table = $(this);  
		var $tbody = $table.find('tbody');
		var $controls = $table.find('th');
		var rows = $tbody.find('tr').toArray();
		// console.log(rows);
		
		$controls.on('click', function() {        // When user clicks on a header
		var $header = $(this);                  // Get the header
		var order = $header.data('sort');       // Get value of data-sort attribute
		// console.log(order);
		var column;                             // Declare variable called column

		// If selected item has ascending or descending class, reverse contents
		if ($header.is('.ascending') || $header.is('.descending')) {  
		  $header.toggleClass('ascending descending');    // Toggle to other class
		  $tbody.append(rows.reverse());                // Reverse the array
		} else {                                        // Otherwise perform a sort                            
		  $header.addClass('ascending');                // Add class to header
		  // Remove asc or desc from all other headers
		  $header.siblings().removeClass('ascending descending'); 
		  if (compare.hasOwnProperty(order)) {  // If compare object has method
			column = $controls.index(this);         // Search for columns index no
			//console.log(rows);
			rows.sort(function(a, b) {               // Call sort() on rows array
			  a = $(a).find('td').eq(column).text(); // Get text of column in row a
			  b = $(b).find('td').eq(column).text(); // Get text of column in row b
			  
			  // console.log(rows);
			  return compare[order](a, b);           // Call compare method
			});

			$tbody.append(rows);
		  }
		}
	  });
	});
});
	
	var compare = {                           // Declare compare object
	  number: function(a, b) {     
		return a - b;
	  },
	  name: function(a, b) {                  // Add a method called name
		// a = a.replace(/^the /i, '');          // Remove The from start of parameter
		// b = b.replace(/^the /i, '');          // Remove The from start of parameter

		// return a - b;				//This is enable when is a number comparison
		
		//This is enable when is string comparison
		if (a < b) {                          // If value a is less than value b
		 return -1;                          // Return -1
		} else {                              // Otherwise
		 return a > b ? 1 : 0;               // If a is greater than b return 1 OR
		}                                     // if they are the same return 0
	  },
	  duration: function(a, b) {              // Add a method called duration
		a = a.split(':');                     // Split the time at the colon
		b = b.split(':');                     // Split the time at the colon

		a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
		b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds

		return a - b;                         // Return a minus b
	  },
	  date: function(a, b) {                  // Add a method called date
		a = new Date(a);                      // New Date object to hold the date
		b = new Date(b);                      // New Date object to hold the date

		return a - b;                         // Return a minus b
	  }
	};
	
