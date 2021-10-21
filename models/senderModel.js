const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sender name required'],
      maxlength: 100,
      minlength: [2, 'Sender name must be 2 or more characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Sender', senderSchema);
