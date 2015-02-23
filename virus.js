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

  if (type === colorVariant.RED) {
    this.animations.add('main', [0, 3, 6, 9], 12, true);
  } else if (type === colorVariant.BLUE) {
    this.animations.add('main', [1, 4, 7, 10], 12, true);
  } else if (type === colorVariant.GREEN) {
    this.animations.add('main', [2, 5, 8, 11], 12, true);
  }
  this.animations.play('main');
  groups.viruses.add(this);
};

Virus.prototype = Object.create(Phaser.Sprite.prototype);
Virus.prototype.constructor = Virus;

Virus.prototype.update = function() {
  if (!this.alive) {
    this.destroy();
  }
};
