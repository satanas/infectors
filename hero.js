'use strict';

var Hero = function(x, y, variant, map) {
  Phaser.Sprite.call(this, game, x, y, 'hero', 0);

  this.map = map;
  this.variant = variant;
  this.walking = false;
  this.cursors = game.input.keyboard.createCursorKeys();

  this.animations.add('down-' + colorVariant.RED, [0, 1, 2], 12, true);
  this.animations.add('left-' + colorVariant.RED, [3, 4, 5], 12, true);
  this.animations.add('right-' + colorVariant.RED, [6, 7, 8], 12, true);
  this.animations.add('up-' + colorVariant.RED, [9, 10, 11], 12, true);

  this.animations.add('down-' + colorVariant.BLUE, [12, 13, 14], 12, true);
  this.animations.add('left-' + colorVariant.BLUE, [15, 16, 17], 12, true);
  this.animations.add('right-' + colorVariant.BLUE, [18, 19, 20], 12, true);
  this.animations.add('up-' + colorVariant.BLUE, [21, 22, 23], 12, true);

  this.animations.add('down-' + colorVariant.GREEN, [24, 25, 26], 12, true);
  this.animations.add('left-' + colorVariant.GREEN, [27, 28, 29], 12, true);
  this.animations.add('right-' + colorVariant.GREEN, [30, 31, 32], 12, true);
  this.animations.add('up-' + colorVariant.GREEN, [33, 34, 35], 12, true);

  game.add.existing(this);
};

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.changeColor = function(newColor) {
  this.variant = newColor;
};

Hero.prototype.update = function() {
  if (!this.walking) {
    var xDir = (this.cursors.left.isDown ? -1 : (this.cursors.right.isDown ? 1: 0));
    var yDir = (this.cursors.up.isDown ? -1 : (this.cursors.down.isDown ? 1: 0));
    if (yDir !== 0) {
      this.move(null, yDir);
    } else if (xDir !== 0) {
      this.move(xDir, null);
    }
    var chg = this.onChanger();
    console.log('chg', chg, this.variant);
    if (chg !== null && chg.variant !== this.variant) {
      console.log('transformation');
      this.variant = chg.variant;
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
      this.animations.play(direction + '-' + this.variant);
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
  groups.capsules.forEachAlive(function(cap) {
    if (cap.x === x && cap.y === y) rtn = cap;
  });
  return rtn;
};

Hero.prototype.onChanger = function() {
  var rtn = null;
  var self = this;
  groups.changers.forEachAlive(function(chg) {
    console.log(chg.x, chg.y, self.x, self.y);
    if (chg.x === self.x && chg.y === self.y) rtn = chg;
  });
  return rtn;
};
