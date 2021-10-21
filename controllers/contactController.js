const Contact = require('../models/contactModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.create = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.create(req.body);
  if (!contact) return next(new ErrorHandler('Error creating contact', 400));

  res.status(200).json({
    success: true,
    contact,
  });
});

exports.list = catchAsyncErrors(async (req, res) => {
  const contacts = await Contact.find({ group: req.query.group })
    .sort({ createdAt: -1 })
    .populate('group', 'name');
  if (!contacts) return next(new ErrorHandler('No contact found', 404));

  res.status(200).json({
    success: true,
    contacts,
  });
});

exports.read = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.findById(req.query.id);
  if (!contact) return next(new ErrorHandler('No contact found', 404));

  res.status(200).json({
    success: true,
    contact,
  });
});

exports.update = catchAsyncErrors(async (req, res) => {
  
  let contact = await Contact.findById(req.query.id);
  if (!contact) return next(new ErrorHandler('No contact found', 404));

 contact = await Contact.findByIdAndUpdate(contact._id, {$set: req.body },{new:true});

  res.status(200).json({
    success: true,
    contact,
  });
});

exports.remove = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.findById(req.query.id);
  if (!contact) return next(new ErrorHandler('No contact found', 404));

  await contact.remove()

  res.status(200).json({
    success: true,
  });
});
