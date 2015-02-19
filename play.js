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

    groups.enemies = game.add.group();
    groups.enemies.enableBody = true;

    groups.capsules = game.add.group();
    groups.capsules.enableBody = true;

    groups.changers = game.add.group();
    groups.changers.enableBody = true;

    groups.hud = game.add.group();

    this.map = game.add.tilemap(game.global.level.toString());
    this.map.addTilesetImage('walls', 'walls');
    this.map.addTilesetImage('grounds', 'grounds');
    groups.walls = this.map.createLayer('Walls');
    this.map.createLayer('Grounds');
    this.map.setCollisionBetween(1, 18, true, 'Walls');

    var e = this.map.objects['Hero'][0];
    var y = e.y - this.map.tileHeight;
    var color = e.properties.color;
    this.player = new Hero(e.x, y, null, this.map);

    var self = this;
    this.map.objects['Capsules'].forEach(function(e) {
      var y = e.y - self.map.tileHeight;
      var cap = new Capsule(e.x, y, e.properties.type);
    });

    //this.map.objects['Changers'].forEach(function(e) {
    //  var y = e.y - self.map.tileHeight;
    //  var cap = new Capsule(e.x, y, e.properties.type);
    //});

    //this.map.objects['Enemies'].forEach(function(e) {
    //  var y = e.y - self.map.tileHeight;

    //  if (e.properties.type === 'acerbus') {
    //    self.boss = new Acerbus(self.game, self.player, e.x, y);
    //  }
    //});

    //groups.walls.debug = true;

    //this.game.world.bringToTop(groups.grounds);
    game.world.bringToTop(groups.walls);
    game.world.bringToTop(groups.capsules);
    game.world.bringToTop(groups.changers);
    //this.game.world.bringToTop(groups.enemies);
  },


  //render: function() {
  //  game.debug.body(this.player);
  //  game.debug.bodyInfo(this.player, 10, 20);
  //}
};
