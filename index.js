var exec = require('child_process').exec;
var pkg = require('./package.json');
var debug = require('debug')(pkg.name + ':start');
var run = function() {
  console.log('starting program');
  exec('DEBUG=* node dist/server');
};
run();

const wreckhost = 'http://dev.codemacdonald.com:8080/wreck/wedding-api?host=';
