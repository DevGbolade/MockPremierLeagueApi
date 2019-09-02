const AppError = require('../utilities/apiError');

const handleCastErrorDB = err =>{
  const message = `Invalid ${err.path}: ${err.path}.`;
  return new AppError(message, 400);
}

const handleDuplicateFieldDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value} please use another value`;
  return new AppError(message, 400); 
};
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`; 
  return new AppError(message, 400);
};

const handleJwtError = () => new AppError('Invalid token please login again', 401);

const handleJwtExpiredError = () => new AppError('Your token has expired! please login again', 401)

const sendErrorDev = (err, res) =>{
  res.status(err.statusCode).json({ 
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) =>{
  // Operational, Trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
  
    });
    
    // Programming or unknown error: dont't leak the  error  details
  }else{
    // 1) Log error
    console.error('Error ', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  } 
};

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    if (process.env.NODE_ENV === 'development') {
       sendErrorDev(err, res);  
    }

    else if (process.env.NODE_ENV === 'production') {
      let error = {...err};
      if(error.name === 'CastError') error = handleCastErrorDB(error);
      if(error.code === 11000) error = handleDuplicateFieldDB(error);
      if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebToken') error = handleJwtError(error);
      if(error.name === 'TokenExpiredError') error = handleJwtExpiredError(error);

      sendErrorProd(error, res);
  }
} 