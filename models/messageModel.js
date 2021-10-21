const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Message title cannot be empty'],
      maxlength: 250,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Message content cannot be empty'],
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema);
