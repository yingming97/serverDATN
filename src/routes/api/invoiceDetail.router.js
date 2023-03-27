const express = require('express');
const invoiceDetailController = require('../../controller/invoiceDetail.controller');
const router = express.Router();

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.get('/invoiceDetail',verifyTokenFromApi, invoiceDetailController.getAll);
router.post('/invoiceDetail',verifyTokenFromApi, invoiceDetailController.create);
router.put('/invoiceDetail/:id',verifyTokenFromApi, invoiceDetailController.update);
router.delete('/invoiceDetail/:id',verifyTokenFromApi, invoiceDetailController.delete);
router.get('/invoiceDetail/:id',verifyTokenFromApi, invoiceDetailController.getAnInvoiceDetail);

module.exports = router;