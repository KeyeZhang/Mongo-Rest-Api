const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('../model/todos');
const {User} = require('../model/users');

//use this id for all of our queries
var id = '59f9f129296dbfed1ecbb04c';
//ObjectID.isValid(id) can check for invaild id!
if (!ObjectID.isValid(id)){
  console.log("Id is not vaild");
}

//1.
Todo.find({
  _id: id  //if in this way, mongoose would construct ObjectId by it self
}).then((todos) => {
  console.log('Todos: ', todos);
});

//2.
Todo.findOne({
  _id: id  //if in this way, mongoose would construct ObjectId by it self
}).then((todo) => {
  if (!todo){
    return console.log("Todo: Id not found");
  }
  console.log('Todo: ', todo);
});

//3.only have to pass in id
Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log("Todo By Id: Id not found");
  }
  console.log('Todo By Id: ', todo);
}).catch((e) => { //for a invalid id(diff length)
  console.log(e);
});


//User
//1.findById
var userid = '59f9f129296dbfed1ecbb04d';

User.findById({
  _id: userid
}).then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log(JSON.stringify(user, undefined,2));
}, (e) => {
  console.log(e);
})
