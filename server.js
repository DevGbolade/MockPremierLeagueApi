const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env'});
const DB = process.env.DATABASE_URL

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('DB connected succesfully!'))
.catch( err => console.log(`Cannot connect check error ${err}`));

const port = process.env.PORT || 3000;
// console.log(process.env.NODE_ENV);


const server = app.listen(port, () => {
 console.log(`App is listening on port ${port}`); 
});

process.on('unhandledRejection', err =>{
  console.log('UNHANDLED REJECTION! Shutting down....');
  console.log(err.name, err.message);
  server.close(() =>{
    process.exit(1);
  });  
}); 

process.on('uncaughtException', err => {
  console.log('UNCAUGHT REJECTION! 💥 Shutting down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });  
});