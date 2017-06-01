var env = process.env.NODE_ENV || 'development';
console.log(`Env=${env}`);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Todos';  
} else
{
      process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosTest';   
}
  