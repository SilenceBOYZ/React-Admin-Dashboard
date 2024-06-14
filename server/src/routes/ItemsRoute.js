const upload = require("../config/muterConfig")
const express = require("express");
const router = express.Router();
const itemController = require("../app/controller/ItemsController");
// router.post("/create-new-item", upload.single("productImage"), itemsCrud.createANewItem);
router.get("/get-all-items", itemController.getAllItem);
router.post("/create-new-item", upload.single('foodImage'), itemController.createItem);
router.get("/get-item", itemController.getItem);
router.put("/update-item", upload.single("foodImage"), itemController.udpateItem);
router.delete("/delete-item", itemController.deleteItem);

module.exports = router;