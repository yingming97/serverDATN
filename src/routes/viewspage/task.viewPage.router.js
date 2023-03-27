const express = require("express");
const router = express.Router();
const taskViewPageController = require('../../controller/viewPage/task.viewsPage.controller');
const {verifyTokenFromWebPage} = require('../../middleware/auth')

router.get('/', verifyTokenFromWebPage, taskViewPageController.getTasksPage);
router.get('/:id', verifyTokenFromWebPage, taskViewPageController.getDetailTasksPage);
//

module.exports = router;
