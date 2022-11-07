const mongoose = require("mongoose");

//Schema of Review an employee
const RequestSchema = mongoose.Schema({
  UserName: {
    type: String,
  },
  PhoneNumber: {
    type: Number,
  },
  ClientID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  FoodID: {
    type: mongoose.Schema.ObjectId,
    ref: "Food",
  },
  HwMny: {
    type: Number,
    default: 1,
  },
  Hide: {
    type: Boolean,
    default: false,
  },
  DateCreation: {
    type: Date,
    default: Date.now(),
  },
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
