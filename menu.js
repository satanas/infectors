'use strict';

var menuState = {
  create: function() {
    game.add.image(0, 0, 'title');
    bitmapTextCentered(450, 'engeexpa', 'Press ENTER to start', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
    this.bgmSound = game.add.audio('main');
    this.bgmSound.play();
  },

  start: function() {
    game.state.start('play');
  }
};
