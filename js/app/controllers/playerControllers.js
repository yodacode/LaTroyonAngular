var playerControllers = angular.module('playerControllers', []);


playerControllers.controller('playerCtrl', ['$scope', 'Player', function ($scope, Player) {

  	$scope.trackPercent = 0;
  	$scope.isLoading = false;
  	$scope.isPlayerDisplay = false;
  	$scope.currentTime = '00:00';
  	$scope.totalTime = '00:00';

	$scope.play = function () {
		Player.play();
		$scope.name = Player.data.name;
		console.log(Player);
		$scope.totalTime = Player.getTotalTime();
	}

	$scope.pause = function () {
		console.log('pause');
		Player.pause();
	}

	$scope.resume = function () {

		var toTime = (parseInt($scope.trackPercent) / 100) * parseInt($scope.totalTimeSecond);

		console.log('toTime = ',  '(' + $scope.trackPercent + '/' + 100 + ')' + '*' + $scope.totalTimeSecond);
		console.log('toTime = ' + toTime);
		console.log('readableDuration = ' + Player.readableDuration(toTime));

		Player.resume(toTime);
	}

	$scope.$on('player:init', function (event, data) {
	 	var track = Player.getCurrentTrack();
	 	$scope.name = track.name;
	 	$scope.totalTime = track.totalTime;
	 	Player.play();
	 	$scope.isPlayerDisplay = true;
	});

	$scope.$on('player:updateTimeLine', function (event, time) {
		$scope.currentTime = time.currentTime;
		$scope.trackPercent = time.trackPercent;
		$scope.totalTimeSecond = time.totalTimeSecond;
		$scope.currentTimeSecond = time.currentTimeSecond;
		
		if (!$scope.$$phase) {
			$scope.$apply();
		}			
	});

	$scope.$on('player:isLoading', function (event, isLoading) {
		$scope.isLoading = isLoading;		
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	});

}]);