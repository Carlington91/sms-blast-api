const catchAsyncErrors = require('../utils/catchAsyncErrors');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');


const setTokenAndCookie = (user, res) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 360 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none';
  }

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined; //remove password from output
  return token;
};

exports.register = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ msg: 'User Already Exist. Please Login' });

  user = await User.create(req.body);

  setTokenAndCookie(user, res);

  res.status(201).json({
    status: 'success',
    user,
  });
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password)))
    return next(new ErrorHandler('incorrect email or password', 401));

  const token = setTokenAndCookie(user, res);

  res.status(201).json({
    status: 'success',
    user,
    token,
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: 'success' });
});

exports.isLoggedIn = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next();
  const verified = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findById(verified.id);

  if (!user) return next();

  res.status(200).json({
    user,
  });
});
