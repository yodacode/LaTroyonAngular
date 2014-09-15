var playerServices = angular.module('playerServices', ['ngResource']);

playerServices.factory('Player', function () {
	var factory = {
		setStream: function (stream) {
			if (this.song) {
				console.log(this.song);
				this.song.pause();
			}
			this.stream = stream;
			console.log('setStream ' + this.stream);			
		},
		play: function () {
			var that = this;
			this.load(function () {
				that.song.play();
				console.log('Song is playing...')
			});
		},

		load: function (callback) {
			this.song = new Audio(this.stream);
			this.song.addEventListener('loadedmetadata', function() {
				callback();
			});
		}
	}

	return factory;
});