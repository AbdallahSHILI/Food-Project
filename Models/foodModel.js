const mongoose = require("mongoose");

//Schema of Review an employee
const SpecificFoodSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    select: true,
  },

  ClientID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    select: true,
  },
  HwMny: {
    type: Number,
    default: 1,
  },
  Done: {
    type: Boolean,
    default: false,
    select: true,
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
    select: true,
  },
});

//Food Schema
const FoodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    required: [true, "please enter the name of food !!"],
    select: true,
  },
  PhoneNumber: {
    type: String,
    required: [true, "please enter price of this food !!"],
    select: true,
    minlength: 5,
  },
  Description: {
    type: String,
    required: [true, "please enter the description of food !!"],
    select: true,
    minlength: 200,
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
  Request: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  SpecFood: [SpecificFoodSchema],
  Exist: {
    type: Boolean,
    default: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
