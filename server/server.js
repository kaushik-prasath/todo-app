//CORE MODULES
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

//CUSTOM MODULES
require('./config/config');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { Users } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

//SETTING UP EXPRESS
var app = express();

const port = process.env.PORT;


//MIDDLEWARES
app.use(bodyParser.json());

//HTTP REQUEST METHODS FOR TODO
//POST
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });


});

//GET ALL TODOS
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET TODOS BY ID
app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

//DELETE TODOS BY ID
app.delete('/todos/:id', authenticate,async (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try{
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }catch(e){
        res.status(400).send();
        
    }


});

//UPDATE TODOS BY ID
app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});


//POST REQUEST FOR USERS

app.post('/users',async (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);
    try{
        await user.save();
        var token = await user.generateAuthToken();
        res.header({ 'x-auth': token }).send(user);
    }catch(e){
        res.status(400).send();        
    }

});



//GET users/me

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//POST users/login

app.post('/users/login', async (req, res) => {
   try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = await Users.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
   }catch(e){
        res.status(400).send();
   }
});

//DELETE users/me/token

app.delete('/users/me/token', authenticate,async (req, res) => {
    try{
        await req.user.removeToken(req.token);
        res.status(200).send();
    }catch(e){
        res.status(400).send();
        
    }
});

//PORT LISTEN
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };