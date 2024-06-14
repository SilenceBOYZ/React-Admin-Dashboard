const { seqeuelize } = require("../config");
const { QueryTypes } = require('sequelize');
const CartServices = require("../services/cartServices")


let createOrder = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userCart = await CartServices.getUserCart(userId);
      let itemsInCart = userCart.map(el => {
        return { totalPrice: el.foodPrice * el.quantity, foodId: el.foodId }
      })
      // console.log(itemsInCart);
      let itemStringId = await itemsInCart.map(el => el.foodId).join(", ");
      // Nếu độ dài của chuỗi bằng không nghĩa là item đã được tạo từ trước đó
      // Tránh trường hợp người dùng vô ích hay cố ý refresh lại trang web để thực hiện lại query lại một lần nữa
      // Lúc này ta sẽ trả mã lỗi về cho người dùng qua biến result và sẽ dùng errCode để chuyển trang
      // Việc này sẽ ngặn chặn việc tạo lại giỏ hàng một lần nữa
      if (itemStringId.length < 1) {
        let result = {}
        result.errCode = 1;
        result.message = "Id doesn't exist"
        resolve(result);
        return;
      }
      let totalAmount = itemsInCart.map(el => el.totalPrice).reduce((preEl, curEl) => preEl + curEl, 0)
      // console.log(totalAmount);
      let orders = await seqeuelize.query("INSERT INTO `Orders` (userId, address, phoneNumber, paymentMethod, totalAmount) VALUES (" + parseInt(userId) + ", '" + data.address + "', '" + data.phone + "', '" + data.payment + "', " + totalAmount + ")", { type: QueryTypes.INSERT })
      // Biến orders sẽ trả về một mảng với [0] là id được tạo từ giỏ hàng và [1] cột
      if (orders) {
        let items = userCart.map(el => {
          return { foodId: el.foodId, foodPrice: el.foodPrice, quantity: el.quantity }
        })
        let stringTest = [];
        let idItems = [];
        for (let i = 0; i < items.length; i++) {
          stringTest.push(`(${orders[0]}, ${items[i].foodId}, ${items[i].quantity}, ${items[i].foodPrice})`);
          idItems.push(items[i].foodId);
        }
        let itemSelected = stringTest.join(', ');
        let itemsInCartToDelete = idItems.join(", ")
        // console.log(itemsInCartToDelete);
        await CartServices.deletItemsInCart(itemsInCartToDelete, userId);
        let queryString = "INSERT INTO `ordersItems` (orderId, itemId, quantity, unitPrice) VALUES " + itemSelected;
        await seqeuelize.query(queryString, { type: QueryTypes.INSERT })
      }
      resolve(orders[0]);
    } catch (error) {
      reject(error);
    }
  });
}

let getUserOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "SELECT orders.id, users.userName, orders.totalAmount, orders.address, orders.phoneNumber, orders.createdAt, orders.paymentMethod, orders.status FROM orders, users WHERE orders.userId = users.id AND users.id = " + userId;
      let orders = await seqeuelize.query(queryString, { type: QueryTypes.SELECT });
      resolve(orders);
    } catch (error) {
      reject(error);
    }
  })
}

let getOrders = (pageNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageSize = 10;
      let data = {}
      let queryString = "SELECT orders.userId, orders.id, users.userName, orders.createdAt, orders.address, orders.paymentMethod, orders.totalAmount, orders.status FROM `orders`, `users` WHERE orders.userId = users.id";
      let orders = await seqeuelize.query(queryString, { type: QueryTypes.SELECT });
      if (!orders.length) {
        data.errCode = 1
        data.errMessage = "Loading data failed"
      } else {
        let startIndex = (pageNum - 1) * pageSize;
        let totalLink = Math.ceil(orders.length / pageSize);
        let query = await seqeuelize.query(`SELECT orders.userId, orders.id, users.userName, orders.createdAt, orders.address, orders.paymentMethod, orders.totalAmount, orders.status FROM orders, users WHERE orders.userId = users.id LIMIT ${startIndex}, ${pageSize}`, { type: QueryTypes.SELECT })
        data.startIndex = startIndex === 0 ? startIndex + 1 : startIndex;
        data.lastIndex = pageNum * pageSize;
        data.totalLink = totalLink;
        data.totalData = orders.length;
        data.dataSelected = query;
        data.errCode = 0;
        data.errMessage = "Loading data successfully";
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

let getOrderInfor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let queryString = "SELECT orders.id , orders.createdAt, orders.paymentMethod, orders.totalAmount, orders.status FROM `orders` ";
      let orders = await seqeuelize.query(queryString, { type: QueryTypes.SELECT });
      if (!orders.length) {
        data.errCode = 1
        data.errMessage = "Loading data failed"
      } else {
        data.errCode = 0;
        data.dataSelected = orders;
        data.errMessage = "Loading data successfully";
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

let getItemOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let queryString = "SELECT items.id, items.foodName, ordersitems.quantity * ordersitems.unitPrice AS totalAmount, ordersitems.createdAt FROM items, ordersitems, orders WHERE ordersitems.itemId = items.id and ordersitems.orderId = orders.id AND orders.status = 'ThanhCong'";
      let orders = await seqeuelize.query(queryString, { type: QueryTypes.SELECT });
      if (!orders.length) {
        data.errCode = 1
        data.errMessage = "Loading data failed"
      } else {
        data.errCode = 0;
        data.dataSelected = orders;
        data.errMessage = "Loading data successfully";
      }
      resolve(data);
    } catch (error) {
      reject(error); 
    }
  })
}

module.exports = {
  createOrder,
  getUserOrder,
  getOrders,
  getOrderInfor,
  getItemOrders
}