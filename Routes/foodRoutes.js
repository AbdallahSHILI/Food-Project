const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/foodController");
const authController = require("../Controllers/authController");

// add new food
router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.addNewFood
);

//Prepare food by current client
router.post(
  "/PrepareFood",
  authController.protect,
  authController.restrictTo("client"),
  foodController.PrepareFood
);

// List of all prepared foods for admin
router.get(
  "/AllPreFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllPreparedFoods
);

// List of all reserved foods for admin
router.get(
  "/AllReservedFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllFoodsReserved
);

//cancel request prepare food by current client
router.delete(
  "/CancelRequestPre/:idFood",
  authController.protect,
  authController.restrictTo("client"),
  foodController.cancelRequestPreFood
);

//Reserve one food by current client
router.patch(
  "/FoodReserve/:idFood",
  authController.protect,
  authController.restrictTo("client"),
  foodController.ReserveOneFood
);

// List of all reserved foods for current client
router.get(
  "/MyReservedFoods",
  authController.protect,
  authController.restrictTo("client"),
  foodController.findMyReservedFoods
);

// List of all done prepared foods for current client
router.get(
  "/MyPreparedFoods",
  authController.protect,
  authController.restrictTo("client"),
  foodController.findMyPreparedFoods
);

// List of all foods for admin
router.get(
  "/AllFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllFoods
);

// List of all request prepare food for admin
router.get(
  "/AllRequestFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllRequestPrepareFood
);

// List of all  request foods that already prepared for admin
router.get(
  "/AllRequestPreFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.getAllDoneFoods
);

//delete one food by admin
router.delete(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.deleteOneFood
);

//delete one request by admin
router.delete(
  "/DeleteRequest/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.deleteOneRequestFood
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
  "/FoodReserve/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.changeFoodCondition
);

module.exports = router;
