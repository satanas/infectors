'use strict';

var Hero = function(x, y, variant, map) {
  Phaser.Sprite.call(this, game, x, y, 'hero', 0);

  this.map = map;
  this.walking = false;
  this.variant = variant;
  this.direction = DIRECTION.DOWN;
  this.cursors = game.input.keyboard.createCursorKeys();

  this.animations.add(this.getAnimName(DIRECTION.DOWN, colorVariant.RED), [0, 1, 2], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.LEFT, colorVariant.RED), [3, 4, 5], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.RIGHT, colorVariant.RED), [6, 7, 8], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.UP, colorVariant.RED), [9, 10, 11], 12, true);

  this.animations.add(this.getAnimName(DIRECTION.DOWN, colorVariant.BLUE), [12, 13, 14], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.LEFT, colorVariant.BLUE), [15, 16, 17], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.RIGHT, colorVariant.BLUE), [18, 19, 20], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.UP, colorVariant.BLUE), [21, 22, 23], 12, true);

  this.animations.add(this.getAnimName(DIRECTION.DOWN, colorVariant.GREEN), [24, 25, 26], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.LEFT, colorVariant.GREEN), [27, 28, 29], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.RIGHT, colorVariant.GREEN), [30, 31, 32], 12, true);
  this.animations.add(this.getAnimName(DIRECTION.UP, colorVariant.GREEN), [33, 34, 35], 12, true);

  game.add.existing(this);
};

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.changeColor = function(newColor) {
  this.variant = newColor;
};

Hero.prototype.update = function() {
  if (!this.walking) {
    this.checkMovement();
    this.checkChanger();
    //this.render();
  }
};

Hero.prototype.move = function(xDir, yDir) {
  var newX, newY;
  var xDir = (this.cursors.left.isDown ? -1 : (this.cursors.right.isDown ? 1: 0));
  var yDir = (this.cursors.up.isDown ? -1 : (this.cursors.down.isDown ? 1: 0));

  if (yDir) {
    this.direction = (yDir > 0) ? 'down' : 'up';
    newX = this.x;
    newY = this.y + Math.floor(tileSize * yDir)
  } else if (xDir) {
    this.direction = (xDir > 0) ? 'right' : 'left';
    newX = this.x + Math.floor(tileSize * xDir);
    newY = this.y;
  }

  // TODO: Change the frame but do not move
  if (this.isWalkable(newX, newY)) {
    var capsule = this.findCapsule(newX, newY);
    console.log('capsule', capsule);
    if ((capsule === null) || (capsule.variant === this.variant && capsule.move(this.direction))) {
      this.walking = true;
      this.animations.play(this.getAnimName());

      var tween = game.add.tween(this);
      tween.to({
        x: newX,
        y: newY
      }, 200, Phaser.Easing.Linear.None, true);

      tween.onComplete.add(function(){
        this.walking = false;
        this.animations.stop();
        this.animations.getAnimation(this.getAnimName(this.direction, this.variant)).frame = 0;
      }, this);
    }
  }
};

Hero.prototype.checkMovement = function() {
  var xDir = (this.cursors.left.isDown ? -1 : (this.cursors.right.isDown ? 1: 0));
  var yDir = (this.cursors.up.isDown ? -1 : (this.cursors.down.isDown ? 1: 0));
  if (yDir !== 0) {
    this.move(null, yDir);
  } else if (xDir !== 0) {
    this.move(xDir, null);
  }
};

Hero.prototype.checkChanger = function() {
  var chg = null, self = this;
  groups.changers.forEachAlive(function(c) {
    if (c.x === self.x && c.y === self.y) chg = c;
  });

  if (chg !== null && chg.variant !== this.variant) {
    this.variant = chg.variant;
    this.animations.stop();
    this.animations.getAnimation(this.getAnimName()).frame = 0;
  }
};

Hero.prototype.isWalkable = function(x, y) {
  return !this.map.hasTile(x / 32, y / 32, 'Walls');
};

Hero.prototype.findCapsule = function(x, y) {
  var rtn = null;
  groups.capsules.forEachAlive(function(cap) {
    if (cap.x === x && cap.y === y) rtn = cap;
  });
  return rtn;
};

Hero.prototype.getAnimName = function(direction, color) {
  if (!direction && !color) {
    return this.direction + '-' + this.variant;
  } else {
    return direction + '-' + color;
  }
};
