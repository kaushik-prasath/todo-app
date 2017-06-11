const { Todo } = require('./../../models/todo');
const { Users } = require('./../../models/user');


const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();


const users = [{
    _id: userOneId,
    email: 'kaushik@example.com',
    password: 'kaushikavina',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, '1234abcd').toString()
    }]
}, {
    _id: userTwoId,
    email: 'avina@hello.com',
    password: 'avinakaushik'
}];


const todos = [{
    _id: new ObjectID(),
    text: "test for first todo"
}, {
    _id: new ObjectID(),
    text: "test for second todo",
    completed: true,
    completedAt: 333
}];


const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
    Users.remove({}).then(() => {
        var userOne = new Users(users[0]).save();
        var userTwo = new Users(users[1]).save();
        Promise.all([userOne, userTwo]);
        done();
    });
}


module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}