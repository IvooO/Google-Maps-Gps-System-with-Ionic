
// var myapp = angular.module('starter', ['ionic'])

myapp.controller("mapController", function($scope,$timeout){
//display the map ============================================
	$scope.directionsService = new google.maps.DirectionsService;
 	$scope.directionsDisplay = new google.maps.DirectionsRenderer({
	    draggable: true,
	    map: $scope.map,
	    panel: document.getElementById('right-panel')
  	});
 	$scope.map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 15,
    	center: {lat: 41.85, lng: -87.65},
    	mapTypeId: google.maps.MapTypeId.ROADMAP

  	});
	$scope.directionsDisplay.setMap($scope.map);


	var stepDisplay = new google.maps.InfoWindow;
  	var markerArray = [];

 	$scope.start = document.getElementById('start');
 	$scope.end = document.getElementById('end');
	$scope.searchWrap = document.getElementById('searchWrap')

//auto complete service on input fields  =====================
	$scope.autocomplete = new google.maps.places.Autocomplete($scope.start);
	$scope.autocomplete1 = new google.maps.places.Autocomplete($scope.end);


//listen to the autocomplete event       =====================
   	$scope.autocomplete.addListener('place_changed', function() {
   		console.log("place changed ")
		$scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay, markerArray, stepDisplay, map)   
  	});

   	$scope.autocomplete1.addListener('place_changed', function() {
   		console.log("place changed ")
  		$scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay, markerArray, stepDisplay, map)   
  	});

 	$timeout(function(){
	var predictionContainer = angular.element(document.getElementsByClassName('pac-container'));
	predictionContainer.attr('data-tap-disabled', true);
	// predictionContainer.css('pointer-events', 'auto');
	predictionContainer.bind('click', function(){
		element.find('input')[0].blur();
	});
}, 100);

   	$scope.reloadRoute = function(){
   		window.location.reload();
   	}

	$scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay,markerArray, stepDisplay, map) {
		 for (var i = 0; i < markerArray.length; i++) {
    		markerArray[i].setMap(null);
  		}
		orgin = $scope.start.value;
		destination = $scope.end.value;
  		directionsService.route({
	    	origin: orgin,
	    	destination: destination,
	    	travelMode: google.maps.TravelMode.DRIVING

	}, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	      showSteps(response, markerArray, stepDisplay, map);

	      console.log("response",response)

	      $scope.response = response;

	      $scope.$apply()
	    }
	});
	}
//find your location and route =============
$scope.findLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);


     marker = new google.maps.Marker({
        position: newPoint,
        map: $scope.map,
        title: 'Current Position'
      });
      marker.addListener('click', toggleBounce);

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint);
      $scope.map.setCenter(newPoint);

    }
    // Center the map on the new position
  }); 

  // Call the autoUpdate() function every 2 seconds
  setTimeout($scope.findLocation, 500);
}
// autoUpdate();

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap($scope.map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
//Keep track of the current location of the user ====================
})