const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.createOne = (Model, option, msg = '') =>
  catchAsyncErrors(async (req, res, next) => {
    const value = req.body[option].trim();

    const x = {
      [option]: value,
    };
    const doc = await Model.findOne(x);
    if (doc) return next(new ErrorHandler(`${option} already exist`, 400));

    const newDoc = await Model.create(req.body);

    res.status(201).json({
      success: true,
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
      success: true,
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
      success: true,
      data: null,
      msg,
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsyncErrors(async (req, res, next) => {
    let query = Model.find().sort({ createdAt: -1 });
    if (populateOptions) query = query.populate(populateOptions);

    const docs = await query;

    res.status(200).json({
      success: true,
      count: docs.length,
      results: docs,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsyncErrors(async (req, res, next) => {
    let query = Model.findById(req.query.id || req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(new ErrorHandler('No document found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      result: doc,
    });
  });
