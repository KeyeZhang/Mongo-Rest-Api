//ES6 detruturing: pull variable from object and construct a new one
// const MongoClient = require('mongodb').MongoClient; same as:
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    //return prevent the continuing execution
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  //1.deleteMany
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
      console.log(result);
    });
  //2.deleteOne
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
      console.log(result);
    });
  //3.findOne and Delete

  //db.close();

});
