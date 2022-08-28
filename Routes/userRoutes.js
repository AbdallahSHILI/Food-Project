const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//create new compte
router.post("/signup", authController.signup);

//login by adress and psw
router.post("/login", authController.login);

//get profil by current user
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUserById
);

// Liste of all clients for admin
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
router.patch("/:id", authController.protect, userController.updateClient);

//delete user for admin
router.delete(
  "/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUser
);

module.exports = router;
