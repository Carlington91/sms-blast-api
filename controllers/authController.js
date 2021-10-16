const catchAsyncErrors = require('../utils/catchAsyncErrors');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

exports.login = catchAsyncErrors(async (req, res, next) => {});
