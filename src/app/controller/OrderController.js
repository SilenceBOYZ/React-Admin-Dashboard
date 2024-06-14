const OrderServices = require("../../services/orderServices");
const OrderItemServices = require("../../services/orderItemService");

let getOrders = async (req, res) => {
  let pageNum = parseInt(req.query.pageNum)
  let data = await OrderServices.getOrders(pageNum);
  res.status(200).json(data)
}

let getUserOrderDetail = async (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let userId = parseInt(req.query.userId);
  let data = await OrderItemServices.getOrderItem(orderId, userId);
  res.status(200).json(data)
}

let getOrdersInfor = async (req, res) => {
  let data = await OrderServices.getOrderInfor();
  res.status(200).json(data);
}

let getItemOrderQuantity = async (req, res) => {
  let data = await OrderServices.getItemOrders();
  res.status(200).json(data);
}

module.exports = {
  getOrders,
  getUserOrderDetail,
  getOrdersInfor,
  getItemOrderQuantity
}