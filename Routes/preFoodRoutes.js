const express = require("express");
const router = express.Router();
const preFoodController = require("../Controllers/preFoodController");
const authController = require("../Controllers/authController");

//Prepare food by current client
router.post(
  "/Food",
  authController.protect,
  authController.restrictTo("client"),
  preFoodController.PrepareFood
);
// List of all  request foods that already prepared for admin
router.get(
  "/AllDoneRequest",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.getAllDoneRequestPrepareFoods
);

// List of all done prepared foods for current client
router.get(
  "/MyDoneFoods",
  authController.protect,
  authController.restrictTo("client"),
  preFoodController.findMyDonePreparedFoods
);

// List of all foods  for current client
router.get(
  "/Request",
  authController.protect,
  authController.restrictTo("client"),
  preFoodController.getAllRequest
);

// List of all done prepared foods for current client
router.get(
  "/MyUndoneFoods",
  authController.protect,
  authController.restrictTo("client"),
  preFoodController.findMyUndonePreparedFoods
);

// List of all done prepared foods for current client
router.get(
  "/AllFoods",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.findAllDonePreFoodAdmin
);

//delete one request by admin
router.patch(
  "/HideFood/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.HideOneRequestFood
);

//Change food condition by admin
router.patch(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.changeFoodCondition
);

// List of all request prepare food for admin
router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.findAllRequestPrepareFood
);

//Get one food for admin
router.get(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  preFoodController.getOneFood
);

//cancel request prepare food by current client
router.delete(
  "/Food/:idFood",
  authController.protect,
  authController.restrictTo("client"),
  preFoodController.cancelRequestPrepareFood
);

module.exports = router;
