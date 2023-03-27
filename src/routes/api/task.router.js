const express = require("express");
const router = express.Router();
const taskController = require('../../controller/task.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/createTask", verifyTokenFromApi, taskController.create);
router.get("/getAllTask", verifyTokenFromApi, taskController.getAll);
router.get("/task/:id", verifyTokenFromApi, taskController.getATask);
router.put("/updateTask/:id", verifyTokenFromApi, taskController.update);
router.delete("/deleteTask/:id", verifyTokenFromApi, taskController.delete);

//
module.exports = router;