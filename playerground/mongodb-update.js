//ES6 detruturing: pull variable from object and construct a new one
// const MongoClient = require('mongodb').MongoClient; same as:
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    //return prevent the continuing execution
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');


  //db.close();

});
