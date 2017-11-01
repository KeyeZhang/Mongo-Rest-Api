const expect = require('expect');
const request = require('supertest');

//need acess server.js for the express api
//also need the todos model
const {app} = require('../server');
const {Todo} = require('../model/todos');

//clear the database everytime when run the first test, to cater to the assumption
beforeEach((done) => {
  Todo.remove({}).then(() => {
    done();
  });
});

//add test cases
describe('POST/todos', () => {
  //first test
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
          if (err){
            return done(err);
          }//test indeed failed

          //assumption for the database: it's empty at the beginning
          Todo.find().then((todos) => {
            //assertions
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => {
            done(e);
          });

      });
    });
    //second test: for inserting invalid data
    it('should not create a new todo with invalid data', (done) => {
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
    });
  });
