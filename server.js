var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
//create a todo model using mongoose!
//two params: name string, model object
var {Todo} = require('./model/todos');
var {User} = require('./model/users');

var app = express();
app.listen(3000, () => {
  console.log('Started on port 3000');
})

//we  can send JSON to express app
app.use(bodyParser.json());

//set route!
// params: url, and callback
app.post('/todos',(req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

//create a instance based on our model
var newTodo = new Todo({
  text: "  Drinking wine  ",
  completed: false,
  completedAt: 123
});

var newUser = new User({
  email: "keye.zhang@yahoo.com"
});

//save() actually save the new instance to database, and return a promise
// newTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) =>{
//   console.log("Saving failure");
// })
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) =>{
//   console.log("Saving failure");
// })