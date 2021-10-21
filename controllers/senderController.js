const Sender = require('../models/senderModel');
const factory = require('./handlerFactory');

exports.create = factory.createOne(Sender, 'Sender created successfully');
exports.update = factory.updateOne(Sender, 'Sender updated successfully');
exports.remove = factory.deleteOne(Sender, 'Sender deleted successfully');
exports.list = factory.getAll(Sender);
exports.read = factory.getOne(Sender);
