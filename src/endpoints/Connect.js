'use strict';

var checkOption = require('../helpers/checkOption');
var Request = require('../client/Request');

const endpoint = '/auth/connect';

function checkOptions(o) {
  checkOption('options.requestId', o.requestId, 'string', true);
  checkOption('options.returnUrl', o.returnUrl, 'string', true);
  checkOption('options.scope', o.scope, 'array', false);

  return o;
}

function Connect(o) {
  this.o = checkOptions(o);
}

Connect.prototype.execute = function (callback) {
  var r, body;

  checkOption('execute(attribute callback)', callback, 'function', true);

  this.o.method = 'POST';
  this.o.endpoint = endpoint;

  r = new Request(this.o);
  body = {
    'request_id': this.o.requestId,
    'scope': this.o.scope,
    'return_url': this.o.returnUrl
  };

  r.send(body, function (response) {
    if (response.body.result >= 200 && response.body.result < 300) {
      callback(response.body);
    } else {
      throw new Error(response.body.debug.message);
    }
  });
};

module.exports = Connect;
