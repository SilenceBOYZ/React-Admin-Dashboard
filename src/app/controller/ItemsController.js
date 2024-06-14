const itemServices = require("../../services/itemServices");

let getAllItem = async (req, res) => {
  let pageNum = parseInt(req.query.pageNum);
  let itemData = await itemServices.readAllItems(pageNum);
  res.status(200).json(itemData);
}

let createItem = async (req, res) => {
  let data = await req.body;
  let image = req.file.filename;
  let item = await itemServices.createNewItem(data, image)
  res.status(200).json(item);
}

let deleteItem = async (req, res) => {
  let itemId = await req.query.id;
  let id = parseInt(itemId)
  let data = await itemServices.removeItem(id);
  res.status(200).json(data);
}

let udpateItem = async (req, res) => {
  let itemId =  parseInt(req.query.id);
  let data = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
  } else {
    newImage = req.body.oldImage;
  }
  let item = await itemServices.updateItem(itemId, data, newImage);
  res.status(200).json(item);
}

let getItem = async (req, res) => {
  let itemId = parseInt(req.query.id);
  let item = await itemServices.getItemById(itemId);
  res.status(200).json(item);
}

module.exports = {
  getAllItem,
  createItem,
  deleteItem,
  udpateItem,
  getItem
}; 