const { QueryTypes } = require('sequelize');
const { seqeuelize } = require("../config");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let addToCart = (userId, itemId, quantity) => {
  let user = jwt.verify(userId, process.env.SECRET);
  return new Promise(async (resolve, reject) => {
    try {
      let checkItem = await getItemCart(Number.parseInt(itemId), Number.parseInt(user.id));
      if (!checkItem.errCode) {
        let newCart = await db.Carts.create({
          userId: Number.parseInt(user.id),
          itemId: Number.parseInt(itemId),
          quantity: Number.parseInt(quantity),
        })
        resolve(newCart);
      } else {
        let newQuantity = checkItem.cartInfor[0].quantity + Number.parseInt(quantity);
        let updateCart = seqeuelize.query("UPDATE carts SET quantity= " + newQuantity + " WHERE userId= " + Number.parseInt(user.id) + " AND " + " itemId= " + Number.parseInt(itemId), { type: QueryTypes.UPDATE })
        resolve(updateCart);
      }
    } catch (error) {
      reject(error);
    }
  })
}

let getTotalItemInCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    let queryString = "SELECT SUM(carts.quantity) AS totalQuantity, SUM(carts.quantity * items.foodPrice) AS totalPrice FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = " + userId;
    try {
      let cart = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  })
}


let getItemCart = (itemId, userId) => {
  let queryString = "SELECT DISTINCT  items.foodName, items.foodPrice, items.foodImage, carts.quantity FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = " + userId + " AND carts.itemId = " + itemId;
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let cartItem = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      if (cartItem.length < 1) {
        data.errCode = false
      } else {
        data.errCode = true
        data.cartInfor = cartItem;
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}


let getUserCart = (id) => {
  let queryString = "SELECT DISTINCT  items.id AS foodId, items.foodName, items.foodPrice, items.foodImage, carts.quantity FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = '" + id + "' ";
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  })
}

let updateItemsInCart = (cart, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let StringQuery = "";
      // Nối các id thành một chuỗi
      // console.log(StringQuery);
      for (let i = 0; i < cart.length; i++) {
        if (i === cart.length - 1) {
          StringQuery += cart[i].itemId
        } else {
          StringQuery += `${cart[i].itemId}, `
        }
      }
      let findItemsInCart = await getItemsInCart(StringQuery, userId);

      if (findItemsInCart.length < 0) {
        resolve("Error");
      }
      let queryUpdateClauses = "";
      //  WHEN 6 THEN 15 
      for (let i = 0; i < cart.length; i++) {
        queryUpdateClauses += `WHEN ${Number.parseInt(cart[i].itemId)}
         THEN ${Number.parseInt(cart[i].quantity)} `
      }
      // console.log(queryUpdateClauses);
      let queryString = "UPDATE carts SET quantity = CASE itemId " + queryUpdateClauses 
      + "ELSE quantity END WHERE itemId IN (" + StringQuery + ") AND userId = " + userId;
      let cartItemsUpdate = await seqeuelize.query(queryString, { type: QueryTypes.UPDATE })
      resolve(cartItemsUpdate);
    } catch (error) {
      reject(error);
    }
  })
}

let getItemsInCart = (itemIds, userId) => {
  let queryString = "SELECT DISTINCT  items.id AS foodId, carts.quantity FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = " + userId + " AND items.id IN (" + itemIds + ")";
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  })
}

let deleteItemInCart = (itemId, userId) => {
  let queryString = "DELETE FROM Carts Where itemId = "+itemId+" AND " + "userId = " +userId;
  return new Promise(async (resolve, reject) => {
    try {
      await seqeuelize.query(queryString, { type: QueryTypes.DELETE })
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

let deletItemsInCart = (itemId, userId) => {
  let queryString = "DELETE FROM Carts Where itemId IN ("+itemId+") AND userId = " +userId; 
  return new Promise(async (resolve, reject) => {
    try {
      await seqeuelize.query(queryString, { type: QueryTypes.DELETE })
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  addToCart,
  getUserCart,
  getTotalItemInCart,
  getItemsInCart,
  updateItemsInCart,
  deleteItemInCart,
  deletItemsInCart
}