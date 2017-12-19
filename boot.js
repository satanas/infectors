'use strict';

var bootState = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  },

  preload: function() {
    game.load.image('progressbar', 'assets/images/progressbar.png');
    game.load.bitmapFont('engeexpa', 'assets/fonts/engeexpa.png', 'assets/fonts/engeexpa.fnt');
  },

  create: function() {
    game.stage.backgroundColor = '#000';
    game.state.start('load');
  }
};
