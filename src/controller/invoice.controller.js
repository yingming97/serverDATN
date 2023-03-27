const response = require('../helper/response')
const InvoiceModel = require('../models/invoice.model')
const ProductModel = require('../models/product.model')
const InvoiceDetailModel = require('../models/invoiceDetail.model')
const UserModel = require('../models/user.model')

class InvoiceController {
    async create(req, res) {
        try {
            const invoice = new InvoiceModel(req.body)
            const saveInvoice = await invoice.save()
            // if(req.body.user){
            //     const user = await UserModel.findById(req.body.user)
            //     await user.updateOne({$push: })
            // }
            response.successResponseWithData(res, "Create invoice success", saveInvoice)
        } catch (err) {
            return response.errorResponse(res, "Create invoice failed: " + err);
        }
    };

    async update(req, res) {
        try {
            const invoice = await InvoiceModel.findById(req.params.id)
            const updateInvoice = await invoice.updateOne({$set: req.body});
            response.successResponseWithData(res, "Update invoice success", updateInvoice)
        } catch (err) {
            response.errorResponse(res, "Update invoice failed: " + err)
        }
    }

    async delete(req, res) {
        try {
            await ProductModel.updateMany(
                {invoices: req.params.id},
                {$pull: {invoices: req.params.id}}
            )
            await InvoiceDetailModel.updateMany(
                {invoice: req.params.id},
                {$pull: {invoice: req.params.id}}
            )
            await InvoiceModel.findByIdAndDelete(req.params.id)
            response.successResponse(res, "Delete invoice success")
        } catch (err) {
            response.errorResponse(res, "Delete invoice failed: " + err)
        }
    }

    async getAll(req, res) {
        try {
            const pageSize = 10
            var page = req.query.page
            if (page) {
                const allInvoice = await InvoiceModel.find()
                    .populate("invoiceDetails")
                    .populate("user")
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                response.successResponseWithData(res, "Get all invoice success", allInvoice)
            } else {
                const allInvoice = await InvoiceModel.find()
                    .populate("invoiceDetails")
                    .populate("user")
                    .limit(pageSize)
                response.successResponseWithData(res, "Get all invoice success", allInvoice)
            }
        } catch (err) {
            response.errorResponse(res, "Get all invoice failed: " + err)
        }
    }

    async getAnInvoice(req, res) {
        try {
            const invoice = await InvoiceModel.findById(req.params.id)
                .populate("invoiceDetails")
                .populate("user")
            response.successResponseWithData(res, "Get an invoice success", invoice)
        } catch (err) {
            response.errorResponse(res, "Get an invoice failed: " + err)
        }
    }

    async revenueStats(req, res) {
        try {
            let totalPrice = 0
            await InvoiceModel.find()
                .then(doc => {
                    doc.forEach(data => {
                        totalPrice += data.totalPrice
                    })
                })
            response.successResponseWithData(res, "Revenue statistics success", totalPrice)
        } catch (e) {
            response.errorResponse(res, "Revenue statistics failed: " + e)
        }
    }

    async revenueStatsByImport(req, res) {
        try {
            let totalPrice = 0
            await InvoiceModel.find()
                .populate("invoiceDetails")
                .then(doc => {

                    doc.forEach(data => {
                        if (data.invoiceType == "IMPORT") {
                            totalPrice += data.totalPrice
                        }
                    })
                })
            response.successResponseWithData(res, "Revenue statistics by import success", totalPrice)
        } catch (e) {
            response.errorResponse(res, "Revenue statistics by import failed: " + e)
        }
    }

    async revenueStatsByExport(req, res) {
        try {
            let totalPrice = 0
            await InvoiceModel.find()
                .populate("invoiceDetails")
                .then(doc => {

                    doc.forEach(data => {
                        if (data.invoiceType == "EXPORT") {
                            totalPrice += data.totalPrice
                        }
                    })
                })
            response.successResponseWithData(res, "Revenue statistics by export success", totalPrice)
        } catch (e) {
            response.errorResponse(res, "Revenue statistics by import failed: " + e)
        }
    }

    async revenueStatsByRefund(req, res) {
        try {
            let totalPrice = 0
            await InvoiceModel.find()
                .populate("invoiceDetails")
                .then(doc => {
                    doc.forEach(data => {
                        if (data.invoiceType == "REFUND") {
                            totalPrice += data.totalPrice
                        }
                    })
                })
            response.successResponseWithData(res, "Revenue statistics by refund success", totalPrice)
        } catch (e) {
            response.errorResponse(res, "Revenue statistics by import failed: " + e)
        }
    }

    async revenueStatsByDate(req, res) {
        try {
            const date = new Date(req.params.date);
            const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
            const result = await InvoiceModel.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startOfDay,
                            $lt: endOfDay
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalPrice: {
                            $sum: '$totalPrice'
                        }
                    }
                }
            ]);
            response.successResponseWithData(res, "Revenue stats by date success", result[0])
        } catch (error) {
            console.log(error);
            response.errorResponse(res, "Revenue stats by date failed: " + error)
        }
    }

    async revenueStatsByMonth(req, res) {
        try {
            const year = new Date().getFullYear();
            const month = parseInt(req.params.month) - 1;
            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 1);
            const result = await InvoiceModel.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startOfMonth,
                            $lt: endOfMonth
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalPrice: {
                            $sum: '$totalPrice'
                        }
                    }
                }
            ]);
            response.successResponseWithData(res, "Revenue stats by month success", result[0])
        } catch (error) {
            console.log(error);
            response.errorResponse(res, "Revenue stats by month failed: " + error)
        }
    }

    async revenueStatsByYear(req, res) {
        try {
            const year = parseInt(req.params.year);
            const startOfYear = new Date(year, 0, 1);
            const endOfYear = new Date(year + 1, 0, 1);
            const result = await InvoiceModel.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startOfYear,
                            $lt: endOfYear
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalPrice: {
                            $sum: '$totalPrice'
                        }
                    }
                }
            ]);
            response.successResponseWithData(res, "Revenue stats by year success", result[0])
        } catch (error) {
            console.log(error);
            response.errorResponse(res, "Revenue stats by year failed: " + error)
        }
    }

    async quantityStats(req, res) {
        try {
            const result = await InvoiceModel.aggregate([
                {
                    $unwind: "$invoiceDetails"
                },
                {
                    $lookup: {
                        from: "InvoiceDetail",
                        localField: "invoiceDetails",
                        foreignField: "_id",
                        as: "detail"
                    }
                },
                {
                    $unwind: "$detail"
                },
                {
                    $group: {
                        _id: {
                            invoiceType: "$invoiceType"
                        },
                        totalQuantity: {
                            $sum: "$detail.quantity"
                        }
                    }
                }
            ])
            response.successResponseWithData(res, "Quantity stats success", result)
        } catch (e){
            response.errorResponse(res, "Quantity stats by import failed: " + e)
        }
    }
}

module.exports = new InvoiceController()