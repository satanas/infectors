'use strict';

var AudioPool = function(keys) {
  this.keys = keys;
  this.sounds = []

  for(var i=0; i<this.keys.length; i++) {
    this.sounds.push(game.add.audio(this.keys[i]));
  }
};

AudioPool.prototype.randomPlay = function() {
  var index = Math.floor(Math.random() * this.keys.length);
  this.sounds[index].play();
};
