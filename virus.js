'use strict';

var Virus = function(x, y, type) {
  Phaser.Sprite.call(this, game, x, y, 'viruses', 0);

  this.variant = type;
  if (type === colorVariant.RED) {
    this.frame = 0;
  } else if (type === colorVariant.BLUE) {
    this.frame = 1;
  } else if (type === colorVariant.GREEN) {
    this.frame = 2;
  }
  groups.viruses.add(this);
};

Virus.prototype = Object.create(Phaser.Sprite.prototype);
Virus.prototype.constructor = Virus;
