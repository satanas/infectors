'use strict';

var Changer = function(x, y, type) {
  Phaser.Sprite.call(this, game, x, y, 'changers', 0);

  this.variant = type;
  if (type === colorVariant.RED) {
    this.frame = 0;
  } else if (type === colorVariant.BLUE) {
    this.frame = 1;
  } else if (type === colorVariant.GREEN) {
    this.frame = 2;
  }
  groups.changers.add(this);
};

Changer.prototype = Object.create(Phaser.Sprite.prototype);
Changer.prototype.constructor = Changer;
