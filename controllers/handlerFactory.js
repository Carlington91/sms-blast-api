const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.createOne = (Model, msg = '') =>
  catchAsyncErrors(async (req, res, next) => {

    console.log(req.user);
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newDoc,
      msg,
    });
  });

exports.updateOne = (Model, msg = '') =>
  catchAsyncErrors(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ErrorHandler('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
      msg,
    });
  });

exports.deleteOne = (Model, msg = '') =>
  catchAsyncErrors(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.query.id);

    if (!doc) {
      return next(new ErrorHandler('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
      msg,
    });
  });

exports.getAll = (Model) =>
  catchAsyncErrors(async (req, res, next) => {
    const docs = await Model.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: docs.length,
      results: docs,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsyncErrors(async (req, res, next) => {
    let query = Model.findById(req.query.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new ErrorHandler('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: doc,
    });
  });
