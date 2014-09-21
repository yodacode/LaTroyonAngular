var latroyonApp = angular.module('latroyonApp', [
	'ngRoute',
	'latroyonAnimations',
	'trackControllers',	
	'playerControllers',	
	'menuControllers',	
	'trackServices',
	'playerServices'
]);

latroyonApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/app/partials/tracks-list.html',
		})
		.when('/phones/:phoneId', {
        	templateUrl: 'js/app/partials/phone-detail.html',
        	controller: 'TrackDetailCtrl'
      	})
      	.when('/contact', {
        	templateUrl: 'js/app/partials/contact.html'

      	})
		.otherwise({
			redirectTo: '/'
		});
}]);