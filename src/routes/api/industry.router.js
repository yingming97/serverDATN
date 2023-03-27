const express = require("express");
const router = express.Router();
const industryController = require('../../controller/industry.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/industry", industryController.create);
router.get("/industry", industryController.getAll);
router.get("/industry/:id", industryController.getAnIndustry);
router.put("/industry/:id", industryController.update);
router.delete("/industry/:id", industryController.delete);

module.exports = router;