const express = require("express");
const router = express.Router();
const OrderController = require("../app/controller/OrderController");

router.get("/get-orders", OrderController.getOrders);
router.get("/get-order-detail", OrderController.getUserOrderDetail);
router.get("/get-order-infor", OrderController.getOrdersInfor);
router.get("/get-order-item-quantity", OrderController.getItemOrderQuantity);

module.exports = router;