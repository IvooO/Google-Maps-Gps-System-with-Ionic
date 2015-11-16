
// var myapp = angular.module('starter', ['ionic'])

myapp.controller("mapController", function($scope,$timeout){
//display the map ============================================
	$scope.directionsService = new google.maps.DirectionsService;
 	$scope.directionsDisplay = new google.maps.DirectionsRenderer({
	    draggable: true,
	    map: map,
	    panel: document.getElementById('right-panel')
  	});
 	$scope.map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 7,
    	center: {lat: 41.85, lng: -87.65}
  	});
	$scope.directionsDisplay.setMap($scope.map);
 	$scope.start = document.getElementById('start');
 	$scope.end = document.getElementById('end');
	$scope.searchWrap = document.getElementById('searchWrap')

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
	$scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
		orgin = $scope.start.value;
		destination = $scope.end.value;
  		directionsService.route({
	    	origin: orgin,
	    	destination: destination,
	    	travelMode: google.maps.TravelMode.DRIVING

	}, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	      console.log("response",response)

	      $scope.response = response;

	      $scope.$apply()
	    }
	});
	}

})