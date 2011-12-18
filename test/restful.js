//global variables
var mongoose = require('mongoose');
vart db = mongoose.connect('mongodb://176.32.90.191:27017/dreampass');
var Schema = mongoose.Schema;

//create schema
vart SumEventSchema = new Schema({
  eventid:String,
  title:String,
  imageurl:String,
  dealt:String,
  place:String,
  time:Date,
});

//create model
mongoose.model('SumEvent',SumEventSchema);

//export module
module.exports = db.model('SumEvent');
