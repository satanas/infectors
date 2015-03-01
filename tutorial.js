'use strict';

// This object renders on-screen information for level 1 and 2 (tutorial levels)
var Tutorial = function(player) {
  this.fontSize = 20;
  this.yLabel = 20;
  this.step = 0;
  this.player = player;

  if (game.global.level === 1) {
    this.tutorialLabel = bitmapTextCentered(this.yLabel, uiFonts.TITLE, 'Capture the red virus with the red capsule', this.fontSize);
  } else if (game.global.level === 2) {
    this.tutorialLabel = bitmapTextCentered(this.yLabel, uiFonts.TITLE, 'Change to the proper suit to capture the viruses', this.fontSize);
  }
};

Tutorial.prototype.constructor = Tutorial;

Tutorial.prototype.update = function() {
  if (game.global.level > 2) return;

  if (game.global.level === 1) {
    if (groups.viruses.length === 1 && this.step === 0) {
      this.step = 1;
      this.tutorialLabel.destroy();
      this.tutorialLabel = bitmapTextCentered(this.yLabel, uiFonts.TITLE, 'Now change to the green suit to capture the green virus', this.fontSize);
    }
  } else if (game.global.level === 2) {
    if (this.player.variant !== colorVariant.GREEN && this.step === 0) {
      this.step = 1;
      this.tutorialLabel.destroy();
      this.tutorialLabel = bitmapTextCentered(this.yLabel, uiFonts.TITLE, 'Now go capture those filthy viruses', this.fontSize);
    }
  }
};
