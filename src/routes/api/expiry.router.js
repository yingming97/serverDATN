const express = require("express");
const router = express.Router();
const expiryController = require('../../controller/expiry.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/expiry",verifyTokenFromApi, expiryController.create);
router.get("/expiry",verifyTokenFromApi, expiryController.getAll);
router.get("/expiry/:id",verifyTokenFromApi, expiryController.getAnExpiry);

module.exports = router;