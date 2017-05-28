
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

        console.log('Connected to mongodb server');

        //findOneAndUpdate
        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("592a866e3028c0e6d0e6a717")
        },{
            $set:{
                name:'vikram'
            },
            $inc:{
                age:1
            }
        },{
            returnOriginal:false
        }).then((result) => {
            console.log(result);
        });


        db.close();
});