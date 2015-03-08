'use strict';

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
game.global = {
  level: 1,
  moves: 0,
  time: 0,
  totalLevels: 21
}
var debug = false;
var groups = {};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('intro', introState);
game.state.add('play', playState);
game.state.add('summary', summaryState);
game.state.add('win', winState);

game.state.start('boot');
