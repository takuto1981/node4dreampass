var express = require('express');
var conf = require('./conf');
var everyauth = require('everyauth')
  , Promise = everyauth.Promise;

everyauth.debug = true;

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({})
  , User;

var mongooseAuth = require('./index');

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
    ,facebook: {
      everyauth: {
          myHostname: 'http://176.32.89.42'
        , appId: conf.fb.appId
        , appSecret: conf.fb.appSecret
        , redirectPath: '/'
      }
    }
});

var VoiceSchema = new Schema({
  size:Number,
  name:String,
  path:String,
  modified:Date,
  ins_date:Date
});

var EventSchema = new Schema({
  owner:String,
  title:String,
  donation:String,
  goal:{
   period:String,
   pace:Number,
   accounts:Number
  }
});

mongoose.model('User', UserSchema);
mongoose.model('Voice',VoiceSchema);
mongoose.model('Event',EventSchema);
mongoose.connect('mongodb://176.32.90.191:27017/FilmParty');

User = mongoose.model('User');
var Voice = mongoose.model('Voice');
var voice = new Voice();
var Event = mongoose.model('Event');
var event = new Event();

var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , mongooseAuth.middleware()
);

app.configure( function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout:false});
});

app.get('/', function (req, res) {
  res.redirect('/main');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/main', function (req,res){
  if (!req.loggedIn){
    res.render('main',{locals:{login:'ログイン'}});
    console.log(req.user);
  } else {
    res.render('main',{locals:{login:req.user.fb.name.first}});
    console.log(req.user);
  }
});

app.get('/purchace',function(req,res){
  res.render('after',{locals:{login:req.user.fb.name.first}});
  console.log('after');
});

app.get('/after',function(req,res){
  res.render('after',{locals:{login:req.user.fb.name.first}});
  console.log('after');
});

app.get('/form',function (req,res){
  if (!req.loggedIn){
    res.render('form',{locals:{login:'ログイン'}});
  } else {
    res.render('form',{locals:{login:req.user.fb.name.first}});
  }
});

mongooseAuth.helpExpress(app);

app.listen(80);

