const mongoose = require('mongoose');

const presetMessageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Preset Message title cannot be empty'],
      maxlength: 250,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Preset Message content cannot be empty'],
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const messageSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message content cannot be empty'],
      maxlength: 500,
      trim: true,
    },
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PresetMessage = mongoose.model('presetMessage', presetMessageSchema);
const Message = mongoose.model('message', messageSchema);

module.exports = { PresetMessage, Message };
