'use strict';

function getQueryParameter(name, url) {
  var regex, results;

  if (!url) {
    url = window.location.href;
  }

  url = decodeURIComponent(url);
  name = name.replace(/[\[\]]/g, '\\$&');
  regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

module.exports = getQueryParameter;
