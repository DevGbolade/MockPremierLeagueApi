const mongoose = require('mongoose');
const dotenv = require('dotenv');
const keys = require('../utilities/config.utils');


dotenv.config({ path: './config.env'});

const {mongoTest, mongoUrl, mongoProd} = keys;
const DB = process.env.NODE_ENV === 'test' ? mongoTest : mongoProd;

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('DB connected succesfully!'))
.catch( err => console.log(`Cannot connect check error ${err}`));