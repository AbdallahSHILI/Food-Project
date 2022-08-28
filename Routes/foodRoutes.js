const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

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
  foodController.prepareFood
);

// Liste of all foods for admin
router.get(
  "/AllFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAll
);

// Liste of all request prepare foods for admin
router.get(
  "/AllRequestFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllrequestPrepareFood
);

// Liste of all  request foods that already prepared for admin
router.get(
  "/AllrequestPreFoods",
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

//delete one reqest by admin
router.delete(
  "/DeleteRequest/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.deleteOneRequestFood
);

// Liste of all foods for admin
router.get(
  "/AllPreFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllPreraredFoods
);

//Reserve one food by cuurent client
router.patch(
  "/FoodReserve/:idfood",
  authController.protect,
  authController.restrictTo("client"),
  foodController.ReserveOneFood
);

// Liste of all reserved foods for admin
router.get(
  "/AllReservedFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllFoodsReseved
);

//Update one food by admin
router.patch(
  "/:idFood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.UpdateOneFood
);

// Liste of all prepared foods for admin
router.get(
  "/AllPreparedFoods",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.findAllFoodsPrepared
);

//Change food condition by admin
router.patch(
  "/FoodReserve/:idfood",
  authController.protect,
  authController.restrictTo("admin"),
  foodController.changeFoodCondition
);

module.exports = router;
