const mongoose = require("mongoose");

//PrepareFood Schema
const PrepareFoodSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "please enter your name !!"],
    select: true,
  },
  PhoneNumber: {
    type: Number,
    required: [true, "please enter your phone number !!"],
    select: true,
    minlength: 8,
  },
  Description: {
    type: String,
    required: [true, "please enter the description of food !!"],
    select: true,
    minlength: 2,
  },
  ClientID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
  Done: {
    type: Boolean,
    default: false,
    select: true,
  },
});

const PrepareFood = mongoose.model("PrepareFood", PrepareFoodSchema);
module.exports = PrepareFood;
