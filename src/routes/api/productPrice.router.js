const express = require("express");
const router = express.Router();
const productPriceController = require('../../controller/productPrice.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/productPrice",verifyTokenFromApi, productPriceController.create);
router.get("/productPrice",verifyTokenFromApi, productPriceController.getAll);
router.get("/productPrice/:id",verifyTokenFromApi, productPriceController.getAProductPrice);

module.exports = router;