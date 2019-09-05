const dotenv = require( 'dotenv');
dotenv.config({ path: './config.env'});

const keys ={
  port: process.env.PORT,
  secret: process.env.SECRET_KEY,
  mongoUrl: process.env.DATABASE_LOCAL,
  mongoTest: process.env.DATABASE_TEST,
  mongoProd: process.env.DATABASE_URL

}

module.exports = keys;