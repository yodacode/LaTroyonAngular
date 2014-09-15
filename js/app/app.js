var latroyonApp = angular.module('latroyonApp', [
	'ngRoute',
	'trackControllers',
	'trackServices'
]);

latroyonApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/app/partials/tracks-list.html',
			controller: 'TrackListCtrl'
		})
		.when('/phones/:phoneId', {
        	templateUrl: 'js/app/partials/phone-detail.html',
        	controller: 'TrackDetailCtrl'
      	})
		.otherwise({
			redirectTo: '/'
		});
}]);