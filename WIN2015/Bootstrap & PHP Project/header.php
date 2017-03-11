<!DOCTYPE html>
<html lang="en">
<head> 
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
	 <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	 
	<?php
	echo '<title>' . $page_title . '</title>';
	?> 
	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	
	<!-- Additional CSS -->
	<link rel="stylesheet" href="home.css">	
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
</head> 

<body> 
<div class="container">
	<!--Orientation Website
	 Static navbar -->
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="home.php" data-toggle="tooltip" data-placement="bottom" data-original-title="Home Page"><img class="imgbar" src="logo.png"  alt="Logo" /></a>
			<h3 class="mobtitle">OrientaWeb</h3>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li><a href="news.php"><span class="glyphicon glyphicon-bullhorn"></span> News</a></li>
			  <li><a href="college.php"><span class="glyphicon glyphicon-apple"></span> College</a></li>
              <li><a href="internet.php"><span class="glyphicon glyphicon-globe"></span> Internet App</a></li>
              <li><a href="network.php"><span class="glyphicon glyphicon-qrcode"></span> Networking</a></li>
			  <li><a href="faq.php"><span class="glyphicon glyphicon-question-sign"></span> FAQ</a></li>
			  <li><a href="contact.php"><span class="glyphicon glyphicon-envelope"></span> Contact</a></li>
			</ul>
			  <div class="col-sm-3 col-md-3 pull-right search">
				  <form class="navbar-form" role="search" action="search.php" method="post">
					<div class="input-group">
					  <input type="text" class="form-control" placeholder="Search" name="word">
					  <div class="input-group-btn">
						<button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
					  </div>
					</div>
				  </form>
			  </div>
                       
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>

	  <!-- Title -->
	  <div class="jumbotron">	
			<h1><img src="logo.png"  alt="Logo" class="img-responsive jumbo"/>
			<?php	echo $jumbo_title;	?> </h1>			  	
	  </div>  	     
	  
	  <div class="row">

        <div class="col-sm-8 blog-main">

          <div class="blog-post">