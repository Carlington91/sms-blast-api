const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

module.exports = catchAsyncErrors(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return next(new ErrorHandler('you are not authorized', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new ErrorHandler('expired or invalid token', 401));

  req.token = token;
  req.user = decoded.user;
  next();
});
