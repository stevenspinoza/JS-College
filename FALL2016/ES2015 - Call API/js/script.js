{
    var $table_1 = $('.table');
    var rows_1 = [];
    var root = 'https://jsonplaceholder.typicode.com';
    var Comment_1 = (function () {
        //data:any;
        function Comment_1(data) {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.body = data.body;
            //[this.id, this.name, this.email, this.body] = data;
            //console.log(this);
        }
        return Comment_1;
    }());
    $.ajax({
        url: root + '/comments/',
        method: 'GET'
    }).then(function (data) {
        //console.log(data);
        //FOR OF///////////////////////////////////
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var record = data_1[_i];
            // Let & Deconstructor		  
            //let [id, name, email, body] = [record.id, record.name, record.email, record.body];
            var comment = new Comment_1(record);
            var $row = $('<tr></tr>');
            //Template syntax
            $row.append($("<td>" + comment.id + "</td>\n\t\t\t\t\t\t<td>" + comment.name + "</td>\n\t\t\t\t\t\t<td>" + comment.email + "</td>\n\t\t\t\t\t\t<td>" + comment.body + "</td>"));
            // console.log(record);  
            rows_1.push({ $element: $row });
        }
        appendRows();
        afterAjax_1();
    }).fail(function () {
        var $par = $('<p>Sorry, we could not make your request. Try again or later.</p>');
        $table_1.append($par);
    });
    function appendRows() {
        var $tbody = $('<tbody></tbody>'); // Create <tbody> element
        rows_1.forEach(function (row) {
            $tbody.append(row.$element); // Add the HTML for the row
        });
        $table_1.append($tbody); // Add the rows to the table
    }
    //$(document).ajaxStop(function() {
    //Arrow function
    //Ajax Stop when all ajax request are done
    var afterAjax_1 = function () {
        //$(document).ajaxStop(()=> {
        $('.table').each(function (i, el) {
            var $table = $(el);
            var $tbody = $table.find('tbody');
            var $controls = $table.find('th');
            var rows = $tbody.find('tr').toArray();
            // console.log($table);
            // console.log($tbody);
            // console.log($controls);
            // console.log(rows);
            $controls.on('click', function (e) {
                var $header = $(e.target);
                // $controls.on('click', function() {        // When user clicks on a header
                // let $header = $(this);                  // Get the header
                // console.log($header);
                var order = $header.data('sort'); // Get value of data-sort attribute
                console.log(order);
                var column; // Declare variable called column
                // If selected item has ascending or descending class, reverse contents
                if ($header.is('.ascending') || $header.is('.descending')) {
                    $header.toggleClass('ascending descending'); // Toggle to other class
                    $tbody.append(rows.reverse()); // Reverse the array
                }
                else {
                    $header.addClass('ascending'); // Add class to header
                    // Remove asc or desc from all other headers
                    $header.siblings().removeClass('ascending descending');
                    if (compare.hasOwnProperty(order)) {
                        column = $controls.index(e.target); // Search for columns index no
                        //console.log(rows);
                        //Optioncal parameters
                        rows.sort(function (a, b, c) {
                            if (c === void 0) { c = 0; }
                            a = $(a).find('td').eq(column).text(); // Get text of column in row a
                            b = $(b).find('td').eq(column).text(); // Get text of column in row b
                            // console.log(rows);
                            return compare[order](a, b); // Call compare method
                        });
                        //Spread operator
                        var params = rows;
                        $tbody.append(params);
                    }
                }
            });
        });
        //});
    };
    var compare = {
        number: function (a, b) {
            return a - b;
        },
        name: function (a, b, c) {
            // a = a.replace(/^the /i, '');          // Remove The from start of parameter
            // b = b.replace(/^the /i, '');          // Remove The from start of parameter
            if (c === void 0) { c = 'No value'; }
            // return a - b;				//This is enable when is a number comparison
            if (c == 0) {
                console.log('Parameter "c" default value is:' + c);
            }
            //This is enable when is string comparison
            if (a < b) {
                return -1; // Return -1
            }
            else {
                return a > b ? 1 : 0; // If a is greater than b return 1 OR
            } // if they are the same return 0
        },
        duration: function (a, b) {
            a = a.split(':'); // Split the time at the colon
            b = b.split(':'); // Split the time at the colon
            a = Number(a[0]) * 60 + Number(a[1]); // Convert the time to seconds
            b = Number(b[0]) * 60 + Number(b[1]); // Convert the time to seconds
            return a - b; // Return a minus b
        },
        date: function (a, b) {
            a = new Date(a); // New Date object to hold the date
            b = new Date(b); // New Date object to hold the date
            return a - b; // Return a minus b
        }
    };
}
//# sourceMappingURL=script.js.map