var latroyonApp = angular.module('latroyonApp', [
	'ngRoute',
	'trackControllers',
]);

latroyonApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/app/partials/tracks-list.html',
			controller: 'TrackListCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);