const ErrorHandler = require('./errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = err.message;

  console.log('test: ', error.message);

  //Mongoose Object ID Error
  if (error.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  //Mongoose validation error
  if (error.name === 'ValidationError') {
    const message = Object.values(err.errors).map((el) => el.message);

    // const message = `Invalid input data ${errors.join('. ')}`;
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
