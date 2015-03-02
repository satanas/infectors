'use strict';

var introState = {
  create: function() {
    bitmapTextCentered(150, uiFonts.TITLE, 'Planet earth has been infected for hundred of', 26);
    bitmapTextCentered(180, uiFonts.TITLE, 'viruses. To save the world you must capture', 26);
    bitmapTextCentered(210, uiFonts.TITLE, 'them usin cryogenic capsules.', 26);
    bitmapTextCentered(250, uiFonts.TITLE, 'Future of humanity is in your hands', 26);
    bitmapTextCentered(450, uiFonts.TITLE, 'Press ENTER to continue', 18);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('play');
  }
};
