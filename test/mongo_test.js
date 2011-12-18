var mongodb = require('mongodb');
var db = new mongodb.Db('test',new mongodb.Server('176.32.90.191',27017,{}),{});
var Things;
db.open(function(err,db){
  db.collection('users',function(err,collection){
    Things = collection;
    console.log(collection.find());
    collection.insert({'a':100});
  });
});
/*
Things.find([],function(err,cursor){
  cursor.each(function(err,doc){
    if (doc) console.log(doc._id);
  });
});
*/
