const express = require('express');
const invoiceController = require('../../controller/invoice.controller');
const router = express.Router();

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.get('/invoice', verifyTokenFromApi, invoiceController.getAll);
router.post('/invoice', verifyTokenFromApi, invoiceController.create);
router.get('/invoice/:id', verifyTokenFromApi, invoiceController.getAnInvoice);
router.put('/invoice/:id', verifyTokenFromApi, invoiceController.update);
router.delete('/invoice/:id', verifyTokenFromApi, invoiceController.delete);

module.exports = router;