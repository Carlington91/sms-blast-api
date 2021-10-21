const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Post name required'],
      maxlength: 100,
      minlength: [2, 'Post name must be 2 or more characters'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Post description required'],
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Group', groupSchema);
