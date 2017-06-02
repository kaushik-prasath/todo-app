
//CORE MODULES
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//CUSTOM MODULES
require('./config/config');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Users} = require('./models/user');

//SETTING UP EXPRESS
var app = express();

const port = process.env.PORT;

app.listen(port , () => {
    console.log(`Started on port ${port}`);
});

//MIDDLEWARES
app.use(bodyParser.json());

//HTTP REQUEST METHODS FOR TODO
//POST
app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((docs) => {
        res.send(docs);
    }, (err) => {
        res.status(400).send(err);
    });

    
});

//GET ALL TODOS
app.get('/todos',(req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET TODOS BY ID
app.get('/todos/:id' ,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
    },(err) => {
        res.status(400).send();
    })
});

//DELETE TODOS BY ID
app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
             if(!todo){
           return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
             res.status(400).send();
    });

});

//UPDATE TODOS BY ID
app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
         if(!todo){
           return res.status(404).send();
         }
        
        res.send({todo});
    }).catch((e) => {
        res.status(404).send();
    });
});


//POST REQUEST FOR USERS

app.post('/user',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new Users(body);


    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header({'x-head':token}).send(user);
    }).catch((e) => {
        res.status(400).send();
    });
});



module.exports = {app};

