'use strict';

var summaryState = {
  create: function() {
    var time = game.global.time / 1000;
    var min = Math.floor(time / 60).toString();
    var sec = Math.floor(time % 60).toString();
    if (min.length === 1) min = "0" + min
    if (sec.length === 1) sec = "0" + sec
    game.add.image(0, 0, 'summary');
    bitmapTextCentered(90, 'engeexpa', 'STAGE CLEARED', 38);
    // Score
    game.add.bitmapText(235, 170, 'engeexpa', 'Your steps:', 25);
    game.add.bitmapText(240, 200, 'engeexpa', 'Best steps:', 25);
    game.add.bitmapText(220, 230, 'engeexpa', 'Your time:', 25);
    game.add.bitmapText(385, 170, 'engeexpa', game.global.moves.toString(), 25);
    game.add.bitmapText(385, 200, 'engeexpa', game.global.moves.toString(), 25);
    game.add.bitmapText(350, 230, 'engeexpa', min + ':' + sec, 25);

    bitmapTextCentered(439, 'engeexpa', 'Press ENTER to play next level', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.next, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio('finish');
    this.bgmSound.play();
  },

  next: function() {
    game.global.level += 1;
    game.state.start('play');
  }
};
