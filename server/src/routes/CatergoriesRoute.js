const express = require("express");
const router = express.Router();
const CatergoriesController = require("../app/controller/CatergoryController")

router.get("/get-all-catergories", CatergoriesController.getAllCatergory);
router.get("/get-single-catergory", CatergoriesController.getCatergory);
router.post("/create-new-catergory", CatergoriesController.createCatergory);
router.put("/update-catergory", CatergoriesController.updateCatergory);
router.delete("/delete-catergory", CatergoriesController.deleteCatergoryById);
module.exports = router;