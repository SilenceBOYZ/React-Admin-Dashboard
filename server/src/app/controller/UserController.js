
const UserServices = require("../../services/userServices");
const RoleServices = require("../../services/roleServices");

let getUsers = async (req, res) => {
  let pageNum = parseInt(req.query.pageNum);
  let usersData = await UserServices.getUsers(pageNum);
  res.status(200).json(usersData);
}

let createUser = async (req, res) => {
  let data = req.body;
  let image = req.file.filename;
  let user = await UserServices.createUser(data, image);
  res.status(200).json(user);
}

let getUser = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let user = await UserServices.getUserbyId(idSelected);
  res.status(200).json(user);
}

let updateUser = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let data = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
  } else {
    newImage = req.body.oldImage;
  }
  let user = await UserServices.updateUser(idSelected, data, newImage);
  res.status(200).json(user);
}


let updateUserInformation = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let data = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
  } else {
    newImage = req.body.oldImage;
  }
  let user = await UserServices.updateUserInfor(idSelected, data, newImage);
  res.status(200).json(user);
}

let deleteUser = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let user = await UserServices.deleteUser(idSelected);
  res.status(200).json(user);
}

let getUserRole = async (req, res) => {
  let roleData = await RoleServices.readAllRoles();
  res.status(200).json(roleData);
}

let updateUserPassword = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  let password = req.body.userPassword;
  let user = await UserServices.updatePassword(idSelected, password);
  res.status(200).json(user);
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserRole,
  updateUserInformation,
  updateUserPassword
}