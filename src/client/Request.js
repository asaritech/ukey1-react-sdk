'use strict';

var React = require('react');
var checkOption = require('../helpers/checkOption');

const popsicle = require('popsicle');
const timeout = 10000;
const userAgent = 'ukey1-react-sdk/';
const authMethod = 'UKEY1 ';

function checkOptions(o) {
  checkOption('options', o, 'object', true);
  checkOption('options.appId', o.appId, 'string', true);
  checkOption('options.host', o.host, 'string', true);
  checkOption('options.sdkVersion', o.sdkVersion, 'string', true);
  checkOption('options.apiVersion', o.apiVersion, 'string', true);
  checkOption('options.method', o.method, 'string', true, ['GET', 'POST']);
  checkOption('options.endpoint', o.endpoint, 'string', true);
  checkOption('options.accessToken', o.accessToken, 'string', false);

  return o;
}

function Request(o) {
  this.o = checkOptions(o);
}

Request.prototype.prepareHeaders = function (h) {
  h['x-ukey1-user-agent'] = h['User-Agent'] = this.prepareUserAgent();
  h['x-ukey1-app'] = this.o.appId;

  if (this.o.accessToken) {
    h['Authorization'] = authMethod + this.o.accessToken;
  }

  return h;
};

Request.prototype.prepareUserAgent = function () {
  return userAgent + this.o.sdkVersion + ' React.js/' + React.version +
    (navigator ? ' ' + navigator.userAgent : '');
};

Request.prototype.checkResult = function (response) {
  var e = {};

  if (!response.body.result) {
    e = new Error('Invalid response structure');
    e.response = response;
    throw e;
  }

  if (response.body.result !== response.status) {
    e = new Error('Unexpected HTTP status ' + response.status);
    e.response = response;
    throw e;
  }

  return response;
};

Request.prototype.send = function (body, callback) {
  var options = {}, headers = {};

  headers = this.prepareHeaders(headers);
  options.url = this.o.host + this.o.apiVersion + this.o.endpoint;
  options.method = this.o.method;
  options.timeout = timeout;

  if (body) {
    headers['Content-Type'] = 'application/json';
    options.body = body;
  }

  options.headers = headers;

  popsicle.request(options)
    .use(popsicle.plugins.parse('json'))
    .then(this.checkResult)
    .then(callback)
    .catch(function (error) {
      console.log('Request failed');
      throw error;
    });
};

module.exports = Request;
