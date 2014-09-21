$(function () {

    var keyboardEN = [
        {
            letter: 'q',
            code: 81,
            soundId: 1
        },
        {
            letter: 'w',
            code: 87,
            soundId: 2
        },
        {
            letter: 'e',
            code: 69,
            soundId: 3
        },
        {
            letter: 'r',
            code: 82,
            soundId: 4
        },
        {
            letter: 't',
            code: 84,
            soundId: 5
        },
        {
            letter: 'y',
            code: 89,
            soundId: 6
        },
        {
            letter: 'u',
            code: 85,
            soundId: 7
        },
        {
            letter: 'i',
            code: 73,
            soundId: 8
        },
        {
            letter: 'o',
            code: 79,
            soundId: 9
        },
        {
            letter: 'p',
            code: 80,
            soundId: 10
        },
        {
            letter: 'a',
            code: 65,
            soundId: 11
        },
        {
            letter: 's',
            code: 83,
            soundId: 12
        },
        {
            letter: 'd',
            code: 68,
            soundId: 13
        },
        {
            letter: 'f',
            code: 70,
            soundId: 14
        },
        {
            letter: 'g',
            code: 71,
            soundId: 15
        },
        {
            letter: 'h',
            code: 72,
            soundId: 16
        }
    ];

    Mpc = {
        init: function () {            
            this.UI = {};
            this.status = {
                isDisplay: false
            };
            this.UI.mpc = $('.mpc');
            this.UI.btnMpc = $('.mpc-btn');

            this.UI.keyboard = null;

            this.build();
            this.bind();
        },


        build: function () {
            var i, mask,
                that = this,
                height = $('body').height();

            this.UI.keyboard = $('<div>')
                .addClass('mpc-keyboard')
                .appendTo(this.UI.mpc);

            for (i =  0; i < keyboardEN.length; i++) {
                this.createKey(keyboardEN[i].code, keyboardEN[i].letter, keyboardEN[i].soundId);
            };


            this.UI.mask = $('<div>')
                .addClass('mpc-mask')
                .appendTo($('body'))
                .on('click', function () {
                    that.display(false);
                });

        },

        bind: function () {

            var that = this;

            this.UI.mpc.on('click touchstart', '.mpc-keyboard-key', function () {
                var playerAudio  = $(this).find('audio')[0];
                that.play(playerAudio);
            });

            this.UI.btnMpc.on('click', function () {
                if (that.status.isDisplay) {
                    that.display(false);
                } else {
                    that.display(true);
                }
            });
        },

        display: function (isDisplay) {
            var that = this;

            this.UI.mpc.stop().animate({
                top: isDisplay ? '80px' : '-800px'
            }, 500, function () {
                that.bindKeyboard(isDisplay);
                that.status.isDisplay = isDisplay;

                if (isDisplay) {
                    that.UI.mask.fadeIn();
                } else {
                    that.UI.mask.fadeOut();
                }
            });
        },

        bindKeyboard: function (isBind) {

            var doc = $(document);

            if (isBind) {
                doc.on('keydown', function(e) {
                    console.log(e);
                    var key  = $('.mpc-keyboard-key[data-code=' + e.keyCode + ']');
                        key.trigger('click');
                        key.addClass('active');
                });

                doc.on('keyup', function(e) {
                    var key  = $('.mpc-keyboard-key[data-code=' + e.keyCode + ']');
                        key.removeClass('active');
                });
            } else {
                doc.unbind('keydown');
                doc.unbind('keyup');
            }
        },

        createKey: function (code, letter, soundId) {
            var key, audio, source;

            key = $('<div>')
                .attr({
                    id: 'key-' + soundId,
                    'data-code': code
                })
                .text(letter)
                .addClass('mpc-keyboard-key')
                .appendTo(this.UI.keyboard);

            audio = $('<audio>')
                .addClass('mpc-sound').addClass('hidden')
                .appendTo(key);

            source = $('<source>')
                .attr({
                    src: 'js/mpc/sounds/' + soundId + '.mp3',
                    type: 'audio/mpeg'
                })
                .appendTo(audio);
        },

        play: function (playerAudio) {

            if (playerAudio.paused) {
                playerAudio.play();
            } else {
                playerAudio.currentTime = 0;
            }

        },
    }

    Mpc.init();

});