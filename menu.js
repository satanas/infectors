'use strict';

var menuState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'title');
    var licenseImage = game.add.image(game.world.centerX, 425, 'creativecommons');
    licenseImage.scale.setTo(0.8, 0.8);
    licenseImage.anchor.set(0.5);

    bitmapTextCentered(350, uiFonts.TITLE, 'Press ENTER to start', 28);

    var licenseLabel = game.add.text(80, 450,
      'Created by Wil Alvarez. Music by David Senabre.\nLicensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.',
      {font: '12px Arial', fill: '#fff', align: 'center'});
    //licenseLabel.anchor.set(0.5);
    licenseLabel.x = Math.round(licenseLabel.x);

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
    enterKey.onDown.addOnce(this.start, this);
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

  start: function() {
    if (this.enableLevelSelection()) {
      game.global.level = this.level;
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
