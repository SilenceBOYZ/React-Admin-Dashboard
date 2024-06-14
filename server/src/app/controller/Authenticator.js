const AuthenticatorService = require("../../services/Auth/AuthenticalServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();


let signIn = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let data = await AuthenticatorService.checkUserLogin(email, password)
  res.status(200).json(data)
}

let signUp = async (req, res) => {
  let userData = req.body;
  let data = await AuthenticatorService.createUser(userData);
  res.status(200).json(data);
}

let getUser = async(req, res) => {
  let id = req.query.token;
  let userId = parseInt(jwt.verify(id, process.env.SECRET));
  let data = await AuthenticatorService.getUserbyId(userId);
  res.status(200).json(data)
}

module.exports = {      
  signIn,
  signUp,
  getUser
}