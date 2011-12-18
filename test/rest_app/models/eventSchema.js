//global variables
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://176.32.90.191:27017/dreampass');
var Schema = mongoose.Schema;

//create schema
var EventsSchema = new Schema({
  title:String,
  imageurl:String,
  dealt:String,
  place:String,
  time:Date,
});

//create model
mongoose.model('Events',EventsSchema);

//export module
module.exports = db.model('Events');
