// from: https://github.com/yosuke-furukawa/react-nl2br/blob/master/index.js

var React = require('react');
var newlineRegex = /(\r\n|\n\r|\r|\n)/g;

export default function nl2br(str) {
  if (typeof str === 'number') {
    return str;
  } else if (typeof str !== 'string') {
    return '';
  }

  return str.split(newlineRegex).map(function(line, index) {
    if (line.match(newlineRegex)) {
      return React.createElement('br', { key: index });
    } else {
      return line;
    }
  });
};
