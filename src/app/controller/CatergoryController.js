
const catergoryServices = require("../../services/catergoriesServices");

let createCatergory = async (req, res) => {
  let data = req.body;
  console.log(data);
  let catergory = await catergoryServices.createCatergory(data);
  res.status(200).json(catergory)
}

let getAllCatergory = async (req, res) => {
  let data = await catergoryServices.getAllCatergories();
  res.status(200).json(data);
}

let updateCatergory = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let data = req.body;
  let catergory = await catergoryServices.updateCatergoryData(idSelected, data);
  res.status(200).json(catergory);
}

let getCatergory = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let catergory = await catergoryServices.getCatergoryById(idSelected);
  res.status(200).json(catergory);
}

let deleteCatergoryById = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let catergory = await catergoryServices.deleteCatergoryById(idSelected);
  res.status(200).json(catergory);
}

module.exports = {
  createCatergory,
  getAllCatergory,
  updateCatergory, 
  getCatergory,
  deleteCatergoryById
}