<?php
	
	require_once('connectvars.php');

	// Insert the page header
	$jumbo_title = 'Search';
	$page_title = 'OrientaWeb - Search';
	require_once('header.php');

	$word = $_POST['word'];
	
	// Connect to the database
	
	//http://mrbool.com/how-to-create-your-own-search-engine-with-php-and-mysql/25836
	$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	
	
	
	$query = "SELECT * FROM searchengine ORDER BY RAND()";
	//WHERE pagecontent LIKE '%$_GET[term]%' LIMIT 0,$_GET[results]"
	$data = mysqli_query($dbc, $query);
		
	echo '<h2 class="blog-post-title">Results for "'. $word .'" </h2>';
	
	 while($ser = mysqli_fetch_array($data)){ 
		echo "<h3><a href='$ser[pageurl]'>$ser[pagecontent]</a></h3>";
		echo " <p>$ser[text]</p>";
	 } ?>			

  
			<hr> <a href="./home.php">Go Back</a> </body>
		   
          </div><!-- /.blog-post -->

<?php
  // Insert the footer  
  require_once('footer_contact.php');

?>