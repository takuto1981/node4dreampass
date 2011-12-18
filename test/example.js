var http = require('http');
var log4js = require('log4js');
log4js.addAppender(log4js.fileAppender('logs/access.log'),'access');
log4js.addAppender(log4js.fileAppender('logs/error.log'),'error');
var test = require('./test');
test("Hi, I'm Tetsuo.");
var ac_log = log4js.getLogger('access');
ac_log.setLevel('INFO');

var er_log = log4js.getLogger('error');
er_log.setLevel('ERROR');

er_log.error('Are you crazy?');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
  ac_log.info('Hello World is read.');
}).listen(8080);

console.log('Server running at http://176.34.20.70:8080/');
