const mongoose = require("mongoose");
const validator = require("validator");

//prepareFood Schema
const prepareFoodSchema = new mongoose.Schema({
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
  UserID: {
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
  ClientID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
  Reaquest: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const prepareFood = mongoose.model("prepareFood", prepareFoodSchema);
const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
module.exports = prepareFood;
