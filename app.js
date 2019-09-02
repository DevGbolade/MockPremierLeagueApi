const express = require('express');
const morgan = require('morgan');


const AppError = require('./Api/utilities/apiError');
const globalErrorHandler = require('./Api/middlewares/errorMiddlewares');

// user route

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  
};

app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES


app.all('*', (req, res, next)=>{  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;


 








