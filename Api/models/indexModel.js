const dotenv = require( 'dotenv');
const keys = require('../utilities/config.utils');

const {psqlTest, psqlUrl} = keys;
dotenv.config();

const DB = process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl;
console.log(DB);



mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( () => console.log('DB connected succesfully!'))
.catch( err => console.log(`Cannot connect check error ${err}`));
