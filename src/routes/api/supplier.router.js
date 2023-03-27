const express = require("express");
const router = express.Router();
const supplierController = require('../../controller/supplier.controller');

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.post("/supplier", verifyTokenFromApi, supplierController.create);
router.get("/supplier", verifyTokenFromApi, supplierController.getAll);
router.get("/supplier/:id", verifyTokenFromApi, supplierController.getAnSupplier);
router.put("/supplier/:id", verifyTokenFromApi, supplierController.update);
router.delete("/supplier/:id", verifyTokenFromApi, supplierController.delete);
module.exports = router;