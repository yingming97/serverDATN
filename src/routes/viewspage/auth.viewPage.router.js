const express = require("express");
const router = express.Router();
const authViewPageController = require('../../controller/viewPage/auth.viewsPage.controller')

router.get('/login', authViewPageController.getLoginPage);
router.get('/register', authViewPageController.getRegisterPage);

module.exports = router;
