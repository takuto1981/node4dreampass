//global variables
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://176.32.90.191:27017/dreampass');
var Schema = mongoose.Schema;

//create schema
var EventsSchema = new Schema({
  title:String,
  imageurl:String,
  movie_name:String,
  place:String,
  owner:String,
  comment:String,
  purchase:String,
  dealt:String,
  begintime:Date,
  endtime:Date
});

//create model
mongoose.model('Events',EventsSchema);

//export module
module.exports = db.model('Events');
