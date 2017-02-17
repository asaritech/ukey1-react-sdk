'use strict';

var checkOption = require('../helpers/checkOption');
var Request = require('../client/Request');

const endpoint = '/auth/token';

function checkOptions(o) {
  checkOption('options.requestId', o.requestId, 'string', true);
  checkOption('options.connectId', o.connectId, 'string', true);

  return o;
}

function AccessToken(o) {
  this.o = checkOptions(o);
}

AccessToken.prototype.execute = function (callback) {
  var r, body;

  checkOption('execute(attribute callback)', callback, 'function', true);

  this.o.method = 'POST';
  this.o.endpoint = endpoint;

  r = new Request(this.o);
  body = {
    'request_id': this.o.requestId,
    'connect_id': this.o.connectId
  };

  r.send(body, function (response) {
    if (response.body.result >= 200 && response.body.result < 300) {
      callback(response.body);
    } else {
      throw new Error(response.body.debug.message);
    }
  });
};

module.exports = AccessToken;
