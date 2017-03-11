/*
	Assignment 20
	jQuery
	WEB230
	{Steven Sp}
*/

$(document).ready(function(){
	//Step 1
	$('.todo-list').on('click','.todo-item', function(){
		//event.preventDefault();
		$(this).toggleClass('completed');
		if($(this).is('.completed')){
			$(this).css('color','rgba(144,144,144, 0.5)');
		}
		else{$(this).css('color','#444');}
	});
	
	//Step 2
	$('.todo-list').on('click','.remove', function(){
		//event.preventDefault();
		$(this).parent().animate({
			  opacity: 0.0,
			  borderWidth: '-=80'
			}, 8000, function() {
			  $(this).remove();
			});				
	});
	
	//Step 3	
	$('#add-item').on('click', function(e) {     
		e.preventDefault();                        
		if($('input:text').val()!=''){
			var text = $('input:text').val();
			var item = ('<li class=\"todo-item\">' + text + '<span class=\"remove\"></span></li>');			
			$(item).insertBefore('.todo-list .todo-new').hide();
			$('.todo-list .todo-item:last').show(8000);			
			$('input:text').val('');                  
		}
	});
	
	//Enter Key event	
	$('input:text').keydown(function(event){    
		if(event.keyCode==13){
		   $('#add-item').trigger('click');
		}
	});
  
	
});
