const { QueryTypes, STRING } = require('sequelize');
const db = require("../models/index");
const { seqeuelize } = require("../config");

let createNewItem = (itemData, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let item = await db.Items.create({
        foodName: itemData.foodName,
        foodPrice: itemData.foodPrice,
        foodDesc: itemData.foodDesc,
        foodImage: imageName,
        catergoryId: parseInt(itemData.catergoryId)
      }, {
        raw: true
      });
      if (!item) {
        data.errCode = 1;
        data.message = "Create an item didn't succeed";
      } else {
        data.errCode = 0;
        data.message = 'A new item have been added in your system';
        data.dataSelected = item;
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let readAllItems = (pageNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageSize = 7;
      let data = {}
      let item = await seqeuelize.query(`SELECT items.id, items.foodName, items.foodPrice, items.foodDesc, items.foodImage, catergories.catergoryName FROM items, catergories WHERE items.catergoryId = catergories.id`, { type: QueryTypes.SELECT })
      if (!item.length) {
        data.errCode = 1;
        data.message = "No data have been found";
      } else {
        let startIndex = (pageNum - 1) * pageSize;
        let totalLink = Math.ceil(item.length / pageSize);
        let itemQuery = await seqeuelize.query(`SELECT items.id, items.foodName, items.foodPrice, items.foodDesc, items.foodImage, catergories.catergoryName FROM items, catergories WHERE items.catergoryId = catergories.id LIMIT ${startIndex} , ${pageSize}`, { type: QueryTypes.SELECT })
        data.startIndex = startIndex === 0 ? startIndex + 1 : startIndex;
        data.lastIndex =  pageNum * pageSize;
        data.totalLink = totalLink;
        data.totalData = item.length;
        data.dataSelected = itemQuery;
        data.errCode = 0;
        data.message = 'Loading data suceessfully';
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let updateItem = (itemId, itemData, newimage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let aItem = await db.Items.findOne({
        where: {
          id: itemId
        }
      })
      if (aItem) {
        let itemUpdated = await db.Items.update({
          foodName: itemData.foodName,
          foodPrice: itemData.foodPrice,
          foodDesc: itemData.foodDesc,
          foodImage: newimage,
          catergoryId: itemData.catergoryId,
        }, {
          where: {
            id: itemId
          }
        });
        data.errCode = 0;
        data.errMessage = "Update Item have been Succeed";
        data.dataSelected = itemUpdated;
      } else {
        data.errCode = 1;
        data.errMessage = "Item haven't found in our database";
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let removeItem = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let aItem = await db.Items.findOne({
        where: {
          id: itemId
        }
      })
      if (aItem) {
        await db.Items.destroy({
          where: {
            id: itemId
          }
        });
        data.errCode = 0
        data.errMessage = "Item have been remove from your system";
      } else {
        data.errCode = 1
        data.errMessage = "Item haven't found in our database";
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let getItemById = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let item = await db.Items.findOne({
        where: {
          id: itemId
        }
      });
      if (item) {
        data.errCode = 0
        data.message = "Item have been loaded"
        data.dataSelected = item;
      } else {
        data.errCode = 1
        data.message = "Item haven't been found"
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  readAllItems,
  createNewItem,
  updateItem,
  removeItem,
  getItemById
}