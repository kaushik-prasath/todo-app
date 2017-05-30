const mongoose = require('mongoose');

mongoose.promise = global.promise;
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://kaushik prasath:opsimath47@ds149268.mlab.com:49268/todoapp'
};
mongoose.connect(db.mlab || db.localhost);


module.exports = {mongoose}





