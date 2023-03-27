const express = require("express");
const router = express.Router();
const billViewPageController = require('../../controller/viewPage/bill.viewsPage.controller')
const {verifyTokenFromWebPage} = require('../../middleware/auth')

router.get('/', verifyTokenFromWebPage, billViewPageController.getBillPage);
router.get('/:id', verifyTokenFromWebPage, billViewPageController.getDetailBillPage);

module.exports = router;
