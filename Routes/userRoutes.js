const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//create new compte
router.post("/Signup", authController.signup);

//login by address and psw
router.post("/Login", authController.login);

//get profile by current user
router.get(
  "/Me",
  authController.protect,
  userController.getMe,
  userController.getUserById
);

// List of all clients for admin
router.get(
  "/AllClients",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findAllClients
);

//get user by id for admin
router.get(
  "/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getUserById
);

//update profile by current user
router.patch("/:id", authController.protect, userController.updateProfile);

//delete user for admin
router.delete(
  "/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteOneUser
);

module.exports = router;
