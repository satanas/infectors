'use strict';

var Storage = function() {
  // Check for support
  try {
    this.enabled = 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    this.enabled = false;
  }
};

Storage.prototype.constructor = Storage;

Storage.prototype.save = function(key, value) {
  if (!this.enabled) return null;
  var i = localStorage.setItem(key, value);
  console.log('save', i);
};

Storage.prototype.read = function(key) {
  if (!this.enabled) return null;
  var i = localStorage.getItem(key);
  console.log('read', i);
  return i;
};
