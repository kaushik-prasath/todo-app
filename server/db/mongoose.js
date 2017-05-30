const mongoose = require('mongoose');

mongoose.promise = global.promise;
let db = {
  localhost: 'mongodb://localhost:27017/Todos',
  mlab: process.env.MONGODB_URI
};
mongoose.connect(db.mlab || db.localhost);


module.exports = {mongoose}





