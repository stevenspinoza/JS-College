<?php
  // Insert the page header
  $jumbo_title = '404, Why?!';
  $page_title = 'OrientaWeb - 404';
  require_once('header.php');

?>    
           
	<div class="error-template">
		<h1>
			Oops!</h1>
		<h2>
			Resource Not Found, Try our search bar</h2>		
		<div class="error-actions">
			 <a class="btn btn-primary btn-lg blueb" href="home.php"><img class="imgbar" src="logo.png"  alt="Logo" /> Home </a>
			 <a href="contact.php" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
		</div>
	</div>
		

	  <!-- Dont delete this DIV --> 
	  </div><!-- /.blog-post --> 


<?php
  // Insert the footer  
  require_once('footer_contact.php');

?>