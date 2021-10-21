const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Your first name is required'],
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: [true, 'Your last name is required'],
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 20,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your name must not exceed 8 characters'],
      select: false,
    },
    profilePic: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//encrypt password
userSchema.pre('save', async function (next) {
  !this.isModified('password') && next();

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
