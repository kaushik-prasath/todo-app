const mongoose = require('mongoose');

let db = {
    mlab: process.env.MONGODB_URI
}

mongoose.promise = global.promise;
mongoose.connect(  db.mlab || process.env.MONGODB_URI );


module.exports = {mongoose}





