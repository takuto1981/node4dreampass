
/**
 * Module dependencies.
 */

var express = require('express')
var Events = require('./models/eventSchema');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout:false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'dreampass'}));
//  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/neworder/:id', function(req,res){
  var sk=0;
  var lim=0;
  sk = (req.params.id-1)*10;
  lim = 10;
  console.log('sk is ' + sk +' : ' + 'lim is ' + lim);
  console.log(new Date() + '/neworder is called from ' + app.address().address);
  var query = Events.find({});
  //query.where('time').lte(new Date);
  query.select('title','imageurl','dealt','place','time');
  query.skip(sk);
  query.limit(lim);
  query.asc('time');
  query.exec(function (err,docs){
    if (!err){
      var events = JSON.stringify({"status": "OK","code":"1","amounts":docs.length,"event":docs});
      console.log(events);
      res.render('events',{events: events});
    } else {
      console.log('Mongodb error occoured : ' + err);
      var events = {"status": "ERROR","code": err,"amounts":docs.length,"event":docs};
    }
  });
});

app.get('/dealtorder/:id', function(req,res){
  var sk=0;
  var lim=0;
  sk = (req.params.id-1)*10;
  lim = 10;
  console.log('sk is ' + sk +' : ' + 'lim is ' + lim);
  console.log(new Date() + '/dealtorder is called from ' + app.address().address);
  var query = Events.find({});
  //query.where('time').lte(new Date);
  query.select('title','imageurl','dealt','place','time');
  query.skip(sk);
  query.limit(lim);
  query.asc('dealt');
  query.exec(function (err,docs){
    if (!err){
      var events = JSON.stringify({"status": "OK","code":"1","amounts":docs.length,"event":docs});
      console.log(events);
      res.render('events',{events: events});
    } else {
      console.log('Mongodb error occoured : ' + err);
      var events = {"status": "ERROR","code": err,"amounts":docs.length,"event":docs};
    }
  });
});

app.listen(8080);
console.log("Server listening on port %d in %s mode", app.address().port, app.settings.env);
