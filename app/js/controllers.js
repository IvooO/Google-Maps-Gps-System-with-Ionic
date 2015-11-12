var myapp = angular.module('starter.controllers', []);
//==================================================================================
//==================================== LandingCtrl ====================================
//==================================================================================

// myapp.controller('LandingCtrl', function($scope, $cordovaCamera,$ionicPlatform) {
//   console.log("This is LandingCtrl");
//   $ionicPlatform.ready(function() {

   
//   })
// })


myapp.controller('PlayCtrl', function($scope, $cordovaCamera,$ionicPlatform) {
  console.log("This is Play");
 
})


//==================================================================================
//==================================== DashCtrl ====================================
//==================================================================================

myapp.controller('DashCtrl', function($scope,$location) {

  $scope.clickMe = function(){
     console.log( 'hello son' );
     $location.path('/play')
  };

})


//==================================================================================
//=================================== ModalCtrl ====================================
//==================================================================================

myapp.controller('ModalCtrl', function($scope, $ionicModal){

  // console.log("ModalCtrl fired");

  $ionicModal.fromTemplateUrl('tab-instruction.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal){
    $scope.modal = modal;
  });

  //OPEN
  $scope.openModal = function(){
    $scope.modal.show();
  }

  //CLOSE
  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  //DESTROY
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})
