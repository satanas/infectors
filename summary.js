'use strict';

var summaryState = {
  create: function() {
    var storage = new Storage();
    //game.add.image(0, 0, 'summary');
    bitmapTextCentered(90, 'engeexpa', 'STAGE CLEARED', 38);

    var bestMovesKey = ['level', game.global.level, 'moves'].join('.');
    var bestTimeKey = ['level', game.global.level, 'time'].join('.');

    var bestMoves = storage.read(bestMovesKey);
    var bestTime = storage.read(bestTimeKey);

    // Score
    var movesFont = uiFonts.TITLE;
    var timeFont = uiFonts.TITLE;
    if (bestMoves === null || game.global.moves < bestMoves) {
      movesFont = uiFonts.RECORD;
      bitmapTextCentered(330, uiFonts.RECORD, 'You have set a new moves record!', 25);
      storage.save(bestMovesKey, game.global.moves);
    }
    if (bestTime === null || game.global.time < bestTime) {
      timeFont = uiFonts.RECORD;
      bitmapTextCentered(360, uiFonts.RECORD, 'You have set a new time record!', 25);
      storage.save(bestTimeKey, game.global.time);
    }
    game.add.bitmapText(235, 170, uiFonts.TITLE, 'Your moves:', 25);
    game.add.bitmapText(385, 170, movesFont, game.global.moves.toString(), 25);
    game.add.bitmapText(240, 200, uiFonts.TITLE, 'Best moves:', 25);
    game.add.bitmapText(385, 200, uiFonts.TITLE, bestMoves || '--', 25);
    game.add.bitmapText(240, 230, uiFonts.TITLE, 'Your time:', 25);
    game.add.bitmapText(370, 230, timeFont, humanizeTime(game.global.time), 25);
    game.add.bitmapText(245, 260, uiFonts.TITLE, 'Best time:', 25);
    game.add.bitmapText(370, 260, uiFonts.TITLE, humanizeTime(bestTime) || '--', 25);

    bitmapTextCentered(439, 'engeexpa', 'Press ENTER to play next level', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.next, this);
    game.sound.stopAll();
    this.bgmSound = game.add.audio('finish');
    this.bgmSound.play();

    game.global.level += 1;
    storage.save('level.current', game.global.level);
  },

  next: function() {
    game.state.start('play');
  }
};
