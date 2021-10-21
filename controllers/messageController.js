const Message = require('../models/messageModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const factory = require('./handlerFactory');

exports.createPresetMessage = factory.createOne(
  Message,
  'Message created successfully',
);
exports.update = factory.updateOne(Message, 'Message updated successfully');
exports.removePresetMessage = factory.deleteOne(
  Message,
  'Message deleted successfully',
);
exports.presetMessages = factory.getAll(Message);
exports.presetMessage = factory.getOne(Message);

exports.sendGroupMessage = catchAsyncErrors(async (req, res) => {
  console.log(req.body);

  res.status(200).json({
    success: true,
  });
});

// exports.createPresetMessage = catchAsyncErrors(async (req, res) => {
//   const { title, content } = req.body;

//   const message = await Message.create({
//     title,
//     content,
//   });

//   if (!message) return next(new ErrorHandler('Error creating message', 400));

//   res.status(200).json({
//     success: true,
//     message,
//   });
// });

// exports.presetMessages = catchAsyncErrors(async (req, res) => {
//   const messages = await Message.find().sort({ createdAt: -1 });
//   if (!messages) return next(new ErrorHandler('No message found', 404));

//   res.status(200).json({
//     success: true,
//     presetMessages: messages,
//   });
// });

// exports.presetMessage = catchAsyncErrors(async (req, res) => {

//   const message = await Message.findById(req.params.id);
//   if (!message) return next(new ErrorHandler('No message found', 404));

//   res.status(200).json({
//     success: true,
//     presetMessage: message,
//   });
// });

// exports.update = catchAsyncErrors(async (req, res) => {
//   let message = await Message.findById(req.query.id);
//   if (!message) return next(new ErrorHandler('No message found', 404));

//   message = await Message.findByIdAndUpdate(
//     message._id,
//     { $set: req.body },
//     { new: true },
//   );

//   res.status(200).json({
//     success: true,
//     message,
//   });
// });

// exports.removePresetMessage = catchAsyncErrors(async (req, res) => {
//   const message = await Message.findById(req.query.id);
//   if (!message) return next(new ErrorHandler('No message found', 404));

//   await message.remove();

//   res.status(200).json({
//     success: true,
//   });
// });
