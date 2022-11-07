const Food = require("../Models/foodModel");
const User = require("../Models/userModel");
const Request = require("../Models/requestReserveModel");

exports.addNewReadyFood = async (req, res, next) => {
  try {
    // Create new food
    const food = await Food.create(req.body);
    // Test if food was created
    if (food) {
      return res.status(201).json({
        status: "Success",
        data: {
          food,
        },
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.findMyReservedFoods = async (req, res) => {
  try {
    // Test if there is foods
    let foods = await Request.find({ ClientID: req.user.id });
    if (!foods) {
      return res.status(400).send({ message: "You don't have any foods !! " });
    }
    return res.status(200).json({
      status: "Success",
      result: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

// change the food's condition by an admin
exports.changeRequestCondition = async (req, res) => {
  try {
    // Test if there is a food
    let food = await Food.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !!",
      });
    }
    let request = await Request.findById(req.params.idRequest);
    if (!request) {
      return res.status(400).send({
        message: "No request with that id !!",
      });
    }
    if (!food.DoneRequest.includes(request.id)) {
      // change the  food's condition to be an done food
      food.UndoneRequest = food.UndoneRequest.filter(
        (e) => e._id != request.id
      );
      //save the last changes
      food.save();
      await Food.findByIdAndUpdate(food.id, {
        $push: {
          DoneRequest: request.id,
        },
      });
      return res.status(200).json({
        status: "Request condition change Successfully !!",
        food,
      });
    }
    return res.status(400).send({
      message: "You already prepare this food !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.ReserveOneFood = async (req, res) => {
  try {
    currentUser = req.user;
    const food = await Food.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id",
      });
    }
    // Test if the food was exist
    if (food.Exist == true) {
      const newRequest = await Request.create({
        UserName: currentUser.UserName,
        PhoneNumber: currentUser.PhoneNumber,
        ClientID: currentUser.id,
        HwMny: req.body.HwMny,
        FoodID: food.id,
      });
      // Push  information of specific food into current user profile
      await User.findByIdAndUpdate(currentUser.id, {
        $push: {
          ReqResFood: food.id,
        },
      });
      await Food.findByIdAndUpdate(food.id, {
        $push: {
          UndoneRequest: newRequest.id,
        },
      });
      return res.status(200).json({
        status: "Success",
        data: {
          currentUser,
        },
      });
    }
    return res.status(404).json({
      message: "This food is not available !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.findAllFoods = async (req, res, next) => {
  try {
    // Test if there is a document
    const foods = await Food.find({});
    if (foods.length == 0) {
      return res.status(404).json({
        message: "There is no food yet !!",
      });
    }
    return res.status(200).json({
      status: "Success",
      result: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.Menu = async (req, res, next) => {
  try {
    // Test if there is a document
    const foods = await Food.find({ Exist: true });
    if (foods.length == 0) {
      return res.status(404).json({
        message: "There is no food yet !!",
      });
    }
    return res.status(200).json({
      status: "Success",
      result: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.getOneFood = async (req, res, next) => {
  try {
    // Update new changes
    let food = await Food.findById(req.params.idFood);
    if (food) {
      if (req.user.Role === "admin") {
        return res.status(200).json({
          status: "Success",
          data: {
            food,
          },
        });
      }
      if (food.Exist == true) {
        return res.status(200).json({
          status: "Success",
          data: {
            food,
          },
        });
      }
      return res.status(400).json({
        message: "This food is not available right now !! ",
      });
    }
    return res.status(400).json({
      status: "Failed",
      message: "There is no food with that id !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.UpdateOneFood = async (req, res, next) => {
  try {
    // Update new changes
    let doc = await Food.findByIdAndUpdate(req.params.idFood, req.body, {
      new: true,
      runValidators: true,
    });
    if (doc) {
      return res.status(200).json({
        status: "Success",
        data: {
          doc,
        },
      });
    }
    return res.status(400).json({
      status: "Failed",
      message: "There is no food with that id !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.findAllRequestReserveFood = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await Food.find({ UndoneRequest: { $ne: [] } }).populate(
      "UndoneRequest"
    );
    if (!foods) {
      return res.status(400).send({
        message: "No food with that id !! ",
      });
    }
    requests: return res.status(200).json({
      status: "Success",
      result: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

// change the food's condition by an admin
exports.hideOneFood = async (req, res) => {
  try {
    // Test if there is a food
    let food = await Food.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !!",
      });
    }
    if (food.Exist == false) {
      return res.status(400).send({
        message: "You already hide this food !! ",
      });
    }
    // change the  food's condition to be an done food
    food.Exist = false;
    //save the last changes
    food.save();
    return res.status(200).json({
      status: "Food condition change Successfully !!",
      food,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.deleteOneFood = async (req, res, next) => {
  try {
    // Find food and delete it
    const doc = await Food.findByIdAndDelete(req.params.idFood);
    if (!doc)
      return res.status(400).json({
        status: "No doc with that id !!",
      });
    return res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};
