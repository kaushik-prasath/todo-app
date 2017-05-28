
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

        console.log('Connected to mongodb server');


    //deleteMany
        // db.collection('Users').deleteMany({name:'kaushik prasath'}).then((result) => {
        //     console.log(result);
        // });


    //deleteOne
        //  db.collection('Users').deleteOne({name:'gokul krishnan'}).then((result) => {
        //     console.log(result);
        // });


    //findOneAndDelete
         db.collection('Users').findOneAndDelete({_id: new ObjectID("592a80ed3028c0e6d0e6a531")}).then((result) => {
            console.log(result);
        });



        db.close();
});