const { QueryTypes, where } = require('sequelize');
const { seqeuelize } = require("../config");
const db = require("../models/index");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

let createUser = (userData, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let checkEmail = await db.Users.findOne({
        where: {
          email: userData.userEmail
        }
      });
      if (checkEmail) {
        data.errCode = 1
        data.errMessage = "The email have been already existed !!!"
      } else {
        let userPassword = await hashUserPassword(userData.userPassword);
        let user = await db.Users.create({
          userName: userData.userName,
          userPassword: userPassword,
          email: userData.userEmail,
          roleId: userData.role,
          userImage: image,
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

let getUsers = (pageNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pageSize = 7;
      let data = {}
      let users = await seqeuelize.query(`SELECT users.id, users.userName, users.userPassword, users.email, users.userImage, roles.roleName, users.createdAt FROM users, roles WHERE users.roleId = roles.id `, { type: QueryTypes.SELECT })
      if (!users.length) {
        data.errCode = 1;
        data.message = "No data have been found";
      } else {
        let startIndex = (pageNum - 1) * pageSize;
        let totalLink = Math.ceil(users.length / pageSize);
        let query = await seqeuelize.query(`SELECT users.id, users.userName, users.userPassword, users.email, users.userImage, roles.roleName, users.createdAt FROM users, roles WHERE users.roleId = roles.id LIMIT ${startIndex} , ${pageSize}`, { type: QueryTypes.SELECT });
        data.startIndex = startIndex === 0 ? startIndex + 1 : startIndex;
        data.lastIndex = pageNum * pageSize;
        data.totalLink = totalLink;
        data.totalData = users.length;
        data.dataSelected = query;
        data.errCode = 0;
        data.message = 'Loading data suceessfully';
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
      let user = await seqeuelize.query(`SELECT users.id, users.userName, users.userPassword, users.email, users.userImage, users.address, users.phoneNumber, roles.roleName, users.roleId FROM users, roles WHERE users.roleId = roles.id AND users.id=${userId}`,
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

let updateUser = (userId, userData, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userName, userPassword, email, roleId } = userData;
      let data = {};
      let checkUserId = await db.Users.findOne({
        where: {
          id: userId
        }
      })
      if (checkUserId) {
        let userPasswordHash;
        let verify = userPassword === checkUserId.userPassword
        if (!verify) {
          userPasswordHash = await hashUserPassword(userPassword);
        } else {
          userPasswordHash = userPassword;
        }
        let user = await seqeuelize.query(`UPDATE users SET userName = '${userName}', userPassword = '${userPasswordHash}', email = '${email}', userImage = '${image}', roleId = ${roleId} WHERE id = ${userId}`, { type: QueryTypes.UPDATE })
        if (!user?.length) {
          data.errCode = 3;
          data.errMessage = "Failed to update user"
        } else {
          data.errCode = 0;
          data.errMessage = "Successfuly update user"
          data.dataSelected = user;
        }
      } else {
        data.errCode = 2;
        data.message = "User doesn't exist in your system"
      }
      resolve(data);
    } catch (e) {
      reject(e)
    }
  })
}

let updateUserInfor = (userId, userData, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userName, email, address, phoneNumber } = userData;
      let data = {};
      let checkUserId = await db.Users.findOne({
        where: {
          id: userId
        }
      })
      if (checkUserId) {
        let user = await seqeuelize.query(`UPDATE users SET userName = '${userName}', email = '${email}', userImage = '${image}', address = '${address}', phoneNumber = '${phoneNumber}' WHERE id = ${userId}`, { type: QueryTypes.UPDATE })
        if (!user?.length) {
          data.errCode = 3;
          data.errMessage = "Failed to update user"
        } else {
          data.errCode = 0;
          data.errMessage = "Successfuly update user"
          data.dataSelected = user;
        }
      } else {
        data.errCode = 2;
        data.message = "User doesn't exist in your system"
      }
      resolve(data);
    } catch (e) {
      reject(e)
    }
  })
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let user = await db.Users.findOne({
        where: {
          id: userId
        }
      })
      if (user) {
        await db.Users.destroy({
          where: {
            id: userId
          }
        });
        data.errCode = 0
        data.errMessage = "User have been remove from your system";
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

let updatePassword = (userId, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let passwordHash = await hashUserPassword(password);
      let user = await db.Users.update({
        userPassword: passwordHash
      }, {
        where: {
          id: userId
        }
      })
      if (!user.length) {
        data.errCode = 1;
        data.errMessage = "Update password failed"
      } else {
        data.errCode = 0;
        data.errMessage = "Update password success"
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
  updateUserInfor,
  updatePassword
}