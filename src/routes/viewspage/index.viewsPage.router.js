const express = require("express");
const router = express.Router();
const getPageController = require('../../controller/viewPage/index.viewsPage.controller');
const authViewPageRouter = require('../viewspage/auth.viewPage.router');
const billViewPageRouter = require('../viewspage/bill.viewPage.router');
const chartViewPageRouter = require('../viewspage/chart.viewPage.router');
const productViewPageRouter = require('../viewspage/product.viewPage.router');
const supplierViewPageRouter = require('../viewspage/supplier.viewPage.router');
const taskViewPageRouter = require('../viewspage/task.viewPage.router');
const {verifyTokenFromWebPage} = require('../../middleware/auth')


router.get('/', verifyTokenFromWebPage, getPageController.getHomePage);
router.use('/auth', authViewPageRouter);
router.use('/product', productViewPageRouter);
router.use('/supplier', supplierViewPageRouter);
router.use('/tasks', taskViewPageRouter);
router.use('/charts', chartViewPageRouter);
router.use('/bill', billViewPageRouter);
//

module.exports = router;
