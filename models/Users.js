const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilepicture: {
      type: String,
      default: '',
    },
    coveredPicture: {
      type: String,
      default: '',
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//  create user model
mongoose.model('user', userSchema);
module.exports = mongoose.model('user');
