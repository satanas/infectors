'use strict';

function bitmapTextCentered(y, font, text, size) {
  var label = game.add.bitmapText(0, y, font, text, size);
  label.updateTransform();
  label.x = (game.width - label.width) / 2;
  return label;
}
