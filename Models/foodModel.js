const mongoose = require("mongoose");

//Food Schema
const FoodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    required: [true, "please enter the name of food !!"],
    select: true,
  },
  Price: {
    type: String,
    required: [true, "please enter price of this food !!"],
    select: true,
  },
  Description: {
    type: String,
    required: [true, "please enter the description of food !!"],
    select: true,
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
  UndoneRequest: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Request",
    },
  ],
  DoneRequest: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Request",
    },
  ],
  Exist: {
    type: Boolean,
    default: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
