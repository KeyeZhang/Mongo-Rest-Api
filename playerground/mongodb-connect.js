//ES6 detruturing: pull variable from object and construct a new one
// const MongoClient = require('mongodb').MongoClient; same as:
const {MongoClient, ObjectID} = require('mongodb');
var user = {name: 'Keye', age: 25};
var {name} = user;
console.log(name);
//generate ramdom ID
var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    //return prevent the continuing execution
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');


  //insert one record to collection "Todos"
  db.collection('Todos').insertOne({
    text: 'Something todo',
    completed: false
  }, (err, result) =>{
    if(err){
      return console.log('Unble to insert')
    }
    //params: all of the docs, filter function ,indentation
    console.log(JSON.stringify(result.ops, undefined,2));
  });
  //insert one record to collection "Users"
  db.collection('Users').insertOne({
    name: 'Keye',
    age: 25,
    location: 'Champaign'
  }, (err, result) => {
    if(err){
      return console.log('Insert failure');
    }
    console.log(JSON.stringify(result.ops, undefined, 3));
    //get timestamp
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 3));
  });

  db.close();
});
