const expect =  require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
    text:"test for first todo"
},{
    text:"test for second todo"
}];

beforeEach((done) => {
    Todo.remove({}).then(() =>{
        Todo.insertMany(todos);
    }).then(() => done());
});

describe('Todo POST/todos',() => {
    it('should return a text', (done) => {
        var text = 'do my homework';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not return anything with a bad data',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });
    });
});

describe('GET /todos', () =>{

    it('should return GET todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id', () => {

    var hexId = new ObjectID().toHexString();

    it('should return 404 for no todo', (done) => {
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for invalid ID', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });

});