'use strict';

function randomString() {
  return Math.random().toString(36).substr(2, 10) + '-' + new Date().getTime();
}

module.exports = randomString;
