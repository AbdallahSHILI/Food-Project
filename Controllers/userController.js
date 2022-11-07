const User = require("../models/UserModel");

//get current user using the getUserByID
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// find all clients for admin
exports.findAllClients = async (req, res, next) => {
  try {
    // Test if there is clients
    const doc = await User.find({ Role: "client" });
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

// find one user by id for admin
exports.getUserById = async (req, res, next) => {
  try {
    // Test if there is an employee
    const user = await User.findById(req.params.idUser);
    if (user) {
      return res.status(200).json({
        status: "Success",
        data: {
          user,
        },
      });
    }
    return res.status(404).json({
      status: "No user with that id !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id == req.params.id) {
      // Update new changes
      let doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      // Test if document was update Successfully
      if (doc) {
        return res.status(200).json({
          status: "Success",
          data: {
            doc,
          },
        });
      }
      return res.status(404).json({
        status: "No document with that id !!",
      });
    }
    return res.status(404).json({
      status: "You don't have the permission to do that action !!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

exports.deleteOneUser = async (req, res, next) => {
  try {
    // Find user and delete it
    const doc = await User.findByIdAndDelete(req.params.idUser);
    if (!doc) {
      return res.status(400).json({
        status: "No user with that id !!",
      });
    }
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
