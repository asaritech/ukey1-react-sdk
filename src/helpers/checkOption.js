'use strict';

function checkOption(o, v, t, r, a) {
  if (t === 'array') {
    if ((r && !v) || (v && Object.prototype.toString.call(v) !== '[object Array]')) {
      throw new Error('Unknown/invalid `' + o + '` (' + t + ' required)');
    }
  } else if (t === 'function') {
    if ((r && !v) || (v && Object.prototype.toString.call(v) !== '[object Function]')) {
      throw new Error('Unknown/invalid `' + o + '` (' + t + ' required)');
    }
  } else if ((r && !v) || (v && typeof v !== t)) {
    throw new Error('Unknown/invalid `' + o + '` (' + t + ' required)');
  }

  if (t === 'string') {
    if (a) {
      checkOption('checkOption(attribute a)', a, 'array', false);

      if (a.indexOf(v) < 0) {
        throw new Error('Unknown/invalid `' + o + '` (possible values are [' + a.join(',') + '])');
      }
    }
  }
}

module.exports = checkOption;
