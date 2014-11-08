app.directive('map', function() {
	return {
		restrict: 'E',
		scope: {
		  onCreate: '&'
		},
		link: function ( $scope, $element, $attr ) {
		
			function initialize() {

				if(navigator.geolocation) {
					window.centerOnMe();
				} else {
					console.log('No navigator.geolocation');
				}
			
				var mapOptions = {
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				window.reactorMap = new google.maps.Map( $element[0], mapOptions );
				
				// need to hide and show to redraw. webkit bug
				document.getElementById('map').style.display = 'none';
				
				setTimeout(function(){
					document.getElementById('map').style.display = 'block';
					google.maps.event.trigger(window.reactorMap, 'resize');
				}, 100);

				setTimeout(function(){
					// If user added a store name or address, do stuff
					if ( map_name ) {
						findPlace(map_name);
					} else if ( map_address ) {
						findAddress(map_address);
					}

				}, 2000);
				
			}

			// add marker for single address
			function findAddress(address) {
				
		        var geocoder = new google.maps.Geocoder();

		        geocoder.geocode({ 'address': address }, function (results, status) {
		            if (status == google.maps.GeocoderStatus.OK) {
		                var latitude = results[0].geometry.location.lat();
		                var longitude = results[0].geometry.location.lng();
		                var posLatlng = new google.maps.LatLng(latitude, longitude);
		                window.reactorMap.setCenter(posLatlng);
		                // console.log('Marker at ' + posLatlng);

		                setTimeout(function(){
		                	console.log('drop pin');
		                	var marker = new google.maps.Marker({
							  position: posLatlng,
							  map: window.reactorMap,
							  title: "Location",
							  animation: google.maps.Animation.DROP,
							});
		                }, 500);
		            } else {
		                console.log("Geocoder failed.")
		            }
		        });
		    }

		    // Find a store using Places API
		    function findPlace(placeName) {

				var request = {
					location: window.myLatlng,
					radius: '10000',
					keyword: placeName
					//types: ['store']
				};

				service = new google.maps.places.PlacesService(window.reactorMap);
				service.nearbySearch(request, placesCallback);

		    }

		    // Loop through store locations
		    function placesCallback(results, status) {

			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      createMarker(results[i]);
			    }
			  }
			}

			// Add a marker to the map
			function createMarker(place) {

			  var marker = new google.maps.Marker({
			    map: window.reactorMap,
			    position: place.geometry.location,
			    //animation: google.maps.Animation.DROP,
			  });

			  google.maps.event.addListener(marker, 'click', function() {
			  	var infowindow = new google.maps.InfoWindow();

			    infowindow.setContent('<p>' + place.name + '</p><p>' + place.vicinity + '</p>');
			    infowindow.open(window.reactorMap, this);
			  });
			}

			// center map on current user location
			window.centerOnMe = function() {

				navigator.geolocation.getCurrentPosition(function(pos) {
					window.myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
					window.reactorMap.setCenter(myLatlng);

					var marker = new google.maps.Marker({
					    map: window.reactorMap,
					    position: window.myLatlng,
					    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					    //animation: google.maps.Animation.DROP,
					  });

		        }, function(error) {
		          alert('Unable to get location: ' + error);
		        });
			}
				
			if (document.readyState === 'complete') {
				initialize();
			} else {
				google.maps.event.addDomListener( window, 'load', initialize );
			}
		  
		}
	}
});
