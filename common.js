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
var uiFonts = {
  TITLE: 'engeexpa',
  HUD: 'zerothre',
  RECORD: 'record',
  INSTRUCTIONS: 'instructions'
};

function findCapsule(x, y) {
  return _find(x, y, groups.capsules);
}

function findVirus(x, y) {
  return _find(x, y, groups.viruses);
}

function findChanger(x, y) {
  return _find(x, y, groups.changers);
}

function _find(x, y, group) {
  var rtn = null;
  group.forEachAlive(function(v) {
    if (v.x === x && v.y === y) rtn = v;
  });
  return rtn;
}

function humanizeTime(time) {
  if (time === undefined || time === null) return "--";

  time = time / 1000;
  var min = Math.floor(time / 60).toString();
  var sec = Math.ceil(time % 60).toString();
  if (min.length === 1) min = "0" + min
  if (sec.length === 1) sec = "0" + sec
  return min + ':' + sec;
}

function deleteStats() {
  var storage = new Storage();
  storage.delete('level.current');
  for (var i=1; i<=game.global.totalLevels; i++) {
    var bestMovesKey = ['level', i, 'moves'].join('.');
    var bestTimeKey = ['level', i, 'time'].join('.');
    storage.delete(bestMovesKey);
    storage.delete(bestTimeKey);
  }
}
