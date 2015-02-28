'use strict';

/*
chg1 = red
chg2 = blue
chg3 = green
*/
var playState = {
  create: function() {
    this.map = null;
    this.player = null;

    game.global.moves = 0;
    game.global.time = 0;

    groups.viruses = game.add.group();
    groups.capsules = game.add.group();
    groups.changers = game.add.group();
    groups.hud = game.add.group();

    groups.viruses.enableBody = true;
    groups.capsules.enableBody = true;
    groups.changers.enableBody = true;

    this.map = game.add.tilemap(game.global.level.toString());
    this.map.addTilesetImage('walls', 'walls');
    this.map.addTilesetImage('grounds', 'grounds');
    groups.walls = this.map.createLayer('Walls');
    this.map.createLayer('Grounds');
    this.map.setCollisionBetween(1, 18, true, 'Walls');

    var self = this;
    this.map.objects['Capsules'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var cap = new Capsule(e.x, y, e.properties.type, self.map);
    });

    this.map.objects['Changers'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var chg = new Changer(e.x, y, e.properties.type);
    });

    this.map.objects['Viruses'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var virus = new Virus(e.x, y, e.properties.type);
    });

    game.world.bringToTop(groups.walls);
    game.world.bringToTop(groups.capsules);
    game.world.bringToTop(groups.viruses);
    game.world.bringToTop(groups.changers);

    var e = this.map.objects['Hero'][0];
    var y = e.y - this.map.tileHeight;
    var facing = e.properties.facing || DIRECTION.DOWN;
    var variant = e.properties.color;
    this.player = new Hero(e.x, y, variant, facing, this.map);

    //groups.walls.debug = true;
    this.pausedGame = false;
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pauseKey.onUp.add(this.togglePause, this);
    this.pauseKeyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.pauseKeyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.pauseKeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },

  update: function() {
    game.global.time += game.time.elapsed;
    if (groups.viruses.length === 0) {
      game.state.start('summary');
    }
  },

  pauseUpdate: function() {
    if (this.menuOption === 0) {
        this.cursor.y = 165;
    } else if (this.menuOption === 1) {
        this.cursor.y = 225;
    } else if (this.menuOption === 2) {
        this.cursor.y = 285;
    }
  },

  togglePause: function() {
    this.pausedGame = !this.pausedGame;
    if (this.pausedGame) {
      this.showPauseMenu();
    } else {
      this.quitPauseMenu();
    }
    game.paused = this.pausedGame;
  },

  showPauseMenu: function() {
    this.menuOption = 0;

    this.mask = game.add.graphics(game.camera.x, game.camera.y);
    this.mask.beginFill(0x000000, 1);
    this.mask.drawRect(game.camera.x, game.camera.y, game.width, game.height);
    this.mask.alpha = 0.5;
    this.mask.endFill();

    this.menuBg = game.add.sprite(195, 100, 'menu');
    this.cursor = game.add.sprite(243, 165, 'cursor');
    this.continueLabel = bitmapTextCentered(160, 'engeexpa', 'Continue', 30);
    this.restartLabel = bitmapTextCentered(220, 'engeexpa', 'Restart', 30);
    this.quitLabel = bitmapTextCentered(280, 'engeexpa', 'Quit', 30);

    this.pauseKeyUp.onDown.add(this.moveCursorUp, this);
    this.pauseKeyDown.onDown.add(this.moveCursorDown, this);
    this.pauseKeyEnter.onDown.add(this.executeMenuOption, this);
  },

  quitPauseMenu: function() {
    this.mask.destroy();
    this.menuBg.destroy();
    this.continueLabel.destroy();
    this.restartLabel.destroy();
    this.quitLabel.destroy();
    this.cursor.destroy();

    this.pauseKeyUp.onDown.removeAll();
    this.pauseKeyDown.onDown.removeAll();
    this.pauseKeyEnter.onDown.removeAll();
  },

  moveCursorDown: function() {
    this.menuOption += 1;
    if (this.menuOption > 2) this.menuOption = 0;
  },

  moveCursorUp: function() {
    this.menuOption -= 1;
    if (this.menuOption < 0) this.menuOption = 2;
  },

  executeMenuOption: function() {
    if (this.menuOption === 1) {
      game.state.start('play');
    } else if (this.menuOption === 2) {
      game.state.start('menu');
    }
    this.togglePause();
  }

  //render: function() {
  //  game.debug.body(this.player);
  //  game.debug.bodyInfo(this.player, 10, 20);
  //}
};
