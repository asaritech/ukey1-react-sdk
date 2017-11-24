'use strict';

var DeviceStorage = require('react-device-storage');

var randomString = require('./helpers/randomString');
var checkOption = require('./helpers/checkOption');
var getQueryParameter = require('./helpers/getQueryParameter');
var UserData = require('./helpers/UserData');
var Connect = require('./endpoints/Connect');
var AccessToken = require('./endpoints/AccessToken');
var User = require('./endpoints/User');

const sdkVersion = '2.0.0';
const ukey1GetParams = '_ukey1';
const host = 'https://api.ukey.one';

function checkOptions(o) {
  checkOption('options', o, 'object', true);
  checkOption('options.appId', o.appId, 'string', true);

  o.sdkVersion = sdkVersion;

  if (!o.host) {
    o.host = host;
  }

  return o;
}

function Ukey1() {}

Ukey1.prototype.connect = function (o) {
  var options = checkOptions(o);
  var requestId = options.requestId = randomString();

  if (!process.browser) {
    throw new Error('This library is available only in browser');
  }

  new Connect(options).execute(function (data) {
    var ds = new DeviceStorage().sessionStorage();
    var gateway = data.gateway;

    if (options.signup) {
      gateway += (gateway.search(/\?/) >= 0 ? '&' : '?') + 'signup=1';
    }

    ds.save('ukey1', {
      requestId: requestId,
      connectId: data.connect_id
    });

    window.location = gateway;
  });
};

Ukey1.prototype.accessToken = function (o) {
  var options = checkOptions(o);
  var ds = new DeviceStorage().sessionStorage();
  var storageData = ds.read('ukey1');
  var requestId, connectId, status;

  checkOption('options.success', options.success, 'function', true);
  checkOption('options.finished', options.finished, 'function', true);

  if (storageData) {
    ds.delete('ukey1');

    options.requestId = storageData.requestId + '';
    options.connectId = storageData.connectId + '';

    requestId = getQueryParameter(ukey1GetParams + '[request_id]');
    connectId = getQueryParameter(ukey1GetParams + '[connect_id]');
    status = getQueryParameter(ukey1GetParams + '[result]');
    options.authCode = getQueryParameter(ukey1GetParams + '[code]');

    if (!requestId || requestId !== options.requestId) {
      console.log('Invalid requestId');
      options.finished(false);
      return false;
    }

    if (!connectId || connectId !== options.connectId) {
      console.log('Invalid connectId');
      options.finished(false);
      return false;
    }

    if (status !== 'authorized') {
      console.log('User has canceled the request');
      options.finished(false);
      return false;
    }

    try {
      new AccessToken(options).execute(function (data) {
        options.accessToken = data.access_token;

        new User(options).execute(function (data) {
          options.success(data.user, new UserData(data.user));
          options.finished(true);
        });
      });
    } catch (error) {
      options.finished(false);
      throw error;
    }
  } else {
    console.log('No requestId and connectId in device storage');
    options.finished(false);
    return false;
  }
};

Ukey1.prototype.parseUserData = function (data) {
  return new UserData(data);
};

module.exports = Ukey1;
