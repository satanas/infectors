'use strict';

var IngameMenu = function(play) {
  this.play = play;
  this.option = 0;

  this.cursorSound = game.add.audio('option');
  this.selectSound = game.add.audio('select');

  this.pauseKeyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.pauseKeyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  this.pauseKeyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
};

IngameMenu.prototype.constructor = IngameMenu;

IngameMenu.prototype.update = function() {
  if (this.option === 0) {
      this.cursor.y = 165;
  } else if (this.option === 1) {
      this.cursor.y = 225;
  } else if (this.option === 2) {
      this.cursor.y = 285;
  }
};

IngameMenu.prototype.show = function() {
  this.option = 0;

  this.mask = game.add.graphics(game.camera.x, game.camera.y);
  this.mask.beginFill(0x000000, 1);
  this.mask.drawRect(game.camera.x, game.camera.y, game.width, game.height);
  this.mask.alpha = 0.5;
  this.mask.endFill();

  this.menuBg = game.add.sprite(195, 100, 'menu');
  this.cursor = game.add.sprite(243, 165, 'cursor');
  this.continueLabel = bitmapTextCentered(160, 'engeexpa', 'Continue', 30);
  this.restartLabel = bitmapTextCentered(220, 'engeexpa', 'Restart', 30);
  this.quitLabel = bitmapTextCentered(280, 'engeexpa', 'Quit', 30);

  this.pauseKeyUp.onDown.add(this.moveCursorUp, this);
  this.pauseKeyDown.onDown.add(this.moveCursorDown, this);
  this.pauseKeyEnter.onDown.add(this.executeMenuOption, this);
};

IngameMenu.prototype.hide = function() {
  this.mask.destroy();
  this.menuBg.destroy();
  this.continueLabel.destroy();
  this.restartLabel.destroy();
  this.quitLabel.destroy();
  this.cursor.destroy();

  this.pauseKeyUp.onDown.removeAll();
  this.pauseKeyDown.onDown.removeAll();
  this.pauseKeyEnter.onDown.removeAll();
};

IngameMenu.prototype.moveCursorDown = function() {
  this.cursorSound.play();
  this.option += 1;
  if (this.option > 2) this.option = 0;
};

IngameMenu.prototype.moveCursorUp = function() {
  this.cursorSound.play();
  this.option -= 1;
  if (this.option < 0) this.option = 2;
};

IngameMenu.prototype.executeMenuOption = function() {
  this.selectSound.play();

  if (this.option === 1) {
    game.state.start('play');
  } else if (this.option === 2) {
    game.state.start('menu');
  }
  this.play.togglePause();
};
