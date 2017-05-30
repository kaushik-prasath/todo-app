
const {ObjectID} = require('mongodb');

const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');

const id = '592d4e3f606db90011a2e8c0';

if(!ObjectID.isValid(id)){
    console.log('ID is not valid');
}




// Todo.remove({}).then((res) => {
//     console.log(res);
// });


// Todo.findOneAndRemove({
//     _id:id
// }).then((res) => {
//     console.log(res);
// });

Todo.findByIdAndRemove(id).then((res) => {
    console.log(res);
});

