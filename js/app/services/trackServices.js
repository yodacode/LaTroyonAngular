var trackServices = angular.module('trackServices', ['ngResource']);

trackServices.factory('Track', ['$resource',
	function ($resource) {		
	return $resource('/:trackId', {}, {
		query: {method:'GET', params: {trackId: 'tracks'}, isArray: true}
	});
}]);
