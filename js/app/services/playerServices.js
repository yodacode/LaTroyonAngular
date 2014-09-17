var playerServices = angular.module('playerServices', ['ngResource']);

playerServices.factory('Player', [ '$rootScope', function($rootScope) {
	var factory = {

        track: false,
		isPlaying: false,
        isLoading: false,

        init: function (track) {

        	this.track = track;
        	track.totalTimeSecond = track.length;
        	track.totalTime = this.readableDuration(track.length);
        	track.currentTime = this.readableDuration(0);
        	$rootScope.$broadcast('player:init', track);

        	return this;
        },

		play: function () {
			var that = this;

			this.pause();

			if (this.track) {

				this.load(function () {
					that.song.play();
					that.song.isPlaying = true;
					that.updateTimeLine();
					console.log('Song is playing...')
				});

			} else {
				console.log("You need to init a track before play");
			}
		},

		pause: function () {
            if (this.song) {
                this.song.pause();
            }
        },

        resume: function (toTime) {
            if (this.song) {
                this.song.currentTime = toTime;
                this.song.play();
                $rootScope.$broadcast('player:isLoading', true);
            }
        },

		load: function (callback) {
			var that = this;

			this.song = new Audio(this.track.stream);
			this.song.addEventListener('loadedmetadata', function() {
                that.isLoading = true;
                $rootScope.$broadcast('player:isLoading', true);
				callback();
			});

            this.song.addEventListener('canplaythrough', function() {
                that.isLoading = false;
                $rootScope.$broadcast('player:isLoading', false);
            });
		},

        getTrackPercent: function (currentTime, totalTime) {
            var percent = ((parseInt(currentTime) / parseInt(totalTime)) * 100);
            return Math.round(percent * 100) / 100;
        },

		updateTimeLine: function () {
            var that = this;

            this.intervalTimeline = setInterval(function() {
            	that.track.currentTime = that.song.currentTime;
            	$rootScope.$broadcast('player:updateTimeLine', {
            		currentTime: that.readableDuration(that.track.currentTime),
            		totalTime: that.track.totalTime,
                    totalTimeSecond: parseInt(that.track.totalTimeSecond),
                    currentTimeSecond: that.track.currentTime,
            		trackPercent: that.getTrackPercent(that.song.currentTime, that.track.totalTimeSecond)
            	});
	        }, 1000);
        },

        timelineStop: function () {
            clearInterval(this.intervalTimeline);
        },

		readableDuration : function (seconds) {
            var sec = Math.floor(seconds),
                min = Math.floor( sec / 60 );

            min = min >= 10 ? min : '0' + min;
            sec = Math.floor( sec % 60 );
            sec = sec >= 10 ? sec : '0' + sec;

            return min + ':' + sec;
        },

        getCurrentTrack: function () {
        	if (this.track) {
        		return this.track;
        	}
        }
	}

	return factory;
}]);