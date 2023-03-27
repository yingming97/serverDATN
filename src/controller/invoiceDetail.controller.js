const response  = require('../helper/response')
const ProductModel = require('../models/product.model')
const InvoiceDetailModel = require('../models/invoiceDetail.model')
const InvoiceModel = require('../models/invoice.model')

class InvoiceDetailController{
    async create(req,res){
        try{
            const invoiceD = new InvoiceDetailModel(req.body)
            const saveInvoiceD = await invoiceD.save()
            if(req.body.product){
                const product = await ProductModel.findById((req.body.product))
                await product.updateOne({$push: {invoiceDetails: saveInvoiceD._id}})
            }else {
                throw response.errorResponse(res, "Can not found product: " + req.body.product)
            }
            if(req.body.invoice){
                const invoice = await InvoiceModel.findById(req.body.invoice)
                await invoice.updateOne({$push: {invoiceDetails: saveInvoiceD._id}})
            } else {
                throw response.errorResponse(res, "Can not found invoice: " + req.body.invoice)
            }
            response.successResponseWithData(res, "Create invoice detail success", saveInvoiceD)
        } catch (e){
            response.errorResponse(res, "Create invoice detail failed" + e)
        }
    }

    async update(req, res){
        try {
            const invoiceD = await InvoiceDetailModel.findById(req.params.id)
            if(invoiceD == null){
                throw response.errorResponse(res, "Can not found invoice detail with id: " + req.params.id)
                return null;
            }
            const updateInvoiceD = await invoiceD.updateOne({$set: req.body});
            response.successResponseWithData(res, "Update invoice detail success", updateInvoiceD)
        } catch (e) {
            response.errorResponse(res, "Update invcoie detail failed: " + e)
        }
    }

    async delete(req, res){
        try {
                await ProductModel.updateMany(
                    {invoiceDetails: req.params.id},
                    {$pull: {invoiceDetails: req.params.id}}
                )
                await InvoiceModel.updateMany(
                    {invoiceDetails: req.params.id},
                    {$pull: {invoiceDetails: req.params.id}}
                )
                await InvoiceDetailModel.findByIdAndDelete(req.params.id)
            return response.successResponse(res, "Delete invoice detail success")
        } catch (e) {
            response.errorResponse(res, "Delete invoice detail failed: " + e)
        }
    }

    async getAnInvoiceDetail(req, res){
        try {
            const invoiceD = await InvoiceDetailModel.findById(req.params.id)
                .populate('product')
                .populate('invoice')
            return response.successResponseWithData(res, "Get invoice detail success", invoiceD)
        } catch (e) {
            return response.errorResponse(res, "Get invoice detail failed: " + e)
        }
    }

    async getAll(req, res){
        try {
            const pageSize = 10
            var page = req.query.page
            if (page) {
                const allInvoiceD = await InvoiceDetailModel.find()
                    .populate('product')
                    .populate('invoice')
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                response.successResponseWithData(res, "Get all invoice detail success", allInvoiceD)
            } else {
                const allInvoiceD = await InvoiceDetailModel.find()
                    .populate('product')
                    .populate('invoice')
                    .limit(pageSize)
                response.successResponseWithData(res, "Get all invcoie detail success", allInvoiceD)
            }
        } catch (e){
            response.errorResponse(res, "Get all invoice detail failed: " + e)
        }
    }
}

module.exports = new InvoiceDetailController()