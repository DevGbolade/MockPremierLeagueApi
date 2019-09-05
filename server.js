// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
// const keys = require('./Api/utilities/config.utils');


// dotenv.config({ path: './config.env'});

// const {mongoTest, mongoUrl} = keys;
// const DB = process.env.NODE_ENV === 'test' ? mongoTest : mongoUrl;

// mongoose
// .connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// })
// .then( () => console.log('DB connected succesfully!'))
// .catch( err => console.log(`Cannot connect check error ${err}`));


const port = process.env.PORT || 3000;

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