'use strict';

var loadState = {
  preload: function() {
    bitmapTextCentered(game, 150, 'engeexpa', 'Loading...', 30);

    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressbar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    game.load.image('title', 'assets/images/title.png');
    game.load.image('walls', 'assets/images/walls.png');
    game.load.image('grounds', 'assets/images/grounds.png');
    game.load.spritesheet('hero', 'assets/images/character.png', 32, 32);
    game.load.spritesheet('capsules', 'assets/images/capsules.png', 32, 32);

    game.load.tilemap('1', 'assets/maps/1.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    game.state.start('menu');
  }
};
