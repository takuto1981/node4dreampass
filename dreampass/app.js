
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
var Events = require('./models/eventSchema.js');

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
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/eventMake', function(req,res){
  console.log(new Date() + 'INFO get /eventMake is called');
  res.render('eventMake',{user: "ogawa",today: new Date()});
});
app.post('/eventMake/:user', function(req,res){
  console.log(new Date() + 'INFO post /eventMake is called from ' + req.params.user);
  console.log(req.body.event);
  var eve = new Events(req.body.event);
  eve.save(function(err){
    if (err){
      console.log(new Date() + 'ERROR MongoDB is error'); 
    }else {
      console.log(new Date() + 'INFO Saved : ' + req.body.event);
      res.render('index',{title: "ドリパス"});
    }
  });
});

app.listen(8000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
