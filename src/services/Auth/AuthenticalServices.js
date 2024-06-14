const db = require("../../models/index");
const { QueryTypes } = require('sequelize');
const { seqeuelize } = require("../../config");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
require("dotenv").config();

async function checkUserPassword(passwordRef, userPassword) {
  const match = bcrypt.compareSync(passwordRef, userPassword);
  return match;
}

let checkUserLogin = (userEmail, passwordRef) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let user = await db.Users.findOne({
        where: {
          email: userEmail
        }
      })
      if (!user) {
        data.errCode = 1;
        data.errMessage = "Email không tồn tại";
      } else {
        let check = await checkUserPassword(passwordRef, user.userPassword);
        if (check) {
          let userData = await db.Users.findOne({
            where: {
              email: userEmail
            },
            attributes: ['id', 'userName', 'userImage', 'address', 'phoneNumber']
          })
          data.errCode = 0;
          data.errMessage = "Bạn đã đăng nhập thành công";
          data.token = jwt.sign(userData.id, process.env.SECRET);
          // data.dataSelected = userData;
        } else {
          data.errCode = 2;
          data.errMessage = "Mật khẩu không chính xác";
        }
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}


let hashUserPassword = (userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(userPassword, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e)
    }
  })
}

let createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let checkEmail = await db.Users.findOne({
        where: {
          email: userData.email
        }
      });
      if (checkEmail) {
        data.errCode = 1
        data.errMessage = "The email have been already existed !!!"
      } else {
        let userPassword = await hashUserPassword(userData.password);
        let user = await db.Users.create({
          userPassword: userPassword,
          email: userData.email,
          userName: "",
          roleId: 3,
          userImage: "",
          address: "",
          phoneNumber: "",
        });
        if (user) {
          data.errCode = 0;
          data.errMessage = "A new user have been created !!!";
          data.dataSelected = user
        } else {
          data.errCode = 2;
          data.errMessage = "Failed to create a user";
        }
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let getUserbyId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let user = await seqeuelize.query(`SELECT users.id, users.userName, users.email, users.userImage, users.address, users.phoneNumber, roleId FROM users WHERE users.id=${userId}`,
        { type: QueryTypes.SELECT })
      if (user.length > 0) {
        data.errCode = 0;
        data.message = "A user have been found"
        data.dataSelected = user;
      } else {
        data.errCode = 1;
        data.message = "Can not found user"
      }
      resolve(data);
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  checkUserLogin,
  createUser,
  getUserbyId
}