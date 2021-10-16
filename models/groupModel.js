const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Post cannit be empty'],
      maxlength: 100,
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Post cannot be empty'],
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Group', groupSchema);
