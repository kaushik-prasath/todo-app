
const {ObjectID} = require('mongodb');

const {Users} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');

const id = '592aa468ce2b2d0e242ca028';

if(!ObjectID.isValid(id)){
    console.log('ID is not valid');
}








Users.find({
    _id:id
}).then((user) => {
    console.log('Todos:',user);
});


Users.findById(id).then((user) => {
    if(!user){
 console.log('User not found');
    }
    console.log('Todos:',user);
},(err) => {
    console.log(err);
});