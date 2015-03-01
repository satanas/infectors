'use strict';

var loadState = {
  preload: function() {
    bitmapTextCentered(150, 'engeexpa', 'Loading...', 30);

    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressbar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    game.load.image('title', 'assets/images/title.png');
    game.load.image('walls', 'assets/images/walls.png');
    game.load.image('grounds', 'assets/images/grounds.png');
    game.load.image('summary', 'assets/images/summary.png');
    game.load.image('menu', 'assets/images/menu.png');
    game.load.image('cursor', 'assets/images/cursor.png');

    game.load.spritesheet('hero', 'assets/images/character.png', 32, 32);
    game.load.spritesheet('capsules', 'assets/images/capsules.png', 32, 32);
    game.load.spritesheet('viruses', 'assets/images/viruses.png', 32, 32);
    game.load.spritesheet('changers', 'assets/images/changers.png', 32, 32);

    game.load.audio('capture', 'assets/sounds/capture.mp3');
    game.load.audio('changer', 'assets/sounds/changer.mp3');
    game.load.audio('walking', 'assets/sounds/walking.mp3');
    game.load.audio('option', 'assets/sounds/cursor.mp3');
    game.load.audio('select', 'assets/sounds/select.mp3');

    game.load.tilemap('1', 'assets/maps/1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('2', 'assets/maps/2.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    game.state.start('menu');
  }
};
