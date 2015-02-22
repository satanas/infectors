'use strict';

var bootState = {
  preload: function() {
    game.load.image('progressbar', 'assets/images/progressbar.png');
    game.load.bitmapFont('engeexpa', 'assets/fonts/engeexpa.png', 'assets/fonts/engeexpa.fnt');
  },

  create: function() {
    game.stage.backgroundColor = '#000';
    game.state.start('load');
  }
};
