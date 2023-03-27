const express = require("express");
const router = express.Router();
const userController = require("../../controller/user.controller")
const auth = require("../../middleware/auth")

router.get('/logins', userController.createUser);

module.exports = router;