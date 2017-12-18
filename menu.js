'use strict';

var menuState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'title');
    bitmapTextCentered(430, uiFonts.INSTRUCTIONS, 'Created by Wil Alvarez', 14);
    bitmapTextCentered(450, uiFonts.INSTRUCTIONS, 'Music by David Senabre', 14);
    bitmapTextCentered(350, uiFonts.TITLE, 'Press ENTER to start', 28);

    var storage = new Storage();

    this.currentLevel = parseInt(storage.read('level.current'));
    if (this.enableLevelSelection()) {
      this.level = this.currentLevel;
      this.selectLabel = game.add.bitmapText(190, 280, uiFonts.TITLE, 'Select level', 30);
      this.arrowLeft = game.add.sprite(375, 290, 'arrowleft');
      this.arrowRight = game.add.sprite(455, 290, 'arrowright');
      this.levelLabel = game.add.bitmapText(408, 285, uiFonts.TITLE, '00', 30);

      var moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      var moveRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      moveLeft.onDown.add(this.decreaseLevel, this);
      moveRight.onDown.add(this.increaseLevel, this);
    }

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.enterPressed, this);
    this.bgmSound = game.add.audio('main');
    this.bgmSound.play();
  },

  enableLevelSelection: function() {
    return this.currentLevel !== null && this.currentLevel > 1;
  },

  decreaseLevel: function() {
    this.level -= 1;
    if (this.level < 1) this.level = 1;
  },

  increaseLevel: function() {
    this.level += 1;
    if (this.level > this.currentLevel) this.level = this.currentLevel;
  },

  enterPressed: function() {
    if (this.enableLevelSelection()) {
      game.global.level = this.level;
      executeGameEvent('start', game.global.level);
    } else {
      executeGameEvent('start');
    }
    this.start();
  },

  start: function() {
    if (this.enableLevelSelection()) {
      game.state.start('play');
    } else {
      game.state.start('intro');
    }
  },

  update: function() {
    if (this.enableLevelSelection()) {
      var level = this.level.toString();
      this.levelLabel.setText(level);
      if (this.level === this.currentLevel) {
        this.arrowLeft.revive();
        this.arrowRight.kill();
      } else if (this.level === 1) {
        this.arrowLeft.kill();
        this.arrowRight.revive();
      } else {
        this.arrowLeft.revive();
        this.arrowRight.revive();
      }
    }
  }
};
