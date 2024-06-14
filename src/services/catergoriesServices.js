const { seqeuelize } = require("../config");
const db = require("../models/index");
const { QueryTypes } = require('sequelize');

let getAllCatergories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let catergories = await seqeuelize.query("SELECT * FROM Catergories", { type: QueryTypes.SELECT })
      if (!catergories.length) {
        data.errCode = 1;
        data.message = "Error Loading data";
      } else {
        data.errCode = 0;
        data.message = "Loading data successfully"
        data.dataSelected = catergories;
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let createCatergory = (catergoryData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let newCatergory = await db.Catergories.create({
        catergoryName: catergoryData.catergoryName,
        catergoryDesc: catergoryData.catergoryDesc
      });
      if (newCatergory) {
        data.errCode = 0;
        data.message = "a piece of data have been created in your system";
        data.dataSelected = newCatergory;
      } else {
        data.errCode = 1;
        data.message = "Creating failed"
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let getCatergoryById = (idFound) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      if (aItem) {
        data.errCode = 0;
        data.errMessage = "Get a data in our system ";
        data.dataSelected = aItem;
      } else {
        data.errCode = 1;
        data.errMessage = "The data doesn't exist in our system ";
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let updateCatergoryData = (idFound, catergoryData) => {
  return new Promise(async (resolve, reject) => {
    try {
      data = {}
      let message = {}
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      if (aItem) {
        let catergoryItem = await db.Catergories.update({
          catergoryName: catergoryData.catergoryName,
          catergoryDesc: catergoryData.catergoryDesc,
        }, {
          where: {
            id: idFound
          }
        }
        )
        if(catergoryItem) {
          data.errCode = 0;
          data.message = "Item successfully updated"
          data.dataSelected = catergoryItem;
        } else {
          data.errCode = 2;
          data.message = "Update failed"
        }
      } else {
        message.errCode = 1;
        message.errMessage = "The data doesn't exist in our system";
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let deleteCatergoryById = async (idFound) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      if (aItem.length > 1) {
        await db.Catergories.destroy({
          where: {
            id: idFound
          }
        });
        data.errCode = 0
        data.errMessage = "Item have been remove from your system";
      } else {
        data.errCode = 1
        data.errMessage = "Data haven't existed in our database";
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}


module.exports = { createCatergory, getCatergoryById, updateCatergoryData, deleteCatergoryById, getAllCatergories }