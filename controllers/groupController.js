const Group = require('../models/groupModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.create = catchAsyncErrors(async (req, res) => {
  const { name, desc } = req.body;

  const group = await Group.create({
    name,
    desc,
  });

  if (!group) return next(new ErrorHandler('Error creating group', 400));

  res.status(200).json({
    success: true,
    group,
  });
});

exports.list = catchAsyncErrors(async (req, res) => {
  const groups = await Group.find().sort({'createdAt':-1});
  if (!groups) return next(new ErrorHandler('No group found', 404));

  res.status(200).json({
    success: true,
    groups,
  });
});

exports.read = catchAsyncErrors(async (req, res) => {
  const group = await Group.findById(req.query.id);
  if (!group) return next(new ErrorHandler('No group found', 404));

  res.status(200).json({
    success: true,
    group,
  });
});

exports.update = catchAsyncErrors(async (req, res) => {

  let  group = await Group.findById(req.query.id);
  if (!group) return next(new ErrorHandler('No group found', 404));

  group = await Group.findByIdAndUpdate(group._id, {$set:req.body},{new:true})

  res.status(200).json({
    success: true,
    group,
  });
});

exports.remove = catchAsyncErrors(async (req, res) => {
  const group = await Group.findById(req.query.id);
  if (!group) return next(new ErrorHandler('No group found', 404));

  await group.remove()

  res.status(200).json({
    success: true,
    
  });
});
