var trackControllers = angular.module('trackControllers', []);


trackControllers.controller('TrackListCtrl', ['$scope', 'Track', 'Player', function ($scope, Track, Player) {

  var idColor = 0,
      tracks = {};

  var pickColorClass = function () {
    var colors = ['yellow', 'purple', 'green', 'orange', 'blue', 'red'];
    idColor = colors[(idColor + 1)] ? idColor += 1 : idColor = 0;
    return colors[idColor];
  };

  tracks = Track.query(function() {
    tracks.forEach(function(track) {
      track.colorClass = pickColorClass();
    });
    $scope.tracks = tracks;
  });

  $scope.setStream = function(stream){    
    Player.setStream(stream);    
  }
  

}]);
