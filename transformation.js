'use strict';

var Transformation = function(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'transformation', 0);

  var anim = this.animations.add('main', [0, 1, 2, 3, 4], 20, false);
  anim.onComplete.add(function() {
    this.kill();
  }, this);
  this.animations.play('main');
  game.add.existing(this);
};

Transformation.prototype = Object.create(Phaser.Sprite.prototype);
Transformation.prototype.constructor = Transformation;

Transformation.prototype.update = function() {
  if (!this.alive) this.destroy();
};
