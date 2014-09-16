var playerServices = angular.module('playerServices', ['ngResource']);

playerServices.factory('Player', function () {
	var factory = {
		data: false,
		play: function () {
			var that = this;

			if (this.data) {
				
				this.load(function () {
					that.song.play();
					console.log('Song is playing...')
				});

			} else {
				console.log("The player need a Track");
			}
		},
		load: function (callback) {
			var that = this;
			this.song = new Audio(this.data.stream);
			this.song.addEventListener('loadedmetadata', function() {
				that.data.totalTime = '12';
				callback();
			});
		},
		getTotalTime: function () {
			return this.readableDuration(this.data.length);
		},

		readableDuration : function (seconds) {
            var sec = Math.floor(seconds),
                min = Math.floor( sec / 60 );

                min = min >= 10 ? min : '0' + min;
                sec = Math.floor( sec % 60 );
                sec = sec >= 10 ? sec : '0' + sec;

            return min + ':' + sec;
        }
	}

	return factory;
});