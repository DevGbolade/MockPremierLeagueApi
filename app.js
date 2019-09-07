const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

require('./Api/models/_mongoose');


const AppError = require('./Api/utilities/appError');
const globalErrorHandler = require('./Api/middlewares/errorMiddlewares');

const userRouter = require('./Api/routes/userRoute');
const teamRouter = require('./Api/routes/teamRoute');
const fixtureRouter = require('./Api/routes/fixtureRoute');



const app = express();

// 1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  
};

// app.use(morgan('dev'));

app.use(express.json());

// Limit requests from same API
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// // Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const API_VERSION = '/api/v1';

// // 3) ROUTES
app.use(`${API_VERSION}`, userRouter);
app.use(`${API_VERSION}`, teamRouter);
app.use(`${API_VERSION}`, fixtureRouter);

app.get('/', (req, res) => res.status(200).send('Welcome to Mock Premier League Api'))

app.all('*', (req, res, next)=>{  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;


 








