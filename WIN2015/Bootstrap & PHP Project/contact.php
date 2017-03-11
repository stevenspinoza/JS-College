<?php
	// Insert the page header
	$jumbo_title = 'Contact Us!';
	$page_title = 'OrientaWeb - Contact';
	require_once('header.php');

	if (isset($_POST['submit'])) {
		$name = $_POST['name'];
		
		echo '<h2 class="blog-post-title">Thank you <strong>'.$name.'</strong> for your contact, comments or feedback. We will get back to you as soon as we can.</h2>';
		$output_form = false;
		
		echo '</div><!-- /.blog-post -->';
	}
	else {$output_form = true;}
	
	if ($output_form) {
?>     
	  
	  
	   <!-- Form row -->	   
        
            <div class="well well-sm">
                <form class="form-horizontal" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                    <fieldset>
                        <legend class="text-center header">Let us know how are we doing</legend>

                        <div class="form-group">
							<span class="col-md-1 col-md-offset-2 text-center"></span>
                              <div class="col-md-8">
								 <div class="inner-addon left-addon">
									 <i class="glyphicon glyphicon-user"></i> 
									<input id="fname" name="name" type="text" placeholder="First Name" class="form-control" required>
								</div>
							  </div>
                        </div>
                        <div class="form-group">
							<span class="col-md-1 col-md-offset-2 text-center"></span>
                              <div class="col-md-8">
								 <div class="inner-addon left-addon">
									<i class="glyphicon glyphicon-user"></i>                            
									<input id="lname" name="name" type="text" placeholder="Last Name" class="form-control" required>
								</div>
							  </div>
                        </div>

                        <div class="form-group">
                           <span class="col-md-1 col-md-offset-2 text-center"></span>
                              <div class="col-md-8">
								 <div class="inner-addon left-addon">
									<i class="glyphicon glyphicon-envelope"></i>
									<input id="email" name="email" type="email" placeholder="Email Address" class="form-control" required>
								</div>
							  </div>
                        </div>

                        <div class="form-group">
							<span class="col-md-1 col-md-offset-2 text-center"></span>
                              <div class="col-md-8">
								 <div class="inner-addon left-addon">
									<i class="glyphicon glyphicon-pencil"></i>                            
									<textarea class="form-control" id="message" name="message" placeholder="    Enter your massage for us here. We will get back to you as soon as we can." rows="7" required></textarea>
								</div>
							  </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary btn-lg" name="submit">Submit</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
          </div><!-- /.blog-post --> 
	<!-- /Form row -->

<?php
	 
	}
  // Insert the footer  
  require_once('footer_contact.php');

?>