'use strict';

var Hero = function(x, y, color, map) {
  Phaser.Sprite.call(this, game, x, y, 'hero', 0);

  game.physics.arcade.enable(this);
  //this.body.setSize(32, 32, 0, 0);
  this.body.allowGravity = false;
  this.cursors = game.input.keyboard.createCursorKeys();
  this.animations.add('down-' + colorVariant.RED, [0, 1, 2], 12, true);
  this.animations.add('left-' + colorVariant.RED, [3, 4, 5], 12, true);
  this.animations.add('right-' + colorVariant.RED, [6, 7, 8], 12, true);
  this.animations.add('up-' + colorVariant.RED, [9, 10, 11], 12, true);
  this.variant = 'red';
  this.walking = false;
  this.nextX = null;
  this.nextY = null;

  this.map = map;

  game.add.existing(this);
};

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.onCollision = function(self, obj) {
  console.log('ble', self, obj);
};

Hero.prototype.update = function() {
  //game.physics.arcade.collide(this, groups.walls);

  var self = this;
  if (groups.walls) {
    //var tiles = groups.walls.getTiles(this.x - 32, this.y, 32, 32);
    //console.log('tiles', tiles);
    //tiles.forEach(function(item) {
    //  console.log('tile', self.x - 32, self.y, item.x, item.y);
    //});

    ////var _x = Math.floor((this.x - 32) / 32);
    ////var _y = (this.y / 32;
    ////var be = this.map.hasTile(_x, _y, 'Walls');
    //var layer = this.map.getLayer('Walls');
    //console.log('ble', this.x, _x, _y);
    //console.log('ble', this.map.layers[layer].data[_y][_x].index);
    ////console.log(be);
  }

  if (!this.walking) {
    var xDir = (this.cursors.left.isDown ? -1 : (this.cursors.right.isDown ? 1: 0));
    var yDir = (this.cursors.up.isDown ? -1 : (this.cursors.down.isDown ? 1: 0));
    if (yDir !== 0) {
      this.move(null, yDir);
    } else if (xDir !== 0) {
      this.move(xDir, null);
    }
  }
};

Hero.prototype.move = function(xDir, yDir) {
  var newX, newY, frame, direction;

  if (yDir) {
    direction = (yDir > 0) ? 'down' : 'up';
    frame = (yDir > 0) ? 0 : 9;
    newX = this.x;
    newY = this.y + Math.floor(tileSize * yDir)
  } else if (xDir) {
    direction = (xDir > 0) ? 'right' : 'left';
    frame = (xDir > 0) ? 6 : 3;
    newX = this.x + Math.floor(tileSize * xDir);
    newY = this.y;
  }

  console.log('player', this.x, this.y);
  console.log('next pos', newX, newY);
  // TODO: Change the frame but do not move
  if (this.isWalkable(newX, newY)) {
    var capsule = this.findCapsule(newX, newY);
    console.log('capsule', capsule);
    if ((capsule === null) || (capsule.variant === this.variant && capsule.move(direction))) {
      this.walking = true;
      this.animations.play(direction + '-red');
      var tween = game.add.tween(this);
      tween.to({
        x: newX,
        y: newY
      }, 200, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(function(){
        this.walking = false;
        this.animations.stop();
        this.frame = frame;
      }, this);
    }
  }
};

Hero.prototype.isWalkable = function(x, y) {
  return !this.map.hasTile(x / 32, y / 32, 'Walls');
};

Hero.prototype.findCapsule = function(x, y) {
  var rtn = null;
  //console.log('findCapsule', x, y);
  groups.capsules.forEachAlive(function(cap) {
    //console.log('  ', cap.x, cap.y, x, y);
    if (cap.x === x && cap.y === y) rtn = cap;
  });
  return rtn;
};
