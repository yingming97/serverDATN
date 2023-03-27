const InvoiceModel = require("../../models/invoice.model");


const billViewsController = {

    getBillPage: async (req, res) => {
        const allBill = await InvoiceModel.find()
            .populate('invoiceDetails')
        return res.render('./bill/bill', {data: allBill});
    },
    getDetailBillPage: async (req, res) => {
        const aBill = await InvoiceModel.findById(req.params.id)
            .populate('invoiceDetails')
        return res.render('./bill/billDetail', {data: aBill});
    },
}

module.exports = billViewsController;