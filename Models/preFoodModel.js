const mongoose = require("mongoose");

//PrepareFood Schema
const PrepareFoodSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  PhoneNumber: {
    type: Number,
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
  },
  Hide: {
    type: Boolean,
    default: false,
  },
});

const PrepareFood = mongoose.model("PrepareFood", PrepareFoodSchema);
module.exports = PrepareFood;
