const express = require('express');
const invoiceController = require('../../controller/invoice.controller');
const router = express.Router();

const {
    verifyTokenFromApi,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
} = require('../../middleware/auth')

router.get('/revenue',verifyTokenFromApi, invoiceController.revenueStats);
router.get('/revenue/import',verifyTokenFromApi, invoiceController.revenueStatsByImport);
router.get('/revenue/export',verifyTokenFromApi, invoiceController.revenueStatsByExport);
router.get('/revenue/refund',verifyTokenFromApi, invoiceController.revenueStatsByRefund);
router.get('/revenue/date/:date',verifyTokenFromApi, invoiceController.revenueStatsByDate);
router.get('/revenue/month/:month',verifyTokenFromApi, invoiceController.revenueStatsByMonth);
router.get('/revenue/year/:year',verifyTokenFromApi, invoiceController.revenueStatsByYear);
router.get('/quantity',verifyTokenFromApi, invoiceController.quantityStats);

module.exports = router;