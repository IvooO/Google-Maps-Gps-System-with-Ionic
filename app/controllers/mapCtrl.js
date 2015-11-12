
// var myapp = angular.module('starter', ['ionic'])

myapp.controller("mapController", function($scope){
//display the map
	$scope.directionsService = new google.maps.DirectionsService;
 	$scope.directionsDisplay = new google.maps.DirectionsRenderer;
 	$scope.map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 7,
    	center: {lat: 41.85, lng: -87.65}
  	});

	$scope.directionsDisplay.setMap($scope.map);


	$scope.onChangeHandler = function() {
    	$scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay);
    	console.log("finding location")
	};

 	document.getElementById('start').addEventListener('change', $scope.onChangeHandler);
	document.getElementById('end').addEventListener('change', $scope.onChangeHandler);

  $scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  	var o = document.getElementById('start').value;
	var d = document.getElementById('end').value;
	$scope.orgin = o;
	$scope.destination = d;

  	$scope.directionsService.route({
    	origin: $scope.orgin,
    	destination: $scope.destination,
    	travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
  
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


})