const SupplierModel = require("../../models/supplier.model")


const supplierViewsController = {

    getSupplierPage: async (req, res) => {
        const allSupplier = await SupplierModel.find()
            .populate('products');
        return res.render('./supplier/supplier', {data: allSupplier})
    },
    getDetailSupplierPage: async (req, res) => {
        const aSupplier = await SupplierModel.findById(req.params.id)
            .populate('products');
        return res.render('./supplier/supplierDetail', {data: aSupplier})
    },
}

module.exports = supplierViewsController;