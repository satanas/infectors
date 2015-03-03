'use strict';

var AudioPool = function(keys) {
  this.keys = keys;
  this.sounds = []

  for(var i=0; i<this.keys.length; i++) {
    this.sounds.push(game.add.audio(this.keys[i]));
  }
};

AudioPool.prototype.constructor = AudioPool;

AudioPool.prototype.randomPlay = function(loop, volume) {
  var volume = (volume === undefined) ? 1.0 : volume
  var loop = (loop === undefined) ? false : loop
  var index = Math.floor(Math.random() * this.keys.length);

  this.sounds[index].play('', 0, 1, volume, loop);
};
