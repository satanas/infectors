'use strict';

var Hero = function(x, y, variant, facing, map) {
  Phaser.Sprite.call(this, game, x, y, 'hero', 0);

  this.map = map;
  this.walking = false;
  this.variant = variant;
  this.direction = facing;
  this.cursors = game.input.keyboard.createCursorKeys();

  var t = this;
  var i = -1;
  [colorVariant.RED, colorVariant.BLUE, colorVariant.GREEN].forEach(function (color) {
    [DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP].forEach(function (dir) {
      var arr = [];
      for (var j=0; j < 3 ; ++j) {
        arr.push(++i);
      }
      t.animations.add(t.getAnimName(dir, color), arr, 12, true);
    })
  });

  this.changerSound = game.add.audio('changer');
  this.walkingSound = game.add.audio('walking');
  this.blockedSound = game.add.audio('blocked');

  this.render();
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
  }
};

Hero.prototype.move = function(xDir, yDir) {
  var newX, newY;

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
    var capsule = findCapsule(newX, newY);
    if ((capsule === null) || (capsule.variant === this.variant && capsule.move(this.direction))) {
      this.walking = true;
      this.walkingSound.play();
      this.animations.play(this.getAnimName());

      var tween = game.add.tween(this);
      tween.to({
        x: newX,
        y: newY
      }, 200, Phaser.Easing.Linear.None, true);

      tween.onComplete.add(function(){
        this.walking = false;
        game.global.moves += 1;
        this.render();
      }, this);
    } else {
      this.blockedSound.play();
    }
  } else {
    this.blockedSound.play();
  }
};

Hero.prototype.render = function() {
  this.animations.stop();
  this.animations.getAnimation(this.getAnimName(this.direction, this.variant)).frame = 0;
};

Hero.prototype.isWalkable = function(x, y) {
  return !this.map.hasTile(x / 32, y / 32, 'Walls');
};

Hero.prototype.getAnimName = function(direction, color) {
  if (!direction && !color) {
    return this.direction + '-' + this.variant;
  } else {
    return direction + '-' + color;
  }
}

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
  var self = this;
  var chg = findChanger(this.x, this.y);

  if (chg !== null && chg.variant !== this.variant) {
    var transf = new Transformation(this.x, this.y);
    this.changerSound.play();
    this.variant = chg.variant;
    this.animations.stop();
    this.animations.getAnimation(this.getAnimName()).frame = 0;
  }
};
