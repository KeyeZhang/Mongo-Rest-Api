//ES6 detruturing: pull variable from object and construct a new one
// const MongoClient = require('mongodb').MongoClient; same as:
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    //return prevent the continuing execution
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');


  //toArray returns a promise!! can use "then" to print the data sent back
  db.collection('Todos').find({completed:true}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) =>{
    console.log('unable to fetch todo')
  });
  //count() also return a promise
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) =>{
    console.log('unable to fetch todo')
  });

  db.close();

});
