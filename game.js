'use strict';

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
game.global = {
  level: 1
}
var debug = false;
var groups = {};
var colorVariant = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green'
};
var tileSize = 32;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
