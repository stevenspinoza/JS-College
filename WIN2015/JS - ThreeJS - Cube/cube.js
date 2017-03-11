var info = document.createElement( 'div' );
			info.style.position = 'absolute';
			info.style.top = '10px';
			info.style.width = '100%';
			info.style.textAlign = 'center';
			info.innerHTML = 'Click and drag to rotate the cube. Mousewheel for zoom. Pages are interactive.';
			document.body.appendChild( info );

			var camera, scene, renderer;

			var controls;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 200, 200, 200 );

				controls = new THREE.TrackballControls( camera );

				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;

				controls.noZoom = false;
				controls.noPan = false;

				controls.staticMoving = false;
				controls.dynamicDampingFactor = 0.3;

				controls.keys = [ 65, 83, 68 ];

				scene = new THREE.Scene();
				
				var urls = [
					[ 'http://wingtiptoys-steven.azurewebsites.net/', 0, 0, 128, 0, 0, 0 ],
					[ 'http://www.scweb.ca/~w0668955/winter2015/WG/USABILITY//home.php', 128, 0, 0, 0, 1.57, 0 ],
					[ 'foursquare/home.html', 0, 0, -128, 0, 3.14, 0 ],
					[ 'http://www.scweb.ca/~w0668955/winter2015/js/as6-StevenEspinoza.html', - 128, 0, 0, 0, 4.71, 0 ],
					[ 'http://php.scweb.ca/~w0668955/winter2015/ch/election/votingMap.html', 0, 128, 0, 4.71, 0, 0 ],
					[ 'steven_op.svg', 0, -128, 0, 1.57, 0, 0 ]
				];

				for ( var i = 0; i < urls.length; i ++ ) {

					var element = document.createElement( 'iframe' );
					element.src = urls[ i ][ 0 ];
					element.style.width = '1024px';
					element.style.height = '1024px';
					element.style.border = '0px';
					//element.style.backgroundColor = 'white';

					var object = new THREE.CSS3DObject( element );
					object.position.x = urls[ i ][ 1 ];
					object.position.y = urls[ i ][ 2 ];
					object.position.z = urls[ i ][ 3 ];
					object.rotation.x = urls[ i ][ 4 ];
					object.rotation.y = urls[ i ][ 5 ];
					object.rotation.z = urls[ i ][ 6 ];
					object.scale.x = 0.25;
					object.scale.y = 0.25;
					scene.add( object );

				}

				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = 0;
				renderer.domElement.style.backgroundColor = 'white';
				$('.container-fluid').append(renderer.domElement);

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				renderer.render( scene, camera );

			}
			
$( window ).resize(function() {
  $('.container-fluid').empty();
  //$('.container-fluid').append(renderer.domElement);
  init();
  animate();
});