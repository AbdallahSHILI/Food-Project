const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// User Schema
const userSchema = new mongoose.Schema({
  FirstLastName: {
    type: String,
    required: [true, "please enter your First and LastName "],
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "please enter your email ! "],
    validate: [validator.isEmail, "Please fill a valid email !! "],
  },
  Password: {
    type: String,
    required: [true, "please enter your password "],
    minlength: 8,
    select: false,
  },
  ConfirmPassword: {
    type: String,
    required: [true, "please confirm your password !! "],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.Password;
      },
      message: "Passwords are not the same !!",
    },
  },
  PhoneNumber: {
    type: Number,
    required: [true, "please enter your phone number !! "],
    minlength: 8,
  },
  Role: {
    type: String,
    default: "client",
    enum: ["admin", "client"],
  },
  ReqPreFood: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "PrepareFood",
    },
  ],
  ReqResFood: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Food",
    },
  ],
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
});

//2) validate password
userSchema.methods.validatePassword = async function (
  condidatePassword,
  userPassword
) {
  return await bcrypt.compare(condidatePassword, userPassword);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
