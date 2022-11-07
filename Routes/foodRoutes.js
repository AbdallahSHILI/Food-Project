const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/foodController");
const authController = require("../Controllers/authController");

// add new food
router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.addNewReadyFood
);

// List of all reserved foods for current client
router.get(
  "/MyFoods",
  authController.protect,
  authController.restrictTo("client"),
  foodController.findMyReservedFoods
);

// Menu of foods for current client
router.get(
  "/Menu",
  authController.protect,
  authController.restrictTo("client"),
  foodController.Menu
);

// List of all reserved foods for admin
router.get(
  "/AllRequest",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllRequestReserveFood
);

//Change food condition by admin
router.patch(
  "/Request/:idFood/:idRequest",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.changeRequestCondition
);

//Reserve one food by current client
router.post(
  "/Reserve/:idFood",
  authController.protect,
  authController.restrictTo("client"),
  foodController.ReserveOneFood
);

// List of all foods for admin
router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllFoods
);

//Get one food for admin and current client
router.get(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin", "client"),
  foodController.getOneFood
);

//Update one food by admin
router.patch(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.UpdateOneFood
);

//Change food condition by admin
router.patch(
  "/HideFood/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.hideOneFood
);

//delete one food by admin
router.delete(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.deleteOneFood
);

module.exports = router;
