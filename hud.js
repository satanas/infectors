'use strict';

var HUD = function() {
  Phaser.Sprite.call(this, game, 0, 416, 'hud', 0);

  var textSize = 26;
  var y = 435;
  this.fixedToCamera = true;
  this.levelLabel = game.add.bitmapText(35, y, uiFonts.HUD, 'Level: ' + game.global.level.toString(), textSize);
  game.add.bitmapText(230, y, uiFonts.HUD, 'Moves: ', textSize);
  this.movesLabel = game.add.bitmapText(340, y, uiFonts.HUD, game.global.moves.toString(), textSize);
  game.add.bitmapText(515, y, uiFonts.HUD, 'x', textSize);
  this.virusesLabel = game.add.bitmapText(550, y, uiFonts.HUD, groups.viruses.length.toString(), textSize);

  groups.hud.add(this);
};

HUD.prototype = Object.create(Phaser.Sprite.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function() {
  this.movesLabel.setText(game.global.moves.toString());
  this.virusesLabel.setText(groups.viruses.length.toString());
};
