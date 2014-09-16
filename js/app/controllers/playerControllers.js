var playerControllers = angular.module('playerControllers', []);


playerControllers.controller('playerCtrl', ['$scope', 'Player', function ($scope, Player) {
  $scope.trackPercent = 8; 
  $scope.isPlaying = true;
  

  

  $scope.play = function () {    
    Player.play();    
  	$scope.name = Player.data.name;
  	console.log(Player);2275
  	$scope.totalTime = Player.getTotalTime();
  }

}]);