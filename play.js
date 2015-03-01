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
    this.sceneDelay = 500;

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
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.pauseKey.onUp.add(this.togglePause, this);
    this.ingameMenu = new IngameMenu(this);
  },

  update: function() {
    game.global.time += game.time.elapsed;
    if (groups.viruses.length === 0) {
      this.sceneDelay -= game.time.elapsed;
      if (this.sceneDelay <= 0) {
        game.state.start('summary');
      }
    }
  },

  pauseUpdate: function() {
    this.ingameMenu.update();
  },

  togglePause: function() {
    this.pausedGame = !this.pausedGame;
    if (this.pausedGame) {
      this.ingameMenu.show();
    } else {
      this.ingameMenu.hide();
    }
    game.paused = this.pausedGame;
  },

  //render: function() {
  //  game.debug.body(this.player);
  //  game.debug.bodyInfo(this.player, 10, 20);
  //}
};
