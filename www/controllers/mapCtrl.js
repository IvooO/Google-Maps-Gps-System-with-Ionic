
// var myapp = angular.module('starter', ['ionic'])

myapp.controller("mapController", function($scope,$timeout){
//display the map ============================================
	var stepDisplay = new google.maps.InfoWindow;
  var markerArray = [];

  var current = null;

  var iconBase = {
      url: 'img/arrow.png',
      size: new google.maps.Size(30, 32)
    };

  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

//model out the current data
  var d = new Date();
  console.log(d)

//instiatiate direction service
  $scope.directionsService = new google.maps.DirectionsService;
  $scope.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: $scope.map,
      preserveViewport: false,
      panel: document.getElementById('right-panel')
    });
  $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: {lat: 41.85, lng: -87.65},
      mapTypeId: google.maps.MapTypeId.ROADMAP

    });
  $scope.directionsDisplay.setMap($scope.map);

  
 	$scope.end = document.getElementById('end');


  $scope.end.webkitSpeech = true;

//auto complete service on input fields  =====================
	$scope.autocomplete = new google.maps.places.Autocomplete($scope.end);

//listen to the autocomplete event       =====================
  $scope.autocomplete.addListener('place_changed', function() {
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
//once routed reload to update the new current location==========================
	$scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay,markerArray, stepDisplay, map) {
      var markerArray = [];
     for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
      }
    navigator.geolocation.getCurrentPosition(function(position) {
          console.log("checking")
          var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                                position.coords.longitude);
          // console.log(position.coords)
          $scope.coords = position.coords.latitude + "," + position.coords.longitude
          $scope.newCord = $scope.coords.toString();

        // console.log($scope.newCord)
		var start = $scope.newCord;
		var destination = $scope.end.value;

  	$scope.directionsService.route({
	    	origin: start,
	    	destination: destination,
	    	travelMode: google.maps.TravelMode.DRIVING
	 }, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      $scope.directionsDisplay.setDirections(response);
	      showSteps(response, markerArray, stepDisplay, map);
	      // console.log("response",response)
	      $scope.response = response;
        $scope.$apply()
	    }
      // $scope.fireCheck = function(){
      //   console.log("fired")
      //   var timeout = directionsDisplay.setDirections(response);
      //   setTimeout($scope.fireCheck, 1000);
      // }
      // $scope.fireCheck();
	});

})

}

//find your location and
// function toggleBounce() {
//   if (current.getAnimation() !== null) {
//     current.setAnimation(null);
//   } else {
//     current.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
// current.addListener('click', toggleBounce);

//define the current position marker =========================
$scope.findLocation = function(map,newPoint){

  $scope.directionsDisplay.preserveViewport = true;

  setTimeout($scope.calculateAndDisplayRoute, 1000);

  navigator.geolocation.getCurrentPosition(function(position) {
    var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);
    $scope.map.setZoom(17)

    $scope.map.setTilt(20) 


    if (current != null) {
      // Marker already created - Move it
      current.setPosition(newPoint);
      $scope.map.setCenter(newPoint);
    }else{
      current = new google.maps.Marker({
        icon: iconBase,
        position: newPoint,
        map: $scope.map,
        shape: shape,
        title: 'Current location'
      });
       $scope.map.setCenter(newPoint);

       $scope.map.panTo(current.getPosition());
       return newPoint;
    }
  // Center the map on the new position
  }); 
  // Call the autoUpdate() function every 1/10 seconds
  setTimeout($scope.findLocation, 1000);

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
    stepDisplay.open($scope.map, marker);
  });
}
//Keep track of the current location of the user ====================
})