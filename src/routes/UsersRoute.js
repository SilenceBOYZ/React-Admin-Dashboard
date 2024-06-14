const upload = require("../config/multerUserConfig")
const express = require("express");
const router = express.Router();
const UserController = require("../app/controller/UserController");

router.get("/get-all-users", UserController.getUsers);
router.get("/get-user", UserController.getUser);
router.get("/get-all-user-role", UserController.getUserRole);
router.post("/create-user", upload.single("userImage"), UserController.createUser);
router.put("/update-user", upload.single("userImage"), UserController.updateUser);
router.put("/update-user-infor", upload.single("userImage"), UserController.updateUserInformation);
router.put("/update-user-password", UserController.updateUserPassword);
router.delete("/delete-user", UserController.deleteUser);

module.exports = router;
