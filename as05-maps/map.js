/* var map1, map2, map3; */

function init(a,b,c) {
		var coord = new google.maps.LatLng(a,b);  
		var mapOptions = {
			zoom: 13,
			center: coord,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById(c), mapOptions);
		$(c).append(map);
		
		var startPosition = new google.maps.Marker({    
			position: coord,                        
			map: map,                                
			icon: "marker.png"                            
		  });
}
	
window.onload = init(43.642566,-79.38705700000003,'map');
// window.onload = init(43.843018,-79.53946200000001,'map2');
// window.onload = init(43.6677097,-79.3947771,'map3');
	