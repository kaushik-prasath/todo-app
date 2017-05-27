
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to connect to mongodb server');
    }

        console.log('Connected to mongodb server');

        // db.collection('Todos').find({completed:true}).toArray().then((docs)=> {
        //     console.log('TODOS');
        //     console.log(JSON.stringify(docs,undefined,2));
        // }, (err)=> {
        //     if(err){
        //         console.log('Unable to fetch the data');
        //     }
        // });

        //    db.collection('Todos').find().count().then((count)=> {
        //     console.log(`TODOS count: ${count}`);
            
        // }, (err)=> {
        //     if(err){
        //         console.log('Unable to fetch the data');
        //     }
        // });

         db.collection('Users').find({name:'kaushik prasath'}).toArray().then((docs)=> {
            console.log('TODOS');
            console.log(JSON.stringify(docs,undefined,2));
        }, (err)=> {
            if(err){
                console.log('Unable to fetch the data');
            }
        });

        db.close();
});