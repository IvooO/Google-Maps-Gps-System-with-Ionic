// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myapp = angular.module('starter', ['ionic','ngCordova','ngAutocomplete'])


myapp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });


})

myapp.directive('disableTap', function($timeout) {
  return {
    link: function() {
      $timeout(function() {
        // Find google places div
        _.findIndex(angular.element(document.querySelectorAll('.pac-container')), function(container) {
          // disable ionic data tab
          container.setAttribute('data-tap-disabled', 'true');
          // leave input field if google-address-entry is selected
          container.onclick = function() {
            document.getElementById('autocomplete').blur();
          };
        });
      },500);
    }
  };
});

myapp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive
  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/templates/tabs.html'
  })

  .state('views/landing', {
    url: "/views/landing",
    views: {
      'home': {
        templateUrl: "views/landing.html",
        controller: 'mapController'
      }
    }
  })

  .state('route', {
    url: "/views/route",
    views: {
      'home': {
        templateUrl: "views/routes.html"
      }
    }
  })

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('views/landing');

});
