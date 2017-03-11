{	//Const
	const $table = $('.table');
	const rows = [];	
		
	const root = 'https://jsonplaceholder.typicode.com';

	$.ajax({
	  url: root + '/comments/',
	  method: 'GET'
	}).then((data)=> {
	  //console.log(data);
	  //FOR OF///////////////////////////////////
	  for (record of data){
		// Let & Deconstructor		  
		let [id, name, email, body] = [record.id, record.name, record.email, record.body];
		
		let $row = $('<tr></tr>');
		//Template syntax
		$row.append($(`<td>${id}</td>`));
		$row.append($(`<td>${name}</td>`));
		$row.append($(`<td>${email}</td>`));
		$row.append($(`<td>${body}</td>`));
			
		// console.log(record);  
		rows.push({$element: $row});
	  
	  }
	  appendRows();
	});

	function appendRows() {               // Adds rows to the table
		let $tbody = $('<tbody></tbody>');  // Create <tbody> element
		rows.forEach((row)=> {        // For each object in the rows array
			$tbody.append(row.$element);      // Add the HTML for the row
		});
		$table.append($tbody);              // Add the rows to the table
	}

//$(document).ajaxStop(function() {
	//Arrow function
	//Ajax Stop when all ajax request are done
$(document).ajaxStop(()=> {
	$('.table').each((i, el) => {
		let $table = $(el);  
		let $tbody = $table.find('tbody');
		let $controls = $table.find('th');
		let rows = $tbody.find('tr').toArray();
		// console.log(rows);
		
		
		$controls.on('click', e => {
		let $header = $(e.target);
		
		// $controls.on('click', function() {        // When user clicks on a header
		// let $header = $(this);                  // Get the header
		// console.log($header);
		let order = $header.data('sort');       // Get value of data-sort attribute
		console.log(order);
		let column;                             // Declare variable called column

		// If selected item has ascending or descending class, reverse contents
		if ($header.is('.ascending') || $header.is('.descending')) {  
		  $header.toggleClass('ascending descending');    // Toggle to other class
		  $tbody.append(rows.reverse());                // Reverse the array
		} else {                                        // Otherwise perform a sort                            
		  $header.addClass('ascending');                // Add class to header
		  // Remove asc or desc from all other headers
		  $header.siblings().removeClass('ascending descending'); 
		  if (compare.hasOwnProperty(order)) {  // If compare object has method
			column = $controls.index(e.target);         // Search for columns index no
			//console.log(rows);
			
			//Optioncal parameters
			rows.sort((a, b, c=0) => {               // Call sort() on rows array
			  a = $(a).find('td').eq(column).text(); // Get text of column in row a
			  b = $(b).find('td').eq(column).text(); // Get text of column in row b
			  
			  // console.log(rows);
			  return compare[order](a, b);           // Call compare method
			});
			//Spread operator
			let params = rows;
			$tbody.append(...params);
		  }
		}
	  });
	});
});
	
	var compare = {                           // Declare compare object
	  number: (a, b)=> {     
		return a - b;
	  },
	  name: (a, b, c='No value')=> {                  // Add a method called name
		// a = a.replace(/^the /i, '');          // Remove The from start of parameter
		// b = b.replace(/^the /i, '');          // Remove The from start of parameter

		// return a - b;				//This is enable when is a number comparison
		
		if (c==0){
			console.log('Parameter "c" default value is:'+ c);
		}
		
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
	
}