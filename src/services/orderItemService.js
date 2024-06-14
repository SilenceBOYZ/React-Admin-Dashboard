const { seqeuelize } = require("../config");
const { QueryTypes } = require('sequelize');


let getOrderItem = (orderId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      data = {}
      let queryString = `SELECT DISTINCT items.id, items.foodName, items.foodImage, ordersitems.quantity, ordersitems.unitPrice, orders.address, orders.phoneNumber FROM ordersitems, orders, items, users WHERE users.id = orders.userId AND ordersitems.itemId = items.id AND ordersitems.orderId = orders.id AND orders.id = ${orderId} AND users.id = ${userId}`
      let orderItems = await seqeuelize.query(queryString, { type: QueryTypes.SELECT });
      if (!orderItems.length) {
        data.errCode = 1;
        data.errMessage = "This order doesn't exist"
      } else {
        data.errCode = 0;
        data.errMessage = "Loading order detail successfuly"
        data.dataSelected = orderItems
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  getOrderItem
}