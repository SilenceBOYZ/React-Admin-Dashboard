const db = require("../models/index");
let readAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      data = {};
      let allRoles = await db.Roles.findAll({
        raw: true,
      });
      if(!allRoles.length) {
        data.errCode = 1;
        data.errMessage = "Couldn't found any information"
      }else {
        data.errCode = 1;
        data.errMessage = "Loading successfully"
        data.dataSelected = allRoles
      }
      resolve(data);
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  readAllRoles
}