// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//Destructuring object into its own variables
// var user = {
//     name:'kaushik prasath',
//     age:19
// }
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

        console.log('Connected to mongodb server');

        // db.collection('Todos').insertOne({
        //     text:'brush my teeth'
        // },(err,result) => {
        //     if(err){
        //         return console.log('Some error has occured' , err);
        //     }
        //     console.log(JSON.stringify(result.ops,undefined,2));
        // });

        db.collection('Users').insertOne({
            name:'kaushik prasath',
            age:19,
            country:'India'
        }, (err,result)=>{
             if(err){
                return console.log('Some error has occured' , err);
            }
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp() ,undefined,2));
        });

        db.close();
});