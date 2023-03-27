const express = require("express");
const router = express.Router();
const productViewPageController = require('../../controller/viewPage/product.viewsPage.controller');
const {verifyTokenFromWebPage} = require('../../middleware/auth')

router.get('/', verifyTokenFromWebPage, productViewPageController.getAllProductPage);
router.get('/:id', verifyTokenFromWebPage, productViewPageController.detailProduct);

//

module.exports = router;
