const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.create = factory.createOne(User);
exports.update = factory.updateOne(User, 'User updated successfully');
exports.remove = factory.deleteOne(User, 'User deleted successfully');
exports.list = factory.getAll(User);
exports.read = factory.getOne(User);
