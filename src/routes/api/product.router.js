const express = require("express");
const router = express.Router();
const productController = require('../../controller/product.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/product",verifyTokenFromApi, productController.create);
router.get("/product",verifyTokenFromApi, productController.getAll);
router.get("/product/:id",verifyTokenFromApi, productController.getAProduct);
router.put("/product/:id",verifyTokenFromApi, productController.update);
router.delete("/product/:id",verifyTokenFromApi, productController.delete);

//
module.exports = router;