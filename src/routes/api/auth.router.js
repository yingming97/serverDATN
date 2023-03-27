const express = require("express");
const router = express.Router();
const authController = require('../../controller/auth.controller');


const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')


router.post("/clear", authController.clearDB)
router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.post("/log-out", authController.logout);
router.post("/forgot-pass", authController.forgotPass);
router.post("/change-pass", authController.changePassword);
router.post("/refresh-token", authController.refreshToken);
router.get("/getAllNameUser", verifyTokenFromApi, authController.getAllNameUser);
//

module.exports = router;
