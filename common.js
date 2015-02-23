'use strict';

var tileSize = 32;
var colorVariant = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green'
};
var DIRECTION = {
  DOWN: 'down',
  UP: 'up',
  LEFT: 'left',
  RIGHT: 'right'
};

function findCapsule(x, y) {
  return _find(x, y, groups.capsules);
}

function findVirus(x, y) {
  return _find(x, y, groups.viruses);
};

function findChanger(x, y) {
  return _find(x, y, groups.changers);
};

function _find(x, y, group) {
  var rtn = null;
  group.forEachAlive(function(v) {
    if (v.x === x && v.y === y) rtn = v;
  });
  return rtn;
}
