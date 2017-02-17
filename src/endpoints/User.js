'use strict';

var checkOption = require('../helpers/checkOption');
var Request = require('../client/Request');

const endpoint = '/me';

function checkOptions(o) {
  checkOption('options.accessToken', o.accessToken, 'string', true);

  return o;
}

function User(o) {
  this.o = checkOptions(o);
}

User.prototype.execute = function (callback) {
  var r, body = '';

  checkOption('execute(attribute callback)', callback, 'function', true);

  this.o.method = 'GET';
  this.o.endpoint = endpoint;

  r = new Request(this.o);

  r.send(body, function (response) {
    if (response.body.result >= 200 && response.body.result < 300) {
      callback(response.body);
    } else {
      throw new Error(response.body.debug.message);
    }
  });
};

module.exports = User;
