const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('../model/todos');
const {User} = require('../model/users');

// Todo.remove({}).then((todos) => {
//   console.log(todos);
// })

// Todo.findOneAndRemove({}).then((todos) => {
//   console.log(todos);
// })

Todo.findByIdAndRemove('asas').then((todo) => {
  console.log(todo);
})
