const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
      required: [true, 'Your last name is required'],
      trim: true,
      minlength: 2,
      maxlength: 20,
    },

    firstname: {
      type: String,
      required: [true, 'Your first name is required'],
      trim: true,
      minlength: 2,
      maxlength: 20,
    },

    middlename: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 20,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function (p) {
      //     // return /\d{3}-\d{3}-\d{4}/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
      required: [true, 'Contact phone number required'],
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'Group',
      required: [true, 'Please select a group'],
    },
  },
  {
    timestamps: true,
  },
);



module.exports = mongoose.model('Contact', contactSchema);
