const Food = require("../Models/foodModel");
const User = require("../Models/userModel");
const PrepareFood = require("../Models/preFoodModel");

// cancel request prepare food by current client
exports.cancelRequestPreFood = async (req, res) => {
  try {
    let userToEdit = req.user;

    // Test if there is a food
    let food = await PrepareFood.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id !! ",
      });
    }
    // Test if the current client is the responsible of this food
    if (!food.ClientID == userToEdit.id) {
      //Filter the id of the food from the list of request prepare food for current client
      userToEdit.ReqPreFood = userToEdit.ReqPreFood.filter(
        (e) => e._id != food.id
      );
      // Update all the last changes on the current client
      let user = await User.findByIdAndUpdate(userToEdit.id, userToEdit, {
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

exports.findMyReservedFoods = async (req, res) => {
  try {
    // Test if there is foods
    let foods = req.user.ReqResFood;
    if (!foods) {
      return res
        .status(400)
        .send({ message: "You don't have any reserved foods !! " });
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

exports.findMyPreparedFoods = async (req, res) => {
  try {
    // Test if there is foods
    let foods = req.user.ReqPreFood;
    if (!foods) {
      return res
        .status(400)
        .send({ message: "You don't have any Prepared foods !! " });
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

// // List of all reserved foods for current client
// exports.findMyDoneReservedFoods = async (req, res) => {
//   try {
//     // Test if there is a commande
//     const foods = await Food.find({
//       SpecFood.ClientID: req.user.id,
//       LivreOuNon: false,
//       utilisateurID: req.user.id,
//     })
//     if (!commandes) {
//       return res
//         .status(400)
//         .send({ message: "vous n’avez pas des commandes en attents ! " });
//     }
//     return res.status(200).json({
//       status: "Success",
//       commandes,
//     });
//   } catch (err) {
//     return res.status(404).json({
//       status: "Failed",
//       message: err,
//     });
//   }
// };

exports.ReserveOneFood = async (req, res) => {
  try {
    currentUser = req.user;
    const HwMny = req.body;
    // Test if there is a food
    const food = await Food.findById(req.params.idFood);
    if (!food) {
      return res.status(400).send({
        message: "No food with that id",
      });
    }
    // Test if the food was exist
    if (food.Exist == true) {
      const specFood = {
        Name: req.user.Name,
        HwMny: req.body.HwMny,
        ClientID: req.user.id,
      };
      // Push  information of specific food into main food
      food.SpecFood.push(specFood);
      // Push  information of specific food into current user profile
      await User.findByIdAndUpdate(currentUser.id, {
        $push: {
          ReqResFood: food.id,
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
      status: "This food is not available !! ",
      err,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.addNewFood = async (req, res, next) => {
  try {
    // Creat new food
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

exports.PrepareFood = async (req, res, next) => {
  try {
    // Prepare new food
    const food = await PrepareFood.create(req.body);
    // Test if food model was created
    if (food) {
      // Push the id of current client in food model
      await PrepareFood.findByIdAndUpdate(food.id, {
        $push: { ClientID: req.user.id },
      });
      //Add the id of food in the profile of current client
      await User.findByIdAndUpdate(req.user.id, {
        $push: { ReqPreFood: food.id },
      });
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

exports.findAllFoodsReserved = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await PrepareFood.find({});
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

exports.findAllPreparedFoods = async (req, res) => {
  try {
    // Test if there is foods
    const foods = await Food.find({});
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

exports.getAllDoneFoods = async (req, res) => {
  try {
    // Test if there is a food
    const foods = await PrepareFood.find({ Done: false });
    // Test if food's requests is an empty array
    if (foods.length == 0) {
      return res.status(400).send({ message: "There is no done foods !! " });
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

exports.findAllRequestPrepareFood = async (req, res) => {
  try {
    // Test if there is a food
    const foods = await PrepareFood.find({ Done: true });
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

exports.findAllFoodsReserved = async (req, res) => {
  try {
    // Test if there is a food
    const food = await Food.findById(req.params.idFood);
    let requests = food.clientID;
    // Test if food's requests s an empty array
    if (requests.length == 0) {
      return res.status(400).send({ message: "There is no request !! " });
    }
    return res.status(200).json({
      status: "Success",
      requests,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      err,
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

exports.findAll = async (req, res, next) => {
  try {
    // Test if there is a document
    const doc = await Food.find({});
    return res.status(200).json({
      status: "Success",
      result: doc.length,
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

exports.deleteOneRequestFood = async (req, res, next) => {
  try {
    // Find food and delete it
    const food = await PrepareFoodSchema.findByIdAndDelete(req.params.idFood);
    if (food)
      return res.status(200).json({
        status: "Success",
        data: null,
      });
    return res.status(400).json({
      status: "No doc with that id !!",
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
    let food = await PrepareFoodSchema.findById(req.params.idRequest);
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
      status: "Food condition change Successfuly !!",
      food,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};
