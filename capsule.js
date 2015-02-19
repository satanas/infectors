'use strict';

var Capsule = function(x, y, type) {
  Phaser.Sprite.call(this, game, x, y, 'capsules', 0);

  //game.physics.arcade.enable(this);
  //this.body.allowGravity = false;
  this.color = type;
  if (type === capsuleType.RED) {
    this.frame = 0;
  } else if (type === capsuleType.BLUE) {
    this.frame = 1;
  } else if (type === capsuleType.GREEN) {
    this.frame = 2;
  }
  console.log(x, y, type);
  groups.capsules.add(this);
};

Capsule.prototype = Object.create(Phaser.Sprite.prototype);
Capsule.prototype.constructor = Capsule;

//Capsule.prototype.update = function() {
//};
