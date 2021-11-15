const { PresetMessage, Message } = require('../models/messageModel');
const Contact = require('../models/contactModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const factory = require('./handlerFactory');

exports.createPresetMessage = factory.createOne(
  PresetMessage,
  'title',
  'Message created successfully',
);
exports.update = factory.updateOne(
  PresetMessage,
  'Message updated successfully',
);
exports.removePresetMessage = factory.deleteOne(
  PresetMessage,
  'Message deleted successfully',
);
exports.presetMessages = factory.getAll(PresetMessage);
exports.presetMessage = factory.getOne(PresetMessage);

exports.sendGroupMessage = catchAsyncErrors(async (req, res, next) => {
  //find contacts by group
  let to = [];
  const contacts = await Contact.find({ group: req.body.group });
  if (contacts) {
    Promise.all(
      contacts.map((contact) => {
        let phoneNumber = contact.phone.replace(/\D/g, '');
        to.push(
          JSON.stringify({ binding_type: 'sms', address: `+1${phoneNumber}` }),
        );
      }),
    );
  }

  //send sms message using twilio
  const notificationOpts = {
    toBinding: to,
    body: req.body.message,
  };

  client.notify
    .services(process.env.TWILIO_SERVICE)
    .notifications.create(notificationOpts)
    .then((notification) => console.log(notification.sid))
    .catch((error) => console.log(error));

  //add user to req.body
  req.body.sentBy = req.user.id;

  //save to database
  await Message.create(req.body);

  res.status(200).json({
    success: true,
    msg: `Message sent successfully`,
  });
});

exports.sentMessages = factory.getAll(Message, {
  path: 'group',
  select: 'name',
});
exports.sentMessage = factory.getOne(Message, [
  { path: 'sentBy', select: 'firstname lastname' },
  { path: 'group', select: 'name' },
]);

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
