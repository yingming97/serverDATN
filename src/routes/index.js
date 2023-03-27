const router = require("express").Router();
const industryRouter = require('./api/industry.router');
const supplierRouter = require('./api/supplier.router');
const productRouter = require('./api/product.router');
const authController = require('./api/auth.router');
const invoiceRouter = require('./api/invoice.router')
const taskRouter = require('./api/task.router');
const expiryRouter = require('./api/expiry.router');
const productPriceRouter = require('./api/productPrice.router')
const invoiceDetailRouter = require('./api/invoiceDetail.router')
const statsRouter = require('./api/stats.router')
// router view pages
const viewsRouter = require('./viewspage/index.viewsPage.router');

router.use("/api", authController);
router.use("/api", industryRouter);
router.use("/api", supplierRouter);
router.use("/api", productRouter);
router.use("/api", invoiceRouter);
router.use("/api", taskRouter);
router.use("/api", expiryRouter);
router.use("/api", productPriceRouter);
router.use("/api", invoiceDetailRouter);
router.use("/api", statsRouter);
// router view pages
router.use("/", viewsRouter);

module.exports = router;
