
// var myapp = angular.module('starter', ['ionic'])

myapp.controller("mapController", function($scope){
//display the map ============================================
	$scope.directionsService = new google.maps.DirectionsService;
 	$scope.directionsDisplay = new google.maps.DirectionsRenderer;
 	$scope.map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 7,
    	center: {lat: 41.85, lng: -87.65}
  	});
	$scope.directionsDisplay.setMap($scope.map);
 	$scope.start = document.getElementById('start');
 	$scope.end = document.getElementById('end');

//auto complete service on input fields  =====================
	$scope.autocomplete = new google.maps.places.Autocomplete($scope.start);
	$scope.autocomplete1 = new google.maps.places.Autocomplete($scope.end);


//listen to the autocomplete event       =====================
   	$scope.autocomplete.addListener('place_changed', function() {
   		console.log("place changed ")
		$scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay)   
  	});

   	$scope.autocomplete1.addListener('place_changed', function() {
   		console.log("place changed ")
  		$scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay)   
  	});

	$scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
		$scope.orgin = $scope.start.value;
		$scope.destination = $scope.end.value;
  		$scope.directionsService.route({
	    	origin: $scope.orgin,
	    	destination: $scope.destination,
	    	travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	      console.log("response",response)
	    }
	});
	}

})