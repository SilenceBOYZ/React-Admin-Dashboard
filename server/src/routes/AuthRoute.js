const express = require("express");
const router = express.Router();
const AuthenticatorController = require("../app/controller/Authenticator");

router.post("/signin", AuthenticatorController.signIn)
router.post("/signup", AuthenticatorController.signUp)
router.get("/get-userInfor", AuthenticatorController.getUser)

module.exports = router;