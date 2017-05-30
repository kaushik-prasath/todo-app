const mongoose = require('mongoose');

mongoose.promise = global.promise;
let db = {
  localhost: 'mongodb://localhost:27017/Todos',
  mlab: 'mongodb://kaushik prasath:opsimath47@ds157621.mlab.com:57621/todoskaushik'
};
mongoose.connect(db.mlab || db.localhost);


module.exports = {mongoose}





