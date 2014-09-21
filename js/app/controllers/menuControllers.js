var menuControllers = angular.module('menuControllers', []);


playerControllers.controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);