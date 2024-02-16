var calc2 = require('./calc2');

console.log('모듈 분리후 - clac2.add : '+ calc2.add(10,10));

var nconf = require('nconf');
var value = nconf.get('os');
console.log('os 환경변수 값' + value);