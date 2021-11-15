const Group = require('../models/groupModel');
const factory = require('./handlerFactory');


exports.create = factory.createOne(Group, 'name', 'Group created successfully');
exports.update = factory.updateOne(Group, 'Group updated successfully');
exports.remove = factory.deleteOne(Group, 'Group deleted successfully');
exports.list = factory.getAll(Group);
exports.read = factory.getOne(Group);


// exports.create = catchAsyncErrors(async (req, res, next) => {
//   const group = await Group.create(req.body);
//   console.log(group);
//   if (!group) return next(new ErrorHandler('Error creating group', 400));

//   res.status(200).json({
//     success: true,
//     msg: 'Group created successfully',
//     group,
//   });
// });

// exports.list = catchAsyncErrors(async (req, res, next) => {
//   const groups = await Group.find().sort({ createdAt: -1 });
//   if (!groups) return next(new ErrorHandler('No group found', 404));

//   res.status(200).json({
//     success: true,
//     groups,
//   });
// });

// exports.read = catchAsyncErrors(async (req, res, next) => {
//   const group = await Group.findById(req.query.id);
//   if (!group) return next(new ErrorHandler('No group found', 404));

//   res.status(200).json({
//     success: true,
//     group,
//   });
// });

// exports.update = catchAsyncErrors(async (req, res, next) => {
//   let group = await Group.findById(req.query.id);
//   if (!group) return next(new ErrorHandler('No group found', 404));

//   group = await Group.findByIdAndUpdate(
//     group._id,
//     { $set: req.body },
//     { new: true },
//   );

//   res.status(200).json({
//     success: true,
//     group,
//   });
// });

// exports.remove = catchAsyncErrors(async (req, res, next) => {
//   const group = await Group.findById(req.query.id);
//   if (!group) return next(new ErrorHandler('No group found', 404));

//   await group.remove();

//   res.status(200).json({
//     success: true,
//   });
// });
