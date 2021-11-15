const mongoose = require('mongoose');
const slugify = require('slugify');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Post name required'],
      maxlength: 100,
      minlength: [2, 'Post name must be 2 or more characters'],
      trim: true,
    },
    slug: String,
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

groupSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, unique: true });
  next();
});

module.exports = mongoose.model('Group', groupSchema);
