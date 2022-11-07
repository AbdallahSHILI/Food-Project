const User = require("../Models/userModel");
const PrepareFood = require("../Models/preFoodModel");

exports.PrepareFood = async (req, res, next) => {
  try {
    currentUser = req.user;
    // Prepare new food
    const preFood = await PrepareFood.create({
      Name: currentUser.UserName,
      PhoneNumber: currentUser.PhoneNumber,
      ClientID: currentUser.id,
      Description: req.body.Description,
    });
    // Test if food model was created
    if (preFood) {
      //Add the id of food in the profile of current client
      await User.findByIdAndUpdate(req.user.id, {
        $push: { ReqPreFood: preFood.id },
      });
      return res.status(201).json({
        status: "Success",
        data: {
          preFood,
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

exports.HideOneRequestFood = async (req, res, next) => {
  try {
    // Find food and delete it
    const food = await PrepareFood.findById(req.params.idFood);
    if (!food) {
      return res.status(400).json({
        status: "No food with that id !!",
      });
    }
    if (food.Hide == false) {
      food.Hide = true;
      //save the last changes
      food.save();
      return res.status(200).json({
        message: "Food was Hided successfully",
      });
    }
    return res.status(400).json({
      status: "Failed",
      message: "Food already Hide",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.findAllRequestPrepareFood = async (req, res) => {
  try {
    // Test if there is a food
    const foods = await PrepareFood.find({ Done: false });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no request !! " });
    }
    return res.status(200).json({
      status: "Success",
      foods,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      err,
    });
  }
};

exports.getOneFood = async (req, res, next) => {
  try {
    // Update new changes
    let doc = await PrepareFood.findById(req.params.idFood);
    if (!doc) {
      return res.status(400).json({
        message: "There is no food with that id !! ",
      });
    }
    return res.status(200).json({
      status: "Success",
      data: {
        doc,
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
exports.changeFoodCondition = async (req, res) => {
  try {
    currentUser = req.user;
    // Test if there is a food
    let food = await PrepareFood.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !!",
      });
    }
    if (food.Done == true) {
      return res.status(400).send({
        message: "You already prepare this food !! ",
      });
    }
    // change the  food's condition to be an done food
    food.Done = true;
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

exports.getAllDoneRequestPrepareFoods = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await PrepareFood.find({ Done: false });
    console.log(foods);
    if (foods.length == 0) {
      return res.status(400).json({
        message: "There is no done food yet !! ",
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

// cancel request prepare food by current client
exports.cancelRequestPrepareFood = async (req, res) => {
  try {
    let CurrentUser = req.user;
    // Test if there is a food
    let food = await PrepareFood.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !! ",
      });
    }

    // Test if the current client is the responsible of this food
    if (food.ClientID == CurrentUser.id) {
      if (food.Done == true) {
        return res.status(400).send({
          message:
            " You can't cancel your request because your food is already done !! ",
        });
      }
      //Filter the id of the food from the list of request prepare food for current client
      CurrentUser.ReqPreFood = CurrentUser.ReqPreFood.filter(
        (e) => e._id != food.id
      );
      // Update all the last changes on the current client
      let user = await User.findByIdAndUpdate(CurrentUser.id, CurrentUser, {
        new: true,
        runValidators: true,
      });
      //delete the specific food
      const doc = await PrepareFood.findByIdAndDelete(req.params.idFood);
      if (user) {
        return res.status(200).json({
          status: "Your request was deleted",
          data: {
            user,
          },
        });
      }
    }
    return res.status(400).send({
      message:
        "You are the responsible of this food , You can't cancel the request !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.findMyDonePreparedFoods = async (req, res) => {
  try {
    // Test if there is foods
    let foods = await PrepareFood.find({ ClientID: req.user.id, Done: true });
    console.log(foods);
    if (!foods) {
      return res
        .status(400)
        .send({ message: "You don't have any done Prepared foods !! " });
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

exports.findMyUndonePreparedFoods = async (req, res) => {
  try {
    // Test if there is foods
    let foods = await PrepareFood.find({ ClientID: req.user.id, Done: false });
    if (!foods) {
      return res
        .status(400)
        .send({ message: "You don't have any undone Prepared foods !! " });
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

exports.getAllRequest = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await PrepareFood.find({ ClientID: req.user.id });
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

exports.findAllDonePreFoodAdmin = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await PrepareFood.find({ Done: true });
    console.log(foods);
    if (foods.length == 0) {
      return res.status(400).json({
        message: "There is no done food yet !! ",
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
