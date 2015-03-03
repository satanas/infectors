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
};

Storage.prototype.read = function(key) {
  if (!this.enabled) return null;
  return localStorage.getItem(key);
};

Storage.prototype.delete = function(key) {
  if (!this.enabled) return null;
  localStorage.removeItem(key);
};
