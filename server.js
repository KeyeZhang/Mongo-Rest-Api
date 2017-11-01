var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');
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

//set out first route!
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

//second route
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //res.send(todos); not the best way tos send back arrays
    res.send({  //make it a object, you can customize other attributes added by you
      todos,
      code:'ss'
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/123
app.get('/todos/:id', (req, res) => {
  //get the id from url input by users
  var id = req.params.id;
  //Tasks!:

  //valid id using isValid
  //404 - send back an empty body

  //findById
    //success
      //if todo - send it back
      //if no todo = send back a 404 with empty body
    //error
      //400 - and send empty body back

  if(!ObjectID.isValid(id)){
    console.log('Invalid ID');
    return res.status(404).send();
  }

  Todo.findById({
    _id: id
  })
  .then((todo) => {
    if(!todo){
      console.log('Id not found');
      return res.status(404).send();
    }
    res.status(200).send({
      todo: todo
    });
  })
  .catch((e) => {
    console.log('Error')
    res.status(400).send();
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

module.exports = {app};
