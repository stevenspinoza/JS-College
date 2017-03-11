$(function() {
	$( '#tabs' ).tabs();	
	
	//Coordinates loading and #location
	$('#c1').click(function(){
		init(43.642566,-79.38705700000003,'map');	
	});
	$('#c2').click(function(){
		init(43.843018,-79.53946500000001,'map2');	
	});
	$('#c3').click(function(){
		init(43.6677097,-79.3947771,'map3');	
	});
	
	//Transitions
	$('#c1').click(function(){
		$('#cnTower').animate({'opacity':1}, 500);
		$('#wonderland').animate({'opacity':0}, 500);
		$('#museum').animate({'opacity':0}, 500);
	});

	$('#c2').click(function(){
		$('#cnTower').animate({'opacity':0}, 500);
		$('#wonderland').animate({'opacity':1}, 500);
		$('#museum').animate({'opacity':0}, 500);
	});

	$('#c3').click(function(){
		$('#cnTower').animate({'opacity':0}, 500);
		$('#wonderland').animate({'opacity':0}, 500);
		$('#museum').animate({'opacity':1}, 500);
	});	
	
});
