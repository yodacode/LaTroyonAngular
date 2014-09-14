var trackControllers = angular.module('trackControllers', []);


trackControllers.controller('TrackListCtrl', ['$scope', '$http', function ($scope, $http) {

  var idColor = 0,
    pickColorClass = function () {
    var colors = ['yellow', 'purple', 'green', 'orange', 'blue', 'red'];
    idColor = colors[(idColor + 1)] ? idColor += 1 : idColor = 0;;
    return colors[idColor];
  };

  $scope.tracks = {};

  $http({method: 'GET', url: '/tracks'}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('data', data);
      console.log('status', status);
      console.log('headers', headers);
      console.log('config', config);
      $scope.tracks = data;

      $scope.tracks.forEach(function(track) {
        track.colorClass = pickColorClass();
      });

    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('error');
    });
}]);