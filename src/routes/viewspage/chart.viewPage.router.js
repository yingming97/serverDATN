const express = require("express");
const router = express.Router();
const chartViewPageController = require('../../controller/viewPage/chart.viewsPage.controller');
const {verifyTokenFromWebPage} = require('../../middleware/auth')

router.get('/', verifyTokenFromWebPage, chartViewPageController.getChartPage);
//

module.exports = router;
