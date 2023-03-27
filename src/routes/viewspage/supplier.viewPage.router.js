const express = require("express");
const router = express.Router();
const supplierViewPageController = require('../../controller/viewPage/supplier.viewsPage.controller');
const {verifyTokenFromWebPage} = require('../../middleware/auth')

router.get('/', verifyTokenFromWebPage, supplierViewPageController.getSupplierPage);
router.get('/:id', verifyTokenFromWebPage, supplierViewPageController.getDetailSupplierPage);
//

module.exports = router;
