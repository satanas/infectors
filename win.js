'use strict';

var winState = {
  create: function() {
    bitmapTextCentered(90, 'engeexpa', 'You won!', 38);
    // Score
    bitmapTextCentered(170, 'engeexpa', 'Congratulations! You have saved the earth from', 25);
    bitmapTextCentered(200, 'engeexpa', 'the infectors invasion through ' + game.global.level + ' levels. You', 25);
    bitmapTextCentered(230, 'engeexpa', 'are a smart and true warrior but be careful...', 25);
    bitmapTextCentered(280, 'engeexpa', 'They could be back', 25);

    bitmapTextCentered(439, 'engeexpa', 'Press ENTER to go to the menu', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.exit, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio('win');
    this.bgmSound.play();
  },

  exit: function() {
    game.state.start('menu');
  }
};
