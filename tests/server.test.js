const expect = require('expect');
const request = require('supertest');

//need acess server.js for the express api
//also need the todos model
const {app} = require('../server');
const {Todo} = require('../model/todos');

//seed data
const seed_todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];
//clear the database everytime when run the first test, to cater to the assumption
beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(seed_todos);
  }).then(() => {done()});
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

          //assumption for the database: it's has two seed data at the beginning
          //only find the one match the 'text'
          Todo.find({text}).then((todos) => {
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
          //toBe(2):the two orginal seed data
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
    });
  });


  describe('GET/todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        //asertions about what come back
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2)
        })
        .end(done);
        //no need as above, becuz we are not doing anything async
    });
  });
